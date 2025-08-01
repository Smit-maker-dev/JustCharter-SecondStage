import React from "react";

export default function CanceletionPolicy() {
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
            JustCharter – Cancellation & Refund Policy for Users
          </h1>
          <p className="text-white max-w-7xl">
            Details on our cancellation terms, refund procedures, and applicable
            charges.
          </p>
        </div>
      </header>
      <div className="mx-20 px-4 sm:px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
            Cancellation & Refund Policy
          </h2>
          <p className="text-gray-700 mb-6">
            This policy outlines the terms under which users may cancel a
            booking with JustCharter and receive a refund, if applicable.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                1. Overview
              </h3>
              <div className="space-y-3 pl-4">
                <p className="text-gray-700">
                  All cancellations must be communicated through official
                  channels: our website, mobile app, or customer support.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                2. Cancellation Charges
              </h3>
              <div className="space-y-3 pl-4">
                <p className="text-gray-700">
                  • More than 24 hours before departure: 25% of the total
                  estimated flying cost will be charged.
                </p>
                <p className="text-gray-700">
                  • Between 24 to 12 hours before departure: 50% of the total
                  estimated flying cost will be charged.
                </p>
                <p className="text-gray-700">
                  • Within 12 hours of departure or in case of no-show: 100% of
                  the total flying cost will be charged.
                </p>
                <p className="text-gray-700">
                  • After aircraft departure: 100% of the cost is
                  non-refundable, regardless of reason for cancellation.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                3. Refund Process
              </h3>
              <div className="space-y-3 pl-4">
                <p className="text-gray-700">
                  • Refunds will be initiated within 24 working hours of
                  cancellation confirmation.
                </p>
                <p className="text-gray-700">
                  • It may take up to 7 working days for the amount to reflect
                  in your account, depending on your bank or payment gateway.
                </p>
                <p className="text-gray-700">
                  • Refunds will be processed to the original payment method
                  only.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                4. Non-Refundable Charges
              </h3>
              <div className="space-y-3 pl-4">
                <p className="text-gray-700">
                  • Membership or subscription fees (if any)
                </p>
                <p className="text-gray-700">
                  • Government or operator clearance fees
                </p>
                <p className="text-gray-700">
                  • Airport slot booking and special handling charges
                </p>
                <p className="text-gray-700">
                  • Any value-added services or third-party logistics charges
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                5. Rescheduling Policy
              </h3>
              <div className="space-y-3 pl-4">
                <p className="text-gray-700">
                  • Rescheduling requests must be made at least 24 hours before
                  departure.
                </p>
                <p className="text-gray-700">
                  • Rescheduling within 24 hours is treated as a new booking and
                  cancellation charges may apply to the original booking.
                </p>
                <p className="text-gray-700">
                  • All rescheduling is subject to aircraft/operator
                  availability and permissions.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                6. Force Majeure & Operational Interruptions
              </h3>
              <div className="space-y-3 pl-4">
                <p className="text-gray-700">
                  JustCharter is not liable for cancellations due to force
                  majeure events such as:
                </p>
                <p className="text-gray-700">• Natural disasters</p>
                <p className="text-gray-700">
                  • Government-imposed flight restrictions
                </p>
                <p className="text-gray-700">• Airspace or airport closures</p>
                <p className="text-gray-700">• Acts of war or civil unrest</p>
                <p className="text-gray-700 mt-3">
                  In such cases, partial refunds or credits may be provided at
                  JustCharter's sole discretion.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                7. How to Cancel
              </h3>
              <div className="space-y-3 pl-4">
                <p className="text-gray-700">
                  To cancel a booking, users can contact us via:
                </p>
                <p className="text-gray-700">
                  • Email: support@justcharter.com
                </p>
                <p className="text-gray-700">• Phone: [+91-XXXXXXXXXX]</p>
                <p className="text-gray-700">
                  • App/Website: Use the "My Bookings" section to submit
                  cancellation requests
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Policy Acknowledgement
              </h3>
              <p className="text-gray-700">
                By making a booking with JustCharter, you acknowledge that you
                have read, understood, and agreed to this Cancellation & Refund
                Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
