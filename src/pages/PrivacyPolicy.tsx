export default function PrivacyPolicy() {
  return (
    <div className="bg-[#F5F5F5] dark:bg-neutral-900 min-h-screen pt-20 md:pt-32 pb-16 md:pb-24">
      <div className="max-w-[56rem] mx-auto px-4 sm:px-6">
        <h1 className="text-4xl md:text-5xl font-medium mb-12 text-black dark:text-white" style={{ letterSpacing: '-0.04em' }}>Privacy Policy</h1>
        
        <div className="prose dark:prose-invert prose-lg max-w-none text-black/70 dark:text-white/70">
          <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-medium text-black dark:text-white mt-12 mb-4">1. Information We Collect</h2>
          <p className="mb-6">We collect information that you outline during the booking process, membership application, and flight manifest creation. This includes personal identification information (Name, Date of Birth, Passport Details, Email address, Phone number, etc.) required for aviation security and customs adherence.</p>

          <h2 className="text-2xl font-medium text-black dark:text-white mt-12 mb-4">2. How We Use Your Information</h2>
          <p className="mb-6">We use the data we collect to provide luxury charter services, arrange ground transportation, coordinate catering, process payments, and ensure compliance with international aviation regulations. Your personal flight history is used to curate better future experiences.</p>

          <h2 className="text-2xl font-medium text-black dark:text-white mt-12 mb-4">3. Information Sharing and Security</h2>
          <p className="mb-6">We do not sell your personal data. Information is shared strictly on a need-to-know basis with operators, crew members, and relevant border control agencies. We employ industry-leading encryption and strict data minimization practices to safeguard your privacy.</p>
        </div>
      </div>
    </div>
  );
}
