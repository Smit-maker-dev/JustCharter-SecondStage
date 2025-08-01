import React, { useRef } from "react";

export default function PrivacyAndPolicy() {
  const refundRef = useRef(null);
  const operationsRef = useRef(null);
  const privacyRef = useRef(null);
  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <header className="relative bg-[#DFA93B] text-white py-18">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://media.istockphoto.com/id/1457441464/photo/luxury-private-jet.jpg?s=612x612&w=0&k=20&c=R-hqLQXNcMZUUqL9rwR3cadol5w_7oO27lUujn5FHxQ=')",
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-center text-3xl md:text-4xl font-bold mb-2">
            JustCharter — Terms, Operational Guidelines & Privacy Policy
          </h1>
          <p className="text-white text-center max-w-7xl">
            Comprehensive information about our refund policies, flight
            operations terms, and how we handle your personal data.
          </p>
        </div>
        
      </header>

      <div className=" mx-20 px-4 sm:px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
            1. Refund and Cancellation Policy
          </h1>
          <p className="text-gray-700 mb-6">
            This policy applies to all charter flights, including medical/air
            ambulance flights, and covers bookings made by Customers, Agents,
            and Brokers.
          </p>

          <div className="space-y-4 pl-4">
            <div className="flex">
              <span className="text-gray-500 mr-3">•</span>
              <p className="text-gray-700">
                25% of the total charges, based on estimated flying time, will
                be deducted in case a confirmed booking is cancelled after
                flight activation and up to 24 hours before the estimated
                departure time
              </p>
            </div>
            <div className="flex">
              <span className="text-gray-500 mr-3">•</span>
              <p className="text-gray-700">
                50% of the total charges will be deducted in case a confirmed
                booking is cancelled between 24 to 12 hours before the estimated
                departure time.
              </p>
            </div>
            <div className="flex">
              <span className="text-gray-500 mr-3">•</span>
              <p className="text-gray-700">
                100% of the total charges will be deducted in case of a no-show
                or if cancellation is made within 12 hours of the estimated
                departure time.
              </p>
            </div>
            <div className="flex">
              <span className="text-gray-500 mr-3">•</span>
              <p className="text-gray-700">
                100% of the total charges will also be deducted if the aircraft
                has already departed, regardless of any reason for cancellation
                by the customer.
              </p>
            </div>
            <div className="flex">
              <span className="text-gray-500 mr-3">•</span>
              <p className="text-gray-700">
                Refunds for cancelled flights will be processed as per the
                cancellation policy. While efforts are made to process within 24
                working hours, in some cases it may take up to 7 working days
                depending on banking processes or non-working days such as
                holidays.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
            2. Flight Operations Terms and Conditions for Agents & Brokers
          </h1>
          <p className="text-gray-700 mb-6">
            The following terms apply to all operational scenarios managed by
            JustCharter. These conditions are in place to ensure safe, legal,
            and timely operations.
          </p>

          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Operational Requirements
              </h3>
              <div className="space-y-3 pl-4">
                <p className="text-gray-700">
                  • A minimum of 12 working hours is required to activate any
                  flight, during which permissions from multiple regulatory
                  bodies are obtained
                </p>
                <p className="text-gray-700">
                  • For AAI-regulated airports, a 24-hour prior notice is
                  mandatory. Emergency cases may be expedited at the discretion
                  of the authorities.
                </p>
                <p className="text-gray-700">
                  • All flights must operate within the airport's watch hours
                  unless extended permissions are granted. Charges for extended
                  watch hours must be borne by the client.
                </p>
                <p className="text-gray-700">
                  • Airstrips managed by state governments require permission
                  from the District Magistrate. This may take 12+ working hours.
                  Customers are advised to initiate this early.
                </p>
                <p className="text-gray-700">
                  • Flights are permitted only during daylight hours at many
                  state or military airports lacking night operations
                  certification.
                </p>
                <p className="text-gray-700">
                  • Local authorities provide firefighting and ambulance
                  support. Delays due to their unavailability are not
                  JustCharter's responsibility.
                </p>
                <p className="text-gray-700">
                  • Operations at Air Force, Navy, or military airports require
                  a minimum 12-hour notice and are subject to HQ clearance in
                  New Delhi.
                </p>
                <p className="text-gray-700">
                  • Foreign nationals must submit passports for special military
                  clearance. This may take over 6 hours and additional days if
                  on a holiday.
                </p>
                <p className="text-gray-700">
                  • No operations are allowed at military airports after sunset.
                  Delays due to this constraint are not under our control.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Limitations
              </h3>
              <div className="space-y-3 pl-4">
                <p className="text-gray-700">
                  • JustCharter will not be responsible for delays due to
                  unavailability of aircraft parking at destination or origin.
                </p>
                <p className="text-gray-700">
                  • JustCharter is not liable for cancellations due to military
                  operations, VVIP movements, or sudden airport closures.
                </p>
                <p className="text-gray-700">
                  • Unsafe weather conditions or aviation advisories (as per
                  DGCA/AAI) may cause delays or cancellations.
                </p>
                <p className="text-gray-700">
                  • In emergencies like natural disasters or national duties,
                  aircraft may be diverted or grounded. JustCharter cannot be
                  held accountable for mission-critical disruptions.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Technical Considerations
              </h3>
              <div className="space-y-3 pl-4">
                <p className="text-gray-700">
                  • Flights may be diverted to alternate airports. All
                  associated costs (e.g., patient transport, local
                  accommodation) must be borne by the customer.
                </p>
                <p className="text-gray-700">
                  • If the aircraft experiences technical issues before or
                  during the journey (departure, en route, arrival), JustCharter
                  shall not be held responsible for delays or cancellations.
                </p>
                <p className="text-gray-700">
                  • Operations are limited to paved airstrips only. JustCharter
                  does not operate from soft fields, helipads, or seaplane
                  terminals.
                </p>
                <p className="text-gray-700">
                  • Minimum runway length: 4,000-5,000 feet required depending
                  on aircraft specifications. Flights will be cancelled if this
                  condition is not met.
                </p>
                <p className="text-gray-700">
                  • JustCharter does not offer helicopter or seaplane evacuation
                  services.
                </p>
                <p className="text-gray-700">
                  • In case of unscheduled diversions, JustCharter will assist
                  in transferring the client or patient to the nearest hospital
                  but will not cover costs incurred.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
            3. Privacy Policy
          </h2>
          <p className="text-gray-700 mb-6">
            We are committed to protecting your personal information in
            compliance with applicable laws.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                3.1 Data Collection
              </h3>
              <div className="space-y-3 pl-4">
                <p className="text-gray-700">
                  • We collect personal data such as name, email, phone number,
                  government-issued IDs (e.g., passport, Aadhaar), and medical
                  documents (for medevac flights).
                </p>
                <p className="text-gray-700">
                  • We may also collect behavioral data (e.g., booking
                  patterns), device information, and IP addresses to improve
                  user experience.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                3.2 Purpose of Data Use
              </h3>
              <div className="space-y-3 pl-4">
                <p className="text-gray-700">
                  • To facilitate and manage flight bookings, confirmations, and
                  changes.
                </p>
                <p className="text-gray-700">
                  • To communicate with users regarding updates, promotions, and
                  service issues.
                </p>
                <p className="text-gray-700">
                  • To comply with regulatory, legal, or emergency obligations
                  as per DGCA, AAI, or other bodies.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                3.3 Data Sharing
              </h3>
              <div className="space-y-3 pl-4">
                <p className="text-gray-700">
                  • Data is only shared with required third parties (e.g.,
                  hospitals, airport staff, government agencies) to fulfill
                  services.
                </p>
                <p className="text-gray-700">
                  • We do not sell personal data to advertisers or unrelated
                  third parties.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                3.4 Security and Retention
              </h3>
              <div className="space-y-3 pl-4">
                <p className="text-gray-700">
                  • We implement strong encryption, access controls, and secure
                  storage policies.
                </p>
                <p className="text-gray-700">
                  • Personal data is stored only as long as necessary for legal
                  or operational purposes.
                </p>
                <p className="text-gray-700">
                  • Regular security audits are conducted.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                3.5 User Rights
              </h3>
              <div className="space-y-3 pl-4">
                <p className="text-gray-700">
                  • Users have the right to access, modify, or delete their
                  personal data by contacting our support team.
                </p>
                <p className="text-gray-700">
                  • We adhere to privacy laws similar to GDPR and India's IT Act
                  where applicable.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                3.6 Changes to Policy
              </h3>
              <div className="space-y-3 pl-4">
                <p className="text-gray-700">
                  • We may update this policy periodically. Users will be
                  notified via email or on the official JustCharter website.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                3.7 Consent
              </h3>
              <p className="text-gray-700">
                By using our platform or services, users provide consent to
                collect and process their data as outlined above.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
