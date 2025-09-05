import React, { useRef } from "react";

export default function PrivacyAndPolicy() {
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
          <h1 className=" text-3xl md:text-4xl font-bold mb-2">
            JustCharter — Privacy Policy
          </h1>
          <p className="text-white  max-w-7xl">
            Comprehensive information about our refund policies, flight
            operations terms, and how we handle your personal data.
          </p>
        </div>
      </header>

      <div className="md:mx-20 px-4 sm:px-6 py-12">
      <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
           Privacy Policy
        </h2>
        <p className="text-gray-700 mb-6">
          This Privacy Policy explains how JustCharter collects, uses, and
          manages personal information from users who access our website or
          services.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              1. Introduction
            </h3>
            <div className="space-y-3 pl-4">
              <p className="text-gray-700">
                This Privacy Policy explains how JustCharter collects, uses, and
                manages personal information from users who access our website
                or services. By using our platform, you agree to the collection
                and use of information in accordance with this policy.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              2. Information We May Collect
            </h3>
            <div className="space-y-3 pl-4">
              <p className="text-gray-700">
                • We may collect basic personal information such as your name,
                contact details, identification documents, and booking-related
                details.
              </p>
              <p className="text-gray-700">
                • We may also gather limited technical data like your IP
                address, browser type, and device information.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              3. How We Use Your Information
            </h3>
            <div className="space-y-3 pl-4">
              <p className="text-gray-700">
                • We use the information to process bookings, communicate with
                you, and improve our services.
              </p>
              <p className="text-gray-700">
                • Information may also be used to comply with applicable legal
                and regulatory requirements.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              4. Sharing of Information
            </h3>
            <div className="space-y-3 pl-4">
              <p className="text-gray-700">
                • Information may be shared with charter operators, government
                authorities, or technical partners only when necessary to
                provide our services or comply with regulations.
              </p>
              <p className="text-gray-700">
                • We do not sell personal information to third-party
                advertisers.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              5. Data Retention
            </h3>
            <div className="space-y-3 pl-4">
              <p className="text-gray-700">
                • Data may be retained for operational, legal, or regulatory
                purposes.
              </p>
              <p className="text-gray-700">
                • Retention duration depends on the nature of the data and
                applicable laws.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              6. Your Choices
            </h3>
            <div className="space-y-3 pl-4">
              <p className="text-gray-700">
                • You may request to view, update, or delete your personal data
                by contacting our support team.
              </p>
              <p className="text-gray-700">
                • Some data may be retained where required by law or for
                legitimate business purposes.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              7. Security
            </h3>
            <div className="space-y-3 pl-4">
              <p className="text-gray-700">
                • We follow standard security practices to help protect your
                information.
              </p>
              <p className="text-gray-700">
                • However, no system can be completely secure.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              8. Policy Updates
            </h3>
            <div className="space-y-3 pl-4">
              <p className="text-gray-700">
                • This Privacy Policy may be updated from time to time.
              </p>
              <p className="text-gray-700">
                • Continued use of our services implies acceptance of the
                revised policy.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              9. Contact
            </h3>
            <div className="space-y-3 pl-4">
              <p className="text-gray-700">
                If you have any questions regarding this policy, please contact
                us at support@justcharter.com.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Consent</h3>
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
