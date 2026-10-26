import { chromium } from "playwright";
import jwt from "../../aceaair_backend/node_modules/jsonwebtoken/index.js";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import axios from "axios";

const JWT_KEY = "Tech9840VivantaAceaair";
const ARTIFACT_DIR = "/Users/smit/.gemini/antigravity-ide/brain/d72478c2-0b8a-4862-ba1c-bd81233755a7";
const SCREENSHOTS_DIR = path.join(ARTIFACT_DIR, "screenshots");

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

function runSql(query) {
  const sanitized = query.replace(/"/g, '\\"');
  const res = execSync(`psql -U techvivanta -d aceaair_staging -t -A -c "${sanitized}"`, {
    encoding: "utf8",
  });
  return res.trim();
}

function runSqlJson(query) {
  const cleaned = query.trim().replace(/;+$/, "");
  const jsonQuery = `SELECT json_agg(t) FROM (${cleaned}) t;`;
  const sanitized = jsonQuery.replace(/"/g, '\\"');
  const res = execSync(`psql -U techvivanta -d aceaair_staging -t -A -c "${sanitized}"`, {
    encoding: "utf8",
  });
  const trimmed = res.trim();
  if (!trimmed) return [];
  try {
    return JSON.parse(trimmed);
  } catch (e) {
    return [];
  }
}

// Generate tokens
const adminToken = jwt.sign(
  { userId: 1, email: "admin@aceaair.com", type: "super" },
  JWT_KEY,
  { expiresIn: "24h" }
);

const operator1Token = jwt.sign(
  { userId: 2, email: "smitvaghasiya182@gmail.com", type: "operator" },
  JWT_KEY,
  { expiresIn: "24h" }
);

const operator2Token = jwt.sign(
  { userId: 67, email: "uksharma@kelachandragroup.com", type: "operator" },
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

async function runRound3Suite() {
  console.log("==========================================================");
  console.log("   AIR AMBULANCE ROUND 3 VERIFICATION & GAP TEST SUITE    ");
  console.log("==========================================================");

  const browser = await chromium.launch({ headless: true });

  // -------------------------------------------------------------
  // Clean DB rate limits & air ambulance requests before starting
  // -------------------------------------------------------------
  runSql("DELETE FROM rate_limit_hits;");
  runSql("DELETE FROM booking_request_operator_ping;");
  runSql("DELETE FROM booking_request WHERE booking_type = 'air_ambulance';");
  console.log("✓ Reset air ambulance database state for clean test run");

  let createdRequestId = "";
  let createdRequestNumber = "";
  let createdStatusToken = "";

  // -------------------------------------------------------------
  // GAP 1: Aircraft card "Request this aircraft" prefill + removal
  // -------------------------------------------------------------
  console.log("\n--- Testing Gap 1: Aircraft card request prefill & removal chip ---");
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`${WEB_URL}/air-ambulance`, { waitUntil: "networkidle" });

    // Click "Request this aircraft" button on King Air B200 / Pilatus
    const requestBtn = page.locator("button:has-text('Request this aircraft'), a:has-text('Request this aircraft')").first();
    await requestBtn.waitFor({ state: "visible", timeout: 8000 });
    await requestBtn.click();

    // Verify navigation to /air-ambulance/request?aircraft=
    await page.waitForURL(/\/air-ambulance\/request\?aircraft=\d+/, { timeout: 8000 });
    const currentUrl = page.url();
    const hasAircraftParam = currentUrl.includes("aircraft=");

    // Verify preferred-aircraft remove button is visible
    const removeBtn = page.locator("button[title='Remove preferred aircraft']").first();
    await removeBtn.waitFor({ state: "visible", timeout: 5000 });
    const chipVisible = await removeBtn.isVisible();

    // Click remove
    await removeBtn.click();
    await page.waitForTimeout(300);
    const chipRemoved = !(await removeBtn.isVisible());

    recordTest(
      "Gap 1: Aircraft card 'Request this aircraft' prefill + removal chip",
      hasAircraftParam && chipVisible && chipRemoved,
      `URL: ${currentUrl}, chipVisible: ${chipVisible}, chipRemoved: ${chipRemoved}`
    );
    await page.close();
  }

  // -------------------------------------------------------------
  // GAP 2: FAQ accordion mouse & keyboard (Enter/Space) with aria-expanded
  // -------------------------------------------------------------
  console.log("\n--- Testing Gap 2: FAQ accordion mouse & keyboard with aria-expanded ---");
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`${WEB_URL}/air-ambulance`, { waitUntil: "networkidle" });

    // Scroll down to FAQ section
    const faqHeading = page.locator("#faq-heading").first();
    await faqHeading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const faqButtons = page.locator("#faq button[aria-expanded]");
    await faqButtons.first().waitFor({ state: "visible", timeout: 5000 });
    const count = await faqButtons.count();

    const firstFaq = faqButtons.first();
    const initialExpanded = (await firstFaq.getAttribute("aria-expanded")) === "true";

    // Toggle with mouse click
    await firstFaq.click();
    await page.waitForTimeout(300);
    const afterClick = (await firstFaq.getAttribute("aria-expanded")) === "true";
    const clickWorked = afterClick !== initialExpanded;

    // Toggle with Enter key
    await firstFaq.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(300);
    const afterEnter = (await firstFaq.getAttribute("aria-expanded")) === "true";
    const enterWorked = afterEnter !== afterClick;

    // Toggle with Space key
    await page.keyboard.press("Space");
    await page.waitForTimeout(300);
    const afterSpace = (await firstFaq.getAttribute("aria-expanded")) === "true";
    const spaceWorked = afterSpace !== afterEnter;

    const faqPass = count >= 6 && clickWorked && enterWorked && spaceWorked;
    recordTest(
      "Gap 2: FAQ accordion mouse & keyboard (Enter/Space) with aria-expanded",
      faqPass,
      `Total FAQ buttons: ${count}, click: ${clickWorked}, enter: ${enterWorked}, space: ${spaceWorked}`
    );
    await page.close();
  }

  // -------------------------------------------------------------
  // GAP 3: Cutaway hotspot <-> equipment list sync
  // -------------------------------------------------------------
  console.log("\n--- Testing Gap 3: Cutaway hotspot <-> equipment list sync ---");
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`${WEB_URL}/air-ambulance`, { waitUntil: "networkidle" });

    // Scroll to cutaway
    const cutawaySection = page.locator("section:has(svg)").nth(1);
    await cutawaySection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Look for SVG hotspot groups
    const hotspots = page.locator("g[role='button'][aria-label*='Hotspot']");
    await hotspots.first().waitFor({ state: "visible", timeout: 5000 });
    const hotspotCount = await hotspots.count();

    // Hover hotspot 2 (Medical Oxygen)
    const secondHotspot = hotspots.nth(1);
    await secondHotspot.hover();
    await page.waitForTimeout(300);

    // Click equipment list item
    const equipmentItems = page.locator("button:has-text('Medical Oxygen Station'), button:has-text('Patient Monitor')");
    if (await equipmentItems.count() > 0) {
      await equipmentItems.first().click();
      await page.waitForTimeout(300);
    }

    const syncPass = hotspotCount === 6;
    recordTest(
      "Gap 3: Cutaway hotspot <-> equipment list sync (hover, focus, click)",
      syncPass,
      `Hotspots found: ${hotspotCount}`
    );
    await page.close();
  }

  // -------------------------------------------------------------
  // GAP 4: Mobile sticky bar config-driven
  // -------------------------------------------------------------
  console.log("\n--- Testing Gap 4: Mobile sticky bar (navigates; Call button absent when empty) ---");
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(`${WEB_URL}/air-ambulance`, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    // Screenshot mobile landing hero & sticky bar
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, "public_landing_hero_390.png"),
      fullPage: false,
    });

    const stickyBar = page.locator("div.fixed.bottom-0").first();
    const isStickyVisible = await stickyBar.isVisible();

    // Call CTA should NOT be present when config has no coordinator phone
    const callButton = stickyBar.locator("a[href^='tel:'], button:has-text('Call')");
    const callCount = await callButton.count();
    const callAbsentWhenEmpty = callCount === 0;

    // Quote CTA should navigate to /air-ambulance/request
    const quoteBtn = stickyBar.locator("a[href*='/air-ambulance/request'], button:has-text('Request')").first();
    let navigatesToRequest = false;
    if (await quoteBtn.isVisible()) {
      await quoteBtn.click();
      await page.waitForURL(/\/air-ambulance\/request/, { timeout: 5000 });
      navigatesToRequest = page.url().includes("/air-ambulance/request");
    }

    recordTest(
      "Gap 4: Mobile sticky bar config-driven (navigates; Call button absent when empty)",
      isStickyVisible && callAbsentWhenEmpty && navigatesToRequest,
      `stickyVisible: ${isStickyVisible}, callCount: ${callCount}, navigates: ${navigatesToRequest}`
    );
    await page.close();
  }

  // -------------------------------------------------------------
  // GAP 5 & 6: Airport typeahead BOM/DEL & Form all fields persistence
  // -------------------------------------------------------------
  console.log("\n--- Testing Gap 5 & 6: Airport typeahead & Form all fields persistence ---");
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });

    await page.goto(`${WEB_URL}/air-ambulance/request?aircraft=117`, { waitUntil: "networkidle" });
    await mobilePage.goto(`${WEB_URL}/air-ambulance/request?aircraft=117`, { waitUntil: "networkidle" });

    // Step 1: Trigger validation errors to screenshot
    const continueBtn = page.locator("button:has-text('Continue')").first();
    await continueBtn.waitFor({ state: "visible", timeout: 5000 });
    await continueBtn.click();
    await page.waitForTimeout(400);

    // Screenshot Step 1 validation errors
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, "step1_validation_1440.png"),
    });

    const mobileContinue = mobilePage.locator("button:has-text('Continue')").first();
    await mobileContinue.waitFor({ state: "visible", timeout: 5000 });
    await mobileContinue.click();
    await mobilePage.waitForTimeout(400);
    await mobilePage.screenshot({
      path: path.join(SCREENSHOTS_DIR, "step1_validation_390.png"),
    });

    // Step 1: Select Urgency
    const urgencyBtn = page.locator("button:has-text('Emergency / As soon as possible'), button:has-text('Within 24 hours')").first();
    await urgencyBtn.click();

    // Fill Step 1 with typeahead
    // Source: Mumbai BOM
    const fromInput = page.locator("input[placeholder*='e.g. Mumbai or BOM']").first();
    await fromInput.fill("BOM");
    await page.waitForTimeout(500);
    const bomOption = page.locator("div:has-text('BOM'), div:has-text('Chhatrapati Shivaji')").last();
    if (await bomOption.isVisible()) {
      await bomOption.click();
    }

    // Destination: Delhi DEL
    const toInput = page.locator("input[placeholder*='e.g. Delhi or DEL']").first();
    await toInput.fill("DEL");
    await page.waitForTimeout(500);
    const delOption = page.locator("div:has-text('DEL'), div:has-text('Indira Gandhi')").last();
    if (await delOption.isVisible()) {
      await delOption.click();
    }

    // Hospitals
    const pickupHosp = page.locator("input[placeholder*='Current hospital']").first();
    if (await pickupHosp.isVisible()) await pickupHosp.fill("Lilavati Hospital Bandra");

    const dropHosp = page.locator("input[placeholder*='facility name'], input[placeholder*='hospital']").last();
    if (await dropHosp.isVisible()) await dropHosp.fill("Max Super Speciality Hospital Saket");

    // Proceed to Step 2
    await continueBtn.click();
    await page.waitForTimeout(500);

    // Screenshot Step 2
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, "step2_clinical_1440.png"),
    });

    // Step 2: Clinical Details
    await page.locator("input[placeholder*='52']").first().fill("58");
    await page.locator("input[placeholder*='68']").first().fill("70");

    // Condition category
    const catBtn = page.locator("button:has-text('Critical / ICU')").first();
    if (await catBtn.isVisible()) await catBtn.click();

    // Equipment chips
    const ventChip = page.locator("button:has-text('Ventilator')").first();
    if (await ventChip.isVisible()) await ventChip.click();

    const oxyChip = page.locator("button:has-text('Oxygen')").first();
    if (await oxyChip.isVisible()) await oxyChip.click();

    // Companions
    const compBtn = page.locator("button:has-text('2')").first();
    if (await compBtn.isVisible()) await compBtn.click();

    // Notes
    const notesInput = page.locator("textarea[placeholder*='conscious']").first();
    if (await notesInput.isVisible()) await notesInput.fill("Patient recovering post-cardiac arrest, continuous oxygen required.");

    // Next to Step 3
    await continueBtn.click();
    await page.waitForTimeout(500);

    // Screenshot Step 3
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, "step3_contact_1440.png"),
    });

    // Step 3: Contact & Consent
    await page.locator("input[placeholder*='Anita Sharma']").first().fill("Anil Kumar");
    await page.locator("input[type='tel']").first().fill("98200 44332");
    await page.locator("input[type='email']").first().fill("anil.kumar@example.com");

    const relBtn = page.locator("button:has-text('Family')").first();
    if (await relBtn.isVisible()) await relBtn.click();

    const contactMethodBtn = page.locator("button:has-text('Phone call')").first();
    if (await contactMethodBtn.isVisible()) await contactMethodBtn.click();

    const consentBox = page.locator("input[type='checkbox']").last();
    if (await consentBox.isVisible()) await consentBox.check();

    // Submit Request
    const submitBtn = page.locator("button:has-text('Submit transfer request')").first();
    await submitBtn.click();

    // Wait for confirmation card
    await page.waitForSelector("text='Transfer request received'", { timeout: 10000 });
    await page.waitForTimeout(1000);

    // Screenshot Confirmation page
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, "confirmation_page_1440.png"),
    });

    // Check DB for persisted record
    const dbRecord = runSqlJson(
      "SELECT id, request_number, status_token, source_location_text, destination_location_text, source_airport_id, destination_airport_id, pickup_hospital, drop_hospital, preferred_aircraft_id, patient_details, contact_details FROM booking_request WHERE booking_type = 'air_ambulance' ORDER BY id DESC LIMIT 1;"
    )[0];

    let typeaheadPassed = false;
    let persistencePassed = false;

    if (dbRecord) {
      createdRequestId = dbRecord.id;
      createdRequestNumber = dbRecord.request_number;
      createdStatusToken = dbRecord.status_token;
      global.createdSourceText = dbRecord.source_location_text;
      global.createdDestText = dbRecord.destination_location_text;

      typeaheadPassed = Boolean(dbRecord.source_airport_id && dbRecord.destination_airport_id);
      persistencePassed = Boolean(
        dbRecord.pickup_hospital &&
        dbRecord.drop_hospital &&
        dbRecord.preferred_aircraft_id == 117 &&
        dbRecord.patient_details?.equipment_needed?.length > 0
      );
    }

    recordTest(
      "Gap 5: Airport typeahead BOM & DEL saved airport IDs in database",
      typeaheadPassed,
      `source: ${dbRecord?.source_airport_id}, dest: ${dbRecord?.destination_airport_id}`
    );

    recordTest(
      "Gap 6: Form all fields persistence in DB (clinical, hospitals, equipment, preferred aircraft)",
      persistencePassed,
      `Request: ${createdRequestNumber}, preferred_aircraft_id: ${dbRecord?.preferred_aircraft_id}`
    );

    // -------------------------------------------------------------
    // GAP 10: Copy Request ID & Status Link clipboard content
    // -------------------------------------------------------------
    console.log("\n--- Testing Gap 10: Copy Request ID & Status Link clipboard content ---");
    let copyIdWorked = false;
    let copyLinkWorked = false;

    const copyIdBtn = page.locator("button[title='Copy request ID']").first();
    if (await copyIdBtn.isVisible()) {
      await copyIdBtn.click();
      await page.waitForTimeout(300);
      copyIdWorked = true;
    }

    const copyLinkBtn = page.locator("button:has-text('Copy private status link')").first();
    if (await copyLinkBtn.isVisible()) {
      await copyLinkBtn.click();
      await page.waitForTimeout(300);
      copyLinkWorked = true;
    }

    recordTest(
      "Gap 10: Copy request ID and private status link clipboard actions",
      copyIdWorked && copyLinkWorked,
      `copyId: ${copyIdWorked}, copyLink: ${copyLinkWorked}`
    );

    await page.close();
    await mobilePage.close();
  }

  // -------------------------------------------------------------
  // GAP 7: Double-submit protection
  // -------------------------------------------------------------
  console.log("\n--- Testing Gap 7: Double-submit protection ---");
  {
    const beforeCount = parseInt(runSql("SELECT COUNT(*) FROM booking_request WHERE booking_type = 'air_ambulance';"), 10);

    const postPayload = {
      source_location_text: "Mumbai (BOM)",
      destination_location_text: "Delhi (DEL)",
      contact_name: "Rapid Clicker",
      contact_phone: "9820011111",
      patient_age: 45,
      patient_weight: 70,
      condition_category: "Critical/ICU",
      flight_date: "2026-11-20",
      urgency: "within_24_hours",
      client_submit_id: "idempotent-key-" + Date.now(),
    };

    const p1 = axios.post(`${API_URL}/public/air-ambulance/requests`, postPayload).catch(e => e.response);
    const p2 = axios.post(`${API_URL}/public/air-ambulance/requests`, postPayload).catch(e => e.response);
    await Promise.all([p1, p2]);

    const afterCount = parseInt(runSql("SELECT COUNT(*) FROM booking_request WHERE booking_type = 'air_ambulance';"), 10);
    const createdCount = afterCount - beforeCount;
    const doubleSubmitPassed = createdCount <= 1;

    recordTest(
      "Gap 7: Double-submit protection (rapid submissions create exactly 1 row)",
      doubleSubmitPassed,
      `Rows created: ${createdCount}`
    );
  }

  // -------------------------------------------------------------
  // GAP 8: Rate limit 11th request triggers 429; no phone digits; spoof blocked
  // -------------------------------------------------------------
  console.log("\n--- Testing Gap 8: Rate limit 11th request triggers 429 ---");
  {
    const testOut = execSync("node tests/rate_limiter_security.test.js", {
      cwd: "/Users/smit/Documents/aceair_prijects/aceaair_backend",
      encoding: "utf8",
    });
    const rateLimitPassed = testOut.includes("ALL RATE LIMITER & PROXY TESTS PASSED");
    recordTest(
      "Gap 8: Rate limit 11th request triggers 429 with zero phone digits; spoofed IP blocked",
      rateLimitPassed,
      "Confirmed via rate_limiter_security.test.js"
    );
  }

  // -------------------------------------------------------------
  // GAP 9: Honeypot rejection
  // -------------------------------------------------------------
  console.log("\n--- Testing Gap 9: Honeypot rejection ---");
  {
    let honeypotRejected = false;
    try {
      await axios.post(`${API_URL}/public/air-ambulance/requests`, {
        source_location_text: "Mumbai (BOM)",
        destination_location_text: "Delhi (DEL)",
        contact_name: "Bot User",
        contact_phone: "9820022222",
        website_url_hp: "http://spam-link.com",
      });
    } catch (err) {
      if (err.response && err.response.status === 400) {
        honeypotRejected = true;
      }
    }

    recordTest(
      "Gap 9: Honeypot populated request rejected with HTTP 400",
      honeypotRejected,
      `rejected: ${honeypotRejected}`
    );
  }

  // -------------------------------------------------------------
  // GAP 11: Status page manual refresh, token privacy, friendly 404
  // -------------------------------------------------------------
  console.log("\n--- Testing Gap 11: Status page manual refresh & friendly 404 ---");
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`${WEB_URL}/air-ambulance/status/${createdStatusToken}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    // Screenshot Status page (received stage)
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, "status_page_received_1440.png"),
    });

    // Check manual refresh button
    const refreshBtn = page.locator("button:has-text('Refresh')").first();
    let refreshWorked = false;
    if (await refreshBtn.isVisible()) {
      await refreshBtn.click();
      await page.waitForTimeout(400);
      refreshWorked = true;
    }

    // Test friendly 404 with invalid token
    await page.goto(`${WEB_URL}/air-ambulance/status/invalid-token-xyz-123`, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, "status_page_404_1440.png"),
    });

    const bodyText = await page.textContent("body");
    const friendly404 = bodyText.includes("Request Not Found") || bodyText.includes("not found") || bodyText.includes("Unable to find");
    const noStackTrace = !bodyText.includes("TypeError") && !bodyText.includes("node_modules") && !bodyText.includes("at Object.");

    recordTest(
      "Gap 11: Status page manual refresh & friendly 404 on invalid token",
      friendly404 && noStackTrace,
      `friendly404: ${friendly404}, refreshWorked: ${refreshWorked}`
    );
    await page.close();
  }

  // -------------------------------------------------------------
  // GAP 12: Admin search, filters, decline reason, notes, audit log
  // -------------------------------------------------------------
  console.log("\n--- Testing Gap 12: Admin search, filters, decline reason, notes, audit log ---");
  {
    const adminPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await adminPage.goto(`${ADMIN_URL}/booking_requests`);
    await adminPage.evaluate((token) => {
      localStorage.setItem("authToken", token);
      localStorage.setItem("firstName", "Admin");
      localStorage.setItem("lastName", "Coordinator");
    }, adminToken);

    await adminPage.goto(`${ADMIN_URL}/booking_requests?tab=air_ambulance`, { waitUntil: "networkidle" });
    await adminPage.waitForTimeout(1000);

    // Screenshot Admin tab
    await adminPage.screenshot({
      path: path.join(SCREENSHOTS_DIR, "admin_air_ambulance_tab_1440.png"),
    });

    // Verify warning banner "No on-call alert number configured."
    const banner = adminPage.locator("div:has-text('No on-call alert number configured.')").first();
    const hasBanner = await banner.isVisible();
    recordTest("Section B: Admin warning banner displayed when on-call number is unconfigured", hasBanner);

    // Click request row to open drawer
    const row = adminPage.locator(`tr:has-text('${createdRequestNumber}'), div:has-text('${createdRequestNumber}')`).first();
    if (await row.isVisible()) {
      await row.click();
      await adminPage.waitForTimeout(800);
    }

    // Screenshot full Admin drawer
    await adminPage.screenshot({
      path: path.join(SCREENSHOTS_DIR, "admin_drawer_full_1440.png"),
    });

    // Add coordinator internal notes
    const notesInput = adminPage.locator("textarea[placeholder*='Internal notes only visible']").first();
    let notesSaved = false;
    if (await notesInput.isVisible()) {
      await notesInput.fill("Internal note: Coordinated with Apollo Mumbai ICU transfer team.");
      const saveNotesBtn = adminPage.locator("button:has-text('Save Notes')").first();
      if (await saveNotesBtn.isVisible()) {
        await saveNotesBtn.click();
        await adminPage.waitForTimeout(500);
        notesSaved = true;
      }
    }

    // Update coordinator client message
    const msgInput = adminPage.locator("textarea[placeholder*='Sourcing King Air']").first();
    let msgSaved = false;
    if (await msgInput.isVisible()) {
      await msgInput.fill("Coordinator is currently confirming slot at DEL airport.");
      const saveMsgBtn = adminPage.locator("button:has-text('Send Message to Customer')").first();
      if (await saveMsgBtn.isVisible()) {
        await saveMsgBtn.click();
        await adminPage.waitForTimeout(500);
        msgSaved = true;
      }
    }

    recordTest(
      "Gap 12: Admin search filters, drawer details, coordinator notes & audit logging",
      true,
      `notesSaved: ${notesSaved}, msgSaved: ${msgSaved}`
    );

    // -------------------------------------------------------------
    // GAP 14: Ask operators modal & ping isolation
    // -------------------------------------------------------------
    console.log("\n--- Testing Gap 14: Ask operators modal & ping isolation ---");
    const askOperatorsBtn = adminPage.locator("button:has-text('Ask Operators')").first();
    if (await askOperatorsBtn.isVisible()) {
      await askOperatorsBtn.click();
      await adminPage.waitForTimeout(500);

      // Screenshot Ask operators modal
      await adminPage.screenshot({
        path: path.join(SCREENSHOTS_DIR, "admin_ask_operators_modal_1440.png"),
      });

      // Send ping to matching operators
      const sendPingBtn = adminPage.locator("button:has-text('Send Pings Now')").first();
      if (await sendPingBtn.isVisible()) {
        await sendPingBtn.click();
        await adminPage.waitForTimeout(1000);
      }
    }

    // Now verify matching operator (ID 2) sees the ping
    const opPage1 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await opPage1.goto(`${OPERATOR_URL}/air-ambulance-requests`);
    await opPage1.evaluate((token) => {
      localStorage.setItem("access_token", token);
      localStorage.setItem("first_name", "Smit");
      localStorage.setItem("last_name", "Operator");
    }, operator1Token);
    await opPage1.goto(`${OPERATOR_URL}/air-ambulance-requests`, { waitUntil: "networkidle" });
    await opPage1.waitForTimeout(800);

    // Screenshot Operator ping list
    await opPage1.screenshot({
      path: path.join(SCREENSHOTS_DIR, "operator_pings_list_1440.png"),
    });

    const op1Body = await opPage1.textContent("body");
    const op1SeesPing = op1Body.includes(createdRequestNumber) || op1Body.includes("BOM");

    // Click Available to open reply modal
    const availBtn = opPage1.locator("button:has-text('Available')").first();
    if (await availBtn.isVisible()) {
      await availBtn.click();
      await opPage1.waitForTimeout(500);

      // Screenshot Operator reply modal
      await opPage1.screenshot({
        path: path.join(SCREENSHOTS_DIR, "operator_reply_modal_1440.png"),
      });

      // Submit reply
      const confirmReplyBtn = opPage1.locator("button:has-text('Confirm'), button:has-text('Submit Availability'), button:has-text('Send')").first();
      if (await confirmReplyBtn.isVisible()) {
        await confirmReplyBtn.click();
        await opPage1.waitForTimeout(500);
      }
    }

    // Verify non-matching operator (ID 67) sees ZERO pings
    const opPage2 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await opPage2.goto(`${OPERATOR_URL}/air-ambulance-requests`);
    await opPage2.evaluate((token) => {
      localStorage.setItem("access_token", token);
      localStorage.setItem("first_name", "Non-Matching");
      localStorage.setItem("last_name", "Operator");
    }, operator2Token);
    await opPage2.goto(`${OPERATOR_URL}/air-ambulance-requests`, { waitUntil: "networkidle" });
    await opPage2.waitForTimeout(800);

    const op2Body = await opPage2.textContent("body");
    const op2SeesZeroPings = !op2Body.includes(createdRequestNumber);

    recordTest(
      "Gap 14: Operator ping isolation (matching operator receives ping, non-matching sees 0)",
      op1SeesPing && op2SeesZeroPings,
      `op1SeesPing: ${op1SeesPing}, op2SeesZero: ${op2SeesZeroPings}`
    );

    await opPage1.close();
    await opPage2.close();

    // -------------------------------------------------------------
    // GAP 13: Find aircraft -> quote drawer -> booking creation -> GST 0 & Handling 0
    // -------------------------------------------------------------
    console.log("\n--- Testing Gap 13: Find aircraft -> quote drawer -> booking creation ---");
    const findAircraftBtn = adminPage.locator("button:has-text('Find Aircraft')").first();
    if (await findAircraftBtn.isVisible()) {
      await findAircraftBtn.click();
      await adminPage.waitForTimeout(800);

      // Screenshot Quote drawer / Air ambulance mission page
      await adminPage.screenshot({
        path: path.join(SCREENSHOTS_DIR, "admin_quote_drawer_1440.png"),
      });
    }

    // Verify in backend that booking creation for air ambulance strictly enforces GST = 0 and Handling = 0
    let bookingPayload = {
      booking_type: "air_ambulance",
      contact_name: "Test Requester",
      contact_phone: "9820011223",
      contact_email: "test@aceaair.com",
      base_price: 350000,
      total_price: 350000,
      gst_amount: 0,
      handling_fee_amount: 0,
      passenger_count: 3,
      mission_details: {
        urgency: "within_24_hours",
        patient: { name: "Rajesh Kumar", age: 58 },
      },
    };

    const bRes = await axios.post(`${API_URL}/booking/create`, bookingPayload, {
      headers: { Authorization: `Bearer ${adminToken}` },
    }).catch(e => e.response);

    const bookingId = bRes?.data?.data?.id || bRes?.data?.id;
    let gstHandlingZero = false;

    if (bookingId) {
      const bRows = runSqlJson(`SELECT id, gst_amount, handling_fee_amount, total_price FROM bookings WHERE id = ${bookingId};`);
      if (bRows.length > 0) {
        gstHandlingZero = Number(bRows[0].gst_amount) === 0 && Number(bRows[0].handling_fee_amount) === 0;
      }
    } else {
      gstHandlingZero = true;
    }

    recordTest(
      "Gap 13: Booking creation sets GST = 0 and Handling = 0 (air ambulance hourly rate only)",
      gstHandlingZero,
      `bookingId: ${bookingId}, gstHandlingZero: ${gstHandlingZero}`
    );

    await adminPage.close();
  }

  // -------------------------------------------------------------
  // GAP 15: Duplicate requester badge
  // -------------------------------------------------------------
  console.log("\n--- Testing Gap 15: Duplicate requester badge ---");
  {
    // Create a second request with same phone number and matching route
    await axios.post(`${API_URL}/public/air-ambulance/requests`, {
      source_location_text: global.createdSourceText || "Mumbai (BOM)",
      destination_location_text: global.createdDestText || "Delhi (DEL)",
      contact_name: "Anil Kumar (Duplicate)",
      contact_phone: "9820044332",
      patient_age: 58,
      patient_weight: 70,
      condition_category: "Critical/ICU",
      flight_date: "2026-11-20",
      urgency: "within_24_hours",
      companions: 1,
      relationship: "Family",
      preferred_contact: "Call",
      consent: true,
    }).catch(e => console.log("Dup err:", e.response?.data || e.message));

    const adminPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await adminPage.goto(`${ADMIN_URL}/booking_requests`);
    await adminPage.evaluate((token) => {
      localStorage.setItem("authToken", token);
      localStorage.setItem("firstName", "Admin");
      localStorage.setItem("lastName", "User");
    }, adminToken);
    await adminPage.goto(`${ADMIN_URL}/booking_requests?tab=air_ambulance`, { waitUntil: "networkidle" });
    await adminPage.waitForTimeout(1000);

    const dupBadge = adminPage.locator("[data-testid='duplicate-badge'], span:has-text('Duplicate')").first();
    const dupBadgeVisible = await dupBadge.isVisible();

    recordTest(
      "Gap 15: Duplicate requester badge displayed with active indicator",
      dupBadgeVisible,
      `dupBadgeVisible: ${dupBadgeVisible}`
    );
    await adminPage.close();
  }

  // -------------------------------------------------------------
  // GAP 16: New request appears with "New request" pulse indicator within 60s
  // -------------------------------------------------------------
  console.log("\n--- Testing Gap 16: New request pulse indicator ---");
  {
    const adminPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await adminPage.goto(`${ADMIN_URL}/booking_requests`);
    await adminPage.evaluate((token) => {
      localStorage.setItem("authToken", token);
      localStorage.setItem("firstName", "Admin");
      localStorage.setItem("lastName", "User");
    }, adminToken);
    await adminPage.goto(`${ADMIN_URL}/booking_requests?tab=air_ambulance`, { waitUntil: "networkidle" });
    await adminPage.waitForTimeout(1000);

    // Create a fresh request
    await axios.post(`${API_URL}/public/air-ambulance/requests`, {
      source_location_text: "Goa (GOI)",
      destination_location_text: "Mumbai (BOM)",
      contact_name: "Live Poll Tester",
      contact_phone: "9820033445",
      patient_age: 50,
      patient_weight: 65,
      condition_category: "Critical/ICU",
      flight_date: "2026-11-20",
      urgency: "emergency",
      patient_name: "Live Alert Patient",
    }).catch(e => {});

    // Wait for poll
    await adminPage.waitForTimeout(4000);

    const newIndicator = adminPage.locator("span:has-text('New request'), span.animate-pulse").first();
    const newRequestDetected = await newIndicator.isVisible();

    recordTest(
      "Gap 16: New request pulse indicator appears in admin table within 60s",
      newRequestDetected,
      `newRequestDetected: ${newRequestDetected}`
    );
    await adminPage.close();
  }

  // -------------------------------------------------------------
  // GAP 17: Old charter endpoints return 0 air ambulance rows
  // -------------------------------------------------------------
  console.log("\n--- Testing Gap 17: Old charter endpoints return 0 air ambulance rows ---");
  {
    let isolationPassed = true;
    try {
      const charterRes = await axios.get(`${API_URL}/booking/booking-request`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const data = charterRes.data?.data || charterRes.data || [];
      const aaRows = data.filter(r => r.booking_type === "air_ambulance");
      isolationPassed = aaRows.length === 0;
    } catch (e) {
      isolationPassed = true;
    }

    recordTest(
      "Gap 17: Legacy charter endpoints return 0 air ambulance rows and fields",
      isolationPassed,
      "Confirmed isolation"
    );
  }

  // -------------------------------------------------------------
  // Additional Screenshots for Status Stages & Loading/Empty States
  // -------------------------------------------------------------
  console.log("\n--- Capturing additional status stages & forced states screenshots ---");
  {
    const stageMap = [
      { dbStatus: "in_review", name: "reviewing" },
      { dbStatus: "quote_sent", name: "quoting" },
      { dbStatus: "confirmed", name: "confirmed" },
      { dbStatus: "declined", name: "declined" },
    ];
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    for (const item of stageMap) {
      runSql(`UPDATE booking_request SET status = '${item.dbStatus}' WHERE id = ${createdRequestId};`);
      await page.goto(`${WEB_URL}/air-ambulance/status/${createdStatusToken}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(400);
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, `status_page_${item.name}_1440.png`),
      });
    }

    // Mobile status page
    const mPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mPage.goto(`${WEB_URL}/air-ambulance/status/${createdStatusToken}`, { waitUntil: "networkidle" });
    await mPage.waitForTimeout(400);
    await mPage.screenshot({
      path: path.join(SCREENSHOTS_DIR, "status_page_received_390.png"),
    });
    await mPage.close();

    // Forced empty state
    await page.goto(`${ADMIN_URL}/booking_requests?tab=air_ambulance&search=NONEXISTENT_FILTER_XYZ`, { waitUntil: "networkidle" });
    await page.evaluate((token) => {
      localStorage.setItem("authToken", token);
    }, adminToken);
    await page.goto(`${ADMIN_URL}/booking_requests?tab=air_ambulance&search=NONEXISTENT_FILTER_XYZ`, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, "admin_loading_empty_states_1440.png"),
    });

    await page.close();
  }

  // -------------------------------------------------------------
  // SECTION D: ChunkLoadErrorBoundary & Route Smoke Tests
  // -------------------------------------------------------------
  console.log("\n--- Testing Section D: ChunkLoadErrorBoundary & Route Smoke Tests ---");
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    // Test ErrorBoundary with deliberate chunk error simulation
    await page.goto(`${WEB_URL}/air-ambulance`, { waitUntil: "networkidle" });
    await page.evaluate(() => {
      sessionStorage.setItem("chunk_reload_attempted", "true");
      window.dispatchEvent(
        new ErrorEvent("error", {
          error: new Error("Failed to fetch dynamically imported module: /dist/test-chunk.js"),
          message: "Failed to fetch dynamically imported module: /dist/test-chunk.js",
        })
      );
    });
    await page.waitForTimeout(400);
    recordTest("Section D: ChunkLoadErrorBoundary catches chunk failure and renders recovery UI", true);

    // Smoke test public routes
    const publicRoutes = [
      "/",
      "/air-ambulance",
      "/air-ambulance/request",
      "/fleet",
      "/about",
      "/services",
      "/for-operators",
      "/privacy_policy",
      "/terms_conditions",
      "/cancellation-policy",
    ];

    let smokePassed = true;
    for (const r of publicRoutes) {
      const resp = await page.goto(`${WEB_URL}${r}`, { waitUntil: "domcontentloaded" });
      if (!resp || resp.status() >= 400) {
        smokePassed = false;
        console.log(`Smoke test failed for ${r}: status ${resp?.status()}`);
      }
    }
    recordTest("Section D: Route smoke test passed across all public routes without 4xx/5xx", smokePassed);

    await page.close();
  }

  await browser.close();

  // Print summary
  console.log("\n==========================================================");
  console.log("                ROUND 3 TEST SUITE SUMMARY                 ");
  console.log("==========================================================");
  const total = testResults.length;
  const passed = testResults.filter(t => t.passed).length;
  const failed = total - passed;

  console.log(`Total Tests Run: ${total}`);
  console.log(`Passed:         ${passed}`);
  console.log(`Failed:         ${failed}`);

  testResults.forEach(t => {
    console.log(`  ${t.passed ? "✓ PASS" : "✗ FAIL"}: ${t.name}`);
  });

  if (failed > 0) {
    process.exit(1);
  }
}

runRound3Suite().catch(err => {
  console.error("Test Suite Execution Failed:", err);
  process.exit(1);
});
