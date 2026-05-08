export default function Terms() {
  return (
    <div className="bg-[#F5F5F5] dark:bg-neutral-900 min-h-screen pt-20 md:pt-32 pb-16 md:pb-24">
      <div className="max-w-[56rem] mx-auto px-4 sm:px-6">
        <h1 className="text-4xl md:text-5xl font-medium mb-12 text-black dark:text-white" style={{ letterSpacing: '-0.04em' }}>Terms of Service</h1>
        
        <div className="prose dark:prose-invert prose-lg max-w-none text-black/70 dark:text-white/70">
           <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-medium text-black dark:text-white mt-12 mb-4">1. Charter Agreements</h2>
          <p className="mb-6">By booking a flight with JustCharter, you agree to the terms outlined in the specific Charter Agreement provided at the time of booking. JustCharter acts as an agent arranging carriage by air on behalf of its clients with FAR Part 135 direct air carriers that exercise full operational control of charter flights.</p>

          <h2 className="text-2xl font-medium text-black dark:text-white mt-12 mb-4">2. Cancellations and Modifications</h2>
          <p className="mb-6">Cancellation policies vary depending on the aircraft and notice period. Flights cancelled within 48 hours of departure may be subject to up to a 100% cancellation fee. Any modifications to flight schedules are subject to aircraft and crew availability and may incur additional charges.</p>

          <h2 className="text-2xl font-medium text-black dark:text-white mt-12 mb-4">3. Passenger Conduct</h2>
          <p className="mb-6">Passengers must adhere to all instructions provided by the Pilot in Command (PIC). The PIC maintains ultimate authority over the aircraft and may deny boarding or require disembarkation of any passenger deemed a safety risk, without refund.</p>
        </div>
      </div>
    </div>
  );
}
