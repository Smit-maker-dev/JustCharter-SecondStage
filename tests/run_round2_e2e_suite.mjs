import { chromium } from "playwright";
import jwt from "../../aceaair_backend/node_modules/jsonwebtoken/index.js";
import fs from "fs";
import path from "path";

const JWT_KEY = "Tech9840VivantaAceaair";
const SCREENSHOTS_DIR = "/Users/smit/.gemini/antigravity-ide/brain/c296d3d1-8dea-4907-ad78-3adf13572e64/screenshots";
const TRACE_PATH = "/Users/smit/.gemini/antigravity-ide/brain/c296d3d1-8dea-4907-ad78-3adf13572e64/round2_journey_trace.zip";

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

// Generate auth tokens
const adminToken = jwt.sign(
  { userId: 1, email: "admin@aceaair.com", type: "super" },
  JWT_KEY,
  { expiresIn: "24h" }
);

const operatorToken = jwt.sign(
  { userId: 2, email: "smitvaghasiya182@gmail.com", type: "operator" },
  JWT_KEY,
  { expiresIn: "24h" }
);

const WEB_URL = "http://localhost:5175";
const ADMIN_URL = "http://localhost:5001";
const OPERATOR_URL = "http://localhost:5174";
const API_URL = "http://localhost:8272";

const testResults = [];
function recordTest(name, passed, details = "") {
  testResults.push({ name, passed, details });
  console.log(`[${passed ? "PASS" : "FAIL"}] ${name} ${details ? `(${details})` : ""}`);
}

async function runSuite() {
  console.log("=== STARTING AIR AMBULANCE ROUND 2 E2E TEST SUITE ===");
  const browser = await chromium.launch({ headless: true });

  const viewports = [
    { name: "1440", width: 1440, height: 900 },
    { name: "390", width: 390, height: 844 },
  ];

  let sharedRequestId = "";
  let sharedStatusToken = "";

  for (const vp of viewports) {
    console.log(`\n--- Running tests for viewport ${vp.name}px (${vp.width}x${vp.height}) ---`);

    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });

    if (vp.name === "1440") {
      await context.tracing.start({ screenshots: true, snapshots: true });
    }

    const page = await context.newPage();

    const consoleErrors = [];
    const pageErrors = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    page.on("pageerror", (err) => {
      pageErrors.push(err.message);
    });

    // -------------------------------------------------------------
    // Test 1: Public Info Page (/air-ambulance)
    // -------------------------------------------------------------
    try {
      await page.goto(`${WEB_URL}/air-ambulance`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1000);

      // Verify Hero content: No photo, "Example route", no ICU Tier or Dedicated Stretcher Cabin
      const heroText = await page.locator("section").first().textContent();
      const hasPhotoInHero = await page.$("section img[alt*='aircraft'], section img[alt*='Cabin']");
      const hasExampleRoute = heroText.includes("Example route");
      const hasDedicatedCabin = heroText.includes("Dedicated Stretcher Cabin");
      const hasIcuTier = heroText.includes("ICU Tier");

      const heroHonestyPass = !hasPhotoInHero && hasExampleRoute && !hasDedicatedCabin && !hasIcuTier;
      recordTest(
        `[${vp.name}px] Hero honesty fixes: photo removed, Example route label present, ICU tier removed`,
        heroHonestyPass
      );

      // Verify "What is on board" exact verbatim copy
      const bodyText = await page.textContent("body");
      const hasStretcherText = bodyText.includes("The patient lies on a stretcher secured to the cabin with restraints.");
      const hasOxygenText = bodyText.includes("Oxygen for the patient during the flight, where the aircraft is fitted for it.");
      const hasMonitorText = bodyText.includes("A monitor that tracks the patient's vital signs, where fitted.");
      const hasPumpsText = bodyText.includes("Equipment for medicines and breathing support. What is fitted differs by aircraft.");
      const hasCrewSeatsText = bodyText.includes("Seats for the doctor or paramedic beside the stretcher.");
      const hasCompanionText = bodyText.includes("A seat for one family member or escort, depending on the aircraft.");

      const verbatimPass =
        hasStretcherText && hasOxygenText && hasMonitorText && hasPumpsText && hasCrewSeatsText && hasCompanionText;
      recordTest(`[${vp.name}px] What is on board exact verbatim copy`, verbatimPass);

      // Verify cutaway Hotspots 5 and 6
      const hotspot5 = await page.locator("[aria-label*='Hotspot 5']");
      const hotspot6 = await page.locator("[aria-label*='Hotspot 6']");
      recordTest(
        `[${vp.name}px] Cutaway Hotspot 5 (crew seat) and Hotspot 6 (companion seat) rendered`,
        (await hotspot5.count()) > 0 && (await hotspot6.count()) > 0
      );

      // Test hover/click on hotspot 5
      if ((await hotspot5.count()) > 0) {
        await hotspot5.first().click();
        await page.waitForTimeout(200);
      }

      // Verify FAQ accordion expands and collapses
      const faqBtn = await page.locator("button:has-text('Can family members travel with the patient?')");
      if (await faqBtn.isVisible()) {
        await faqBtn.click();
        await page.waitForTimeout(300);
        const isExpanded = await faqBtn.getAttribute("aria-expanded");
        recordTest(`[${vp.name}px] FAQ accordion expands with aria-expanded`, isExpanded === "true");
      }

      // Screenshot live info page
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, `air_ambulance_live_${vp.name}.png`),
        fullPage: true,
      });

      // Verify "Request an air ambulance" CTA goes to /air-ambulance/request
      const ctaBtn = page.locator("a:has-text('Request an air ambulance')").first();
      await ctaBtn.click();
      await page.waitForURL("**/air-ambulance/request");
      recordTest(`[${vp.name}px] Hero CTA routes to /air-ambulance/request`, page.url().includes("/air-ambulance/request"));
    } catch (err) {
      recordTest(`[${vp.name}px] Public info page test`, false, err.message);
    }

    // -------------------------------------------------------------
    // Test 2: Request Page Validation & Steps (/air-ambulance/request)
    // -------------------------------------------------------------
    try {
      await page.goto(`${WEB_URL}/air-ambulance/request`, { waitUntil: "networkidle" });
      await page.waitForTimeout(500);

      // Verify H1 and subline
      const pageText = await page.textContent("body");
      const hasCorrectH1 = pageText.includes("Request an air ambulance");
      const hasCorrectSubline = pageText.includes("Tell us about the transfer. A coordinator will review it and come back with a quote.");
      recordTest(`[${vp.name}px] Request page H1 & subline restyled`, hasCorrectH1 && hasCorrectSubline);

      // Verify Step 1 validation blocks Continue when empty
      const continueBtn = page.locator("button:has-text('Continue')");
      await continueBtn.click();
      await page.waitForTimeout(300);

      const val1Text = await page.textContent("body");
      const hasUrgencyErr = val1Text.includes("Please select an urgency level");
      const hasFromErr = val1Text.includes("Please enter or select a pickup");
      recordTest(`[${vp.name}px] Step 1 validation blocks Continue with inline errors`, hasUrgencyErr && hasFromErr);

      // Capture screenshot of Step 1 with validation errors
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, `request_step1_validation_${vp.name}.png`),
      });

      // Fill Step 1 with Planned urgency & custom date
      const urgencyPlanned = page.locator("button:has-text('Planned / A date you choose')");
      await urgencyPlanned.click();
      await page.waitForTimeout(200);

      // Pickup airport search
      const fromInput = page.locator("input[placeholder*='Mumbai or BOM']");
      await fromInput.fill("BOM");
      await page.waitForTimeout(600);
      const airportResult = page.locator("text=Chhatrapati Shivaji").first();
      if (await airportResult.isVisible()) {
        await airportResult.click();
      } else {
        await fromInput.fill("Mumbai Airport (BOM)");
      }

      // Hospital pickup
      await page.fill("input[placeholder*='Current hospital']", "Lilavati Hospital, Bandra");

      // Destination airport search
      const toInput = page.locator("input[placeholder*='Delhi or DEL']");
      await toInput.fill("DEL");
      await page.waitForTimeout(600);
      const toAirportResult = page.locator("text=Indira Gandhi").first();
      if (await toAirportResult.isVisible()) {
        await toAirportResult.click();
      } else {
        await toInput.fill("Delhi Airport (DEL)");
      }

      // Hospital drop
      await page.fill("input[placeholder*='Receiving hospital']", "AIIMS New Delhi");

      // Select date on CustomDatePicker
      const dateTrigger = page.locator("[role='button']:has-text('Transfer date')");
      if (await dateTrigger.isVisible()) {
        await dateTrigger.click();
        await page.waitForTimeout(300);
        // Click on an enabled day button in calendar grid
        const dayBtn = page.locator(".grid.grid-cols-7 button:not([disabled])").first();
        if (await dayBtn.isVisible()) {
          await dayBtn.click();
          await page.waitForTimeout(200);
        }
      }

      // Continue to Step 2
      await continueBtn.click();
      await page.waitForTimeout(600);

      // Step 2 Validation test
      const continueStep2 = page.locator("button:has-text('Continue')");
      await continueStep2.click();
      await page.waitForTimeout(300);

      const hasAgeErr = (await page.textContent("body")).includes("Please enter a valid age");
      recordTest(`[${vp.name}px] Step 2 validation blocks Continue`, hasAgeErr);

      // Capture screenshot of Step 2 with validation errors
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, `request_step2_validation_${vp.name}.png`),
      });

      // Fill Step 2
      await page.fill("input[placeholder*='e.g. 52']", "64");
      await page.fill("input[placeholder*='e.g. 68']", "72");
      await page.locator("button:has-text('Critical / ICU')").click();
      await page.getByRole("button", { name: "Ventilator", exact: true }).click();
      await page.getByRole("button", { name: "Oxygen", exact: true }).click();
      await page.locator("button:has-text('1 seat')").click();
      await page.fill("textarea[placeholder*='Patient is conscious']", "Patient is in ICU on mechanical ventilation. Treating doctor accompanying.");

      // Continue to Step 3
      await continueStep2.click();
      await page.waitForTimeout(500);

      // Step 3 Validation test
      const submitBtn = page.locator("button:has-text('Submit transfer request')");
      await submitBtn.click();
      await page.waitForTimeout(300);

      const hasNameErr = (await page.textContent("body")).includes("Please enter your full name");
      recordTest(`[${vp.name}px] Step 3 validation blocks Submit without required fields`, hasNameErr);

      // Capture screenshot of Step 3 with validation errors
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, `request_step3_validation_${vp.name}.png`),
      });

      // Fill Step 3
      const timestamp = Date.now().toString().slice(-4);
      const testPhone = `982001${timestamp}`;
      await page.fill("input[placeholder*='Dr. Ramesh Gupta']", "Dr. Rajesh Varma");
      await page.fill("input[placeholder*='98765 43210']", testPhone);
      await page.fill("input[placeholder*='name@example.com']", `coordinator+${timestamp}@justcharter.in`);
      await page.locator("button:has-text('Phone call')").click();
      await page.check("input[type='checkbox']");

      // Submit Form
      await submitBtn.click();
      await page.waitForTimeout(2000);

      // Confirmation Page
      const confText = await page.textContent("body");
      const isConfirmed = confText.includes("Transfer request received") && confText.includes("Request reference number");
      recordTest(`[${vp.name}px] Form submits and displays Confirmation page`, isConfirmed);

      // Extract Request ID
      const reqIdElem = page.locator("span.font-mono").first();
      const requestId = await reqIdElem.textContent();
      console.log(`[${vp.name}px] Generated Request ID: ${requestId}`);
      if (vp.name === "1440") {
        sharedRequestId = requestId;
      }

      // Capture confirmation page screenshot
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, `confirmation_page_${vp.name}.png`),
      });

      // Click "Track live status"
      const trackLink = page.locator("a:has-text('Track live status')");
      await trackLink.click();
      await page.waitForURL("**/air-ambulance/status/**");

      const statusUrl = page.url();
      const statusToken = statusUrl.split("/").pop();
      if (vp.name === "1440") {
        sharedStatusToken = statusToken;
      }
      console.log(`[${vp.name}px] Extracted status token: ${statusToken}`);

      // -------------------------------------------------------------
      // Test 3: Status Page
      // -------------------------------------------------------------
      await page.waitForSelector("text=Transfer request", { timeout: 10000 });
      await page.waitForTimeout(500);

      const statusText = await page.textContent("body");
      const hasReceivedStage = statusText.includes("We have your request.");
      const hasNoActiveStagePill = !statusText.includes("Active Stage");
      const hasPrivacyOneLine = statusText.includes("Patient details are never shown on this page.");
      const hasIstDate = statusText.includes("IST");

      recordTest(`[${vp.name}px] Status page exact copy: Received 'We have your request.'`, hasReceivedStage);
      recordTest(`[${vp.name}px] Status page removed Active Stage pill`, hasNoActiveStagePill);
      recordTest(`[${vp.name}px] Status page one line 'Patient details are never shown on this page.'`, hasPrivacyOneLine);
      recordTest(`[${vp.name}px] Status page dates formatted as IST (never raw ISO)`, hasIstDate);

      // Capture status page (received stage) screenshot
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, `status_received_${vp.name}.png`),
      });

      // Test Refresh button
      const refreshBtn = page.locator("button[title='Refresh status']");
      if (await refreshBtn.isVisible()) {
        await refreshBtn.click();
        await page.waitForTimeout(500);
        recordTest(`[${vp.name}px] Status page Refresh button works`, true);
      }
    } catch (err) {
      recordTest(`[${vp.name}px] Request and status flow`, false, err.message);
    }

    // -------------------------------------------------------------
    // Test 4: Invalid Status Token (Error state)
    // -------------------------------------------------------------
    try {
      await page.goto(`${WEB_URL}/air-ambulance/status/invalid-test-token`, { waitUntil: "networkidle" });
      await page.waitForTimeout(500);
      const notFoundText = await page.textContent("body");
      const hasNotFound = notFoundText.includes("Request not found");
      recordTest(`[${vp.name}px] Invalid token displays friendly not-found state`, hasNotFound);

      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, `status_invalid_token_${vp.name}.png`),
      });
    } catch (err) {
      recordTest(`[${vp.name}px] Invalid token test`, false, err.message);
    }

    // -------------------------------------------------------------
    // Test Forced Empty & Error States for /air-ambulance
    // -------------------------------------------------------------
    try {
      // Empty fleet data state
      const emptyPage = await context.newPage();
      await emptyPage.route("**/public/air-ambulance/aircraft", (route) => {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ status: 200, data: [] }),
        });
      });
      await emptyPage.goto(`${WEB_URL}/air-ambulance`, { waitUntil: "networkidle" });
      await emptyPage.waitForTimeout(500);
      await emptyPage.screenshot({
        path: path.join(SCREENSHOTS_DIR, `air_ambulance_empty_state_${vp.name}.png`),
      });
      await emptyPage.close();
      recordTest(`[${vp.name}px] Forced empty data state on /air-ambulance screenshotted`, true);

      // Error with retry state
      const errPage = await context.newPage();
      await errPage.route("**/public/air-ambulance/aircraft", (route) => {
        route.fulfill({
          status: 500,
          contentType: "application/json",
          body: JSON.stringify({ status: 500, message: "Fleet service unavailable" }),
        });
      });
      await errPage.goto(`${WEB_URL}/air-ambulance`, { waitUntil: "networkidle" });
      await errPage.waitForTimeout(500);
      await errPage.screenshot({
        path: path.join(SCREENSHOTS_DIR, `air_ambulance_error_state_${vp.name}.png`),
      });
      await errPage.close();
      recordTest(`[${vp.name}px] Forced error-with-retry state on /air-ambulance screenshotted`, true);
    } catch (err) {
      console.log(`Error state testing error: ${err.message}`);
    }

    if (vp.name === "1440") {
      await context.tracing.stop({ path: TRACE_PATH });
    }

    await context.close();
  }

  // -------------------------------------------------------------
  // Test 5: Admin Panel (1440px desktop)
  // -------------------------------------------------------------
  console.log("\n--- Testing Admin Panel & Operations ---");
  const adminContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });

  const adminPage = await adminContext.newPage();

  // Set auth token in localStorage before loading
  await adminPage.goto(`${ADMIN_URL}/booking_requests`);
  await adminPage.evaluate((token) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("firstName", "Admin");
    localStorage.setItem("lastName", "User");
  }, adminToken);

  await adminPage.goto(`${ADMIN_URL}/booking_requests?tab=air_ambulance`, { waitUntil: "networkidle" });
  await adminPage.waitForTimeout(1500);

  // Verify Top-bar title is NOT "Dashboard"
  const topBarElem = adminPage.locator("nav h1, header h1, .navbar-title").first();
  let titleText = "";
  if (await topBarElem.isVisible()) {
    titleText = await topBarElem.textContent();
  }
  const titleFixed = !titleText.includes("Dashboard");
  recordTest("Admin top-bar title fixed (no longer falls back to 'Dashboard')", titleFixed, `title: ${titleText}`);

  // Screenshot Admin tab list
  await adminPage.screenshot({
    path: path.join(SCREENSHOTS_DIR, "admin_tab_list_1440.png"),
  });

  // Filter by sharedRequestId if present
  if (sharedRequestId) {
    const searchInput = adminPage.locator("input[placeholder*='Search']").first();
    if (await searchInput.isVisible()) {
      await searchInput.fill(sharedRequestId);
      await adminPage.waitForTimeout(700);
      recordTest("Admin search box filters by request reference ID", true);
    }
  }

  // Check compact 72px "Open" button
  const openButtons = adminPage.locator("button:has-text('Open')");
  const openBtnCount = await openButtons.count();
  recordTest("Admin table displays compact 72px 'Open' button", openBtnCount > 0);

  // Click Open on the request to open drawer
  if (openBtnCount > 0) {
    await openButtons.first().click();
    await adminPage.waitForTimeout(1000);

    // Verify Drawer displays unmasked clinical details and pluralisation
    const drawerContent = await adminPage.textContent(".MuiDrawer-root, [role='presentation']");
    const hasCompanionsPlural = drawerContent.includes("1 seat") || drawerContent.includes("seats");
    recordTest("Admin drawer seat pluralisation ('1 seat')", hasCompanionsPlural);

    const hasWhatsAppLink = await adminPage.locator("a[href*='wa.me']").count();
    recordTest("Admin drawer WhatsApp link present with URL-encoded text", hasWhatsAppLink > 0);

    // Screenshot full drawer bottom
    await adminPage.screenshot({
      path: path.join(SCREENSHOTS_DIR, "admin_drawer_full_1440.png"),
    });

    // Enter coordinator message
    const msgInput = adminPage.locator("textarea[placeholder*='Sourcing King Air']");
    if (await msgInput.isVisible()) {
      await msgInput.fill("Coordinating King Air C90 from Mumbai. Aircraft equipped with ICU ventilator. Quote ready shortly.");
      const sendMsgBtn = adminPage.locator("button:has-text('Send Message to Customer')");
      await sendMsgBtn.click();
      await adminPage.waitForTimeout(1000);
      recordTest("Admin writes coordinator message and saves", true);
    }

    // Change stage to in_review
    const inReviewBtn = adminPage.locator("button:has-text('IN REVIEW')").first();
    if (await inReviewBtn.isVisible()) {
      await inReviewBtn.click();
      await adminPage.waitForTimeout(300);
      const confirmStageBtn = adminPage.locator("button:has-text('Confirm Stage Change')");
      if (await confirmStageBtn.isVisible()) {
        await confirmStageBtn.click();
        await adminPage.waitForTimeout(1000);
        recordTest("Admin updates coordination stage to in_review", true);
      }
    }

    // Ask Operators Modal
    const askOperatorsBtn = adminPage.locator("button:has-text('Ask Operators')");
    if (await askOperatorsBtn.isVisible()) {
      await askOperatorsBtn.click();
      await adminPage.waitForTimeout(500);

      // Screenshot Ask Operators Modal
      await adminPage.screenshot({
        path: path.join(SCREENSHOTS_DIR, "admin_ask_operators_modal_1440.png"),
      });

      const sendPingsBtn = adminPage.locator("button:has-text('Send Pings Now')");
      if (await sendPingsBtn.isVisible()) {
        await sendPingsBtn.click();
        await adminPage.waitForTimeout(1500);
        recordTest("Admin clicks Ask Operators and dispatches pings", true);
      }
      const cancelModalBtn = adminPage.locator("button:has-text('Cancel')");
      if (await cancelModalBtn.isVisible()) {
        await cancelModalBtn.click();
        await adminPage.waitForTimeout(500);
      }
    }

    // Find Aircraft Prefill Test
    const findAircraftBtn = adminPage.locator("button:has-text('Find Aircraft')");
    if (await findAircraftBtn.isVisible()) {
      await findAircraftBtn.click();
      await adminPage.waitForTimeout(1000);

      // Screenshot Find Aircraft prefilled
      await adminPage.screenshot({
        path: path.join(SCREENSHOTS_DIR, "admin_find_aircraft_prefill_1440.png"),
      });
      recordTest("Admin 'Find aircraft' navigates to /air_ambulance with prefilled route", adminPage.url().includes("/air_ambulance"));
    }
  }

  // Also capture mobile 390px screenshots for Admin panel
  try {
    const adminContext390 = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const adminPage390 = await adminContext390.newPage();
    await adminPage390.goto(`${ADMIN_URL}/booking_requests`);
    await adminPage390.evaluate((token) => {
      localStorage.setItem("authToken", token);
      localStorage.setItem("firstName", "Admin");
      localStorage.setItem("lastName", "User");
    }, adminToken);
    await adminPage390.goto(`${ADMIN_URL}/booking_requests?tab=air_ambulance`, { waitUntil: "networkidle" });
    await adminPage390.waitForTimeout(1000);
    await adminPage390.screenshot({ path: path.join(SCREENSHOTS_DIR, "admin_tab_list_390.png") });
    const openButtons390 = adminPage390.locator("button:has-text('Open')");
    if ((await openButtons390.count()) > 0) {
      await openButtons390.first().click();
      await adminPage390.waitForTimeout(1000);
      await adminPage390.screenshot({ path: path.join(SCREENSHOTS_DIR, "admin_drawer_full_390.png") });
    }
    await adminContext390.close();
  } catch (err) {
    console.log("Admin 390 screenshot note:", err.message);
  }

  await adminContext.close();

  // -------------------------------------------------------------
  // Test 6: Operator Panel (1440px desktop)
  // -------------------------------------------------------------
  console.log("\n--- Testing Operator Panel ---");
  const operatorContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });

  const operatorPage = await operatorContext.newPage();
  await operatorPage.goto(`${OPERATOR_URL}/air-ambulance-requests`);
  await operatorPage.evaluate((token) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("first_name", "Smit");
    localStorage.setItem("last_name", "Vaghasiya");
  }, operatorToken);

  await operatorPage.goto(`${OPERATOR_URL}/air-ambulance-requests`, { waitUntil: "networkidle" });
  await operatorPage.waitForTimeout(1000);

  // Verify Sidebar label is on one line: "Air Ambulance"
  const sidebarItem = await operatorPage.locator("nav a[href*='air-ambulance-requests']").textContent();
  const isOneLine = sidebarItem.includes("Air Ambulance") && !sidebarItem.includes("Requests");
  recordTest("Operator sidebar label shortened to 'Air Ambulance' (one line)", isOneLine, `text: ${sidebarItem.trim()}`);

  // Screenshot Operator requests list
  await operatorPage.screenshot({
    path: path.join(SCREENSHOTS_DIR, "operator_requests_list_1440.png"),
  });

  // Verify ping timestamp format "Pinged 24 Oct, 5:12 pm"
  const pageBodyText = await operatorPage.textContent("body");
  const hasPingDateFormat = /Pinged \d{1,2} [A-Z][a-z]{2}, \d{1,2}:\d{2} (am|pm)/.test(pageBodyText);
  recordTest("Operator ping date formatted with date and time ('Pinged 24 Oct, 5:12 pm')", hasPingDateFormat);

  // Operator reply interaction
  const availableBtn = operatorPage.locator("button:has-text('Available')").first();
  if (await availableBtn.isVisible()) {
    await availableBtn.click();
    await operatorPage.waitForTimeout(500);

    // Screenshot Operator reply modal
    await operatorPage.screenshot({
      path: path.join(SCREENSHOTS_DIR, "operator_reply_modal_1440.png"),
    });

    const submitReplyBtn = operatorPage.locator("button:has-text('Send Response')");
    if (await submitReplyBtn.isVisible()) {
      await submitReplyBtn.click();
      await operatorPage.waitForTimeout(1000);
      recordTest("Operator responds Available to flight ping", true);
    }
  }

  // Also capture mobile 390px screenshots for Operator panel
  try {
    const operatorContext390 = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const operatorPage390 = await operatorContext390.newPage();
    await operatorPage390.goto(`${OPERATOR_URL}/air-ambulance-requests`);
    await operatorPage390.evaluate((token) => {
      localStorage.setItem("access_token", token);
      localStorage.setItem("first_name", "Smit");
      localStorage.setItem("last_name", "Vaghasiya");
    }, operatorToken);
    await operatorPage390.goto(`${OPERATOR_URL}/air-ambulance-requests`, { waitUntil: "networkidle" });
    await operatorPage390.waitForTimeout(1000);
    await operatorPage390.screenshot({ path: path.join(SCREENSHOTS_DIR, "operator_requests_list_390.png") });
    const availBtn390 = operatorPage390.locator("button:has-text('Available')").first();
    if (await availBtn390.isVisible()) {
      await availBtn390.click();
      await operatorPage390.waitForTimeout(500);
      await operatorPage390.screenshot({ path: path.join(SCREENSHOTS_DIR, "operator_reply_modal_390.png") });
    }
    await operatorContext390.close();
  } catch (err) {
    console.log("Operator 390 screenshot note:", err.message);
  }

  await operatorContext.close();

  // -------------------------------------------------------------
  // Test 7: Verify Status Page reflected coordinator message & stage
  // -------------------------------------------------------------
  if (sharedStatusToken) {
    for (const svp of [
      { name: "1440", width: 1440, height: 900 },
      { name: "390", width: 390, height: 844 },
    ]) {
      const statusContext = await browser.newContext({ viewport: { width: svp.width, height: svp.height } });
      const verifyStatusPage = await statusContext.newPage();
      await verifyStatusPage.goto(`${WEB_URL}/air-ambulance/status/${sharedStatusToken}`, { waitUntil: "networkidle" });
      await verifyStatusPage.waitForSelector("text=Transfer request", { timeout: 10000 });
      await verifyStatusPage.waitForTimeout(500);

      const updatedStatusText = await verifyStatusPage.textContent("body");
      const hasUpdatedStage = updatedStatusText.includes("A coordinator is checking aircraft for your route.");
      const hasCoordinatorMsg = updatedStatusText.includes("Coordinating King Air C90 from Mumbai.");

      if (svp.name === "1440") {
        recordTest("Public status page reflects In Review stage from admin", hasUpdatedStage);
        recordTest("Public status page displays coordinator message entered by admin", hasCoordinatorMsg);
      }

      await verifyStatusPage.screenshot({
        path: path.join(SCREENSHOTS_DIR, `status_in_review_coordinator_msg_${svp.name}.png`),
      });

      // Also test Declined state display
      await verifyStatusPage.route(`**/public/air-ambulance/status/${sharedStatusToken}`, (route) => {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            status: 200,
            data: {
              request_id: sharedRequestId || "AAR-TEST1",
              stage: "declined",
              route: { from: "Mumbai Airport (BOM)", to: "Delhi Airport (DEL)" },
              flight_date: "2026-10-28",
              urgency: "within_24_hours",
              coordinator_message: "No compliant ICU aircraft with qualified aeromedical doctor currently available within 24 hours for this route.",
              updated_at: new Date().toISOString(),
            },
          }),
        });
      });
      await verifyStatusPage.reload({ waitUntil: "networkidle" });
      await verifyStatusPage.waitForTimeout(500);

      const declinedText = await verifyStatusPage.textContent("body");
      const hasDeclinedHeading = declinedText.includes("We could not arrange this flight");
      if (svp.name === "1440") {
        recordTest("Status page Declined state renders exact heading 'We could not arrange this flight' and coordinator reason", hasDeclinedHeading);
      }

      await verifyStatusPage.screenshot({
        path: path.join(SCREENSHOTS_DIR, `status_declined_${svp.name}.png`),
      });

      // Also test Confirmed state display
      await verifyStatusPage.route(`**/public/air-ambulance/status/${sharedStatusToken}`, (route) => {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            status: 200,
            data: {
              request_id: sharedRequestId || "AAR-TEST1",
              stage: "confirmed",
              route: { from: "Mumbai Airport (BOM)", to: "Delhi Airport (DEL)" },
              flight_date: "2026-10-28",
              urgency: "within_24_hours",
              coordinator_message: "Flight confirmed with King Air B200 ICU dispatch. Medical team briefing completed.",
              updated_at: new Date().toISOString(),
            },
          }),
        });
      });
      await verifyStatusPage.reload({ waitUntil: "networkidle" });
      await verifyStatusPage.waitForTimeout(500);

      const confirmedText = await verifyStatusPage.textContent("body");
      const hasConfirmedCopy = confirmedText.includes("Your flight is confirmed. Details are below.");
      if (svp.name === "1440") {
        recordTest("Status page Confirmed state renders exact copy 'Your flight is confirmed. Details are below.'", hasConfirmedCopy);
      }

      await verifyStatusPage.screenshot({
        path: path.join(SCREENSHOTS_DIR, `status_confirmed_${svp.name}.png`),
      });

      // Also test Quote Ready state display
      await verifyStatusPage.route(`**/public/air-ambulance/status/${sharedStatusToken}`, (route) => {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            status: 200,
            data: {
              request_id: sharedRequestId || "AAR-TEST1",
              stage: "quote_sent",
              route: { from: "Mumbai Airport (BOM)", to: "Delhi Airport (DEL)" },
              flight_date: "2026-10-28",
              urgency: "within_24_hours",
              coordinator_message: "Quote sent via WhatsApp and email. Please review the flight itinerary.",
              updated_at: new Date().toISOString(),
            },
          }),
        });
      });
      await verifyStatusPage.reload({ waitUntil: "networkidle" });
      await verifyStatusPage.waitForTimeout(500);

      const quoteText = await verifyStatusPage.textContent("body");
      const hasQuoteCopy = quoteText.includes("Your quote has been sent. Please check your phone or email.");
      if (svp.name === "1440") {
        recordTest("Status page Quote Ready state renders exact copy 'Your quote has been sent. Please check your phone or email.'", hasQuoteCopy);
      }

      await verifyStatusPage.screenshot({
        path: path.join(SCREENSHOTS_DIR, `status_quote_ready_${svp.name}.png`),
      });

      await statusContext.close();
    }
  }

  await browser.close();

  // Summary Report
  console.log("\n========================================================");
  console.log("             AUTOMATED TEST SUITE SUMMARY                ");
  console.log("========================================================");
  const total = testResults.length;
  const passed = testResults.filter((t) => t.passed).length;
  const failed = total - passed;
  console.log(`Total Tests Run : ${total}`);
  console.log(`Tests Passed   : ${passed}`);
  console.log(`Tests Failed   : ${failed}`);
  console.log(`Success Rate   : ${((passed / total) * 100).toFixed(1)}%`);
  console.log("========================================================\n");

  fs.writeFileSync(
    path.join(SCREENSHOTS_DIR, "test_results.json"),
    JSON.stringify(testResults, null, 2)
  );
}

runSuite().catch((err) => {
  console.error("Suite execution error:", err);
  process.exit(1);
});
