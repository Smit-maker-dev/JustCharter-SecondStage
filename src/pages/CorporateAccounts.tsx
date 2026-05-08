import { Briefcase, ArrowRight } from 'lucide-react';

export default function CorporateAccounts() {
  return (
    <div className="bg-[#F5F5F5] dark:bg-neutral-900 min-h-screen pt-20 md:pt-24 pb-16 md:pb-24">
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mt-8 md:mt-16 mb-12 md:mb-24">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-medium leading-[1.1] md:leading-tight mb-6 md:mb-8 text-black dark:text-white" style={{ letterSpacing: '-0.04em' }}>
          Corporate Accounts.
        </h1>
        <p className="text-black/60 dark:text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
          Streamline your company's travel with centralized billing, dedicated logistics managers, and guaranteed availability for executives worldwide.
        </p>
        <button className="mt-8 flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black py-4 px-8 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-neutral-200 transition-colors">
          Inquire Now <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-[88rem] mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-neutral-950 p-12 rounded-3xl border border-black/5 dark:border-white/5 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-medium mb-6 text-black dark:text-white">Seamless Business Travel</h2>
            <ul className="space-y-4 text-black/70 dark:text-white/70">
              <li className="flex items-start gap-4"><Briefcase className="w-6 h-6 mt-1 text-black dark:text-white shrink-0" /> <p>Optimize executive time with point-to-point flights avoiding commercial delays and layovers.</p></li>
              <li className="flex items-start gap-4"><Briefcase className="w-6 h-6 mt-1 text-black dark:text-white shrink-0" /> <p>Unified invoicing and dedicated account management for effortless corporate expense tracking.</p></li>
              <li className="flex items-start gap-4"><Briefcase className="w-6 h-6 mt-1 text-black dark:text-white shrink-0" /> <p>Group charter options for roadshows, corporate retreats, and large-scale team deployments.</p></li>
            </ul>
          </div>
          <div className="flex-1 w-full relative aspect-square md:aspect-auto md:h-[400px] rounded-2xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1554774853-719586f82d77?auto=format&fit=crop&q=80&w=800" alt="Executive Travel" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
