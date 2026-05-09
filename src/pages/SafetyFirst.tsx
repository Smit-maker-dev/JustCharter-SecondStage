import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Crosshair, Award } from 'lucide-react';

export default function SafetyFirst() {
  return (
<div className="bg-[#F5F5F5] dark:bg-neutral-900 min-h-screen pt-20 md:pt-24 pb-16 md:pb-24">
<Helmet><title>Safety First | JustCharter Safety Standards</title><meta name="description" content="Safety First | JustCharter Safety Standards" /><script type="application/ld+json">{`{ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://just-charter-second-stage.vercel.app/" }, { "@type": "ListItem", "position": 2, "name": "SafetyFirst", "item": "https://just-charter-second-stage.vercel.app/safetyfirst" }]}`}</script></Helmet>
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mt-8 md:mt-16 mb-12 md:mb-24">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-medium leading-[1.1] md:leading-tight mb-6 md:mb-8 text-black dark:text-white" style={{ letterSpacing: '-0.04em' }}>
          Safety Without Compromise.
        </h1>
        <p className="text-black/60 dark:text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
          At JustCharter, safety is the foundation of everything we do. Our rigorous vetting protocols ensure peace of mind on every journey.
        </p>
      </div>

      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-neutral-950 p-10 rounded-3xl border border-black/5 dark:border-white/5">
          <ShieldCheck className="w-10 h-10 text-black dark:text-white mb-6" />
          <h3 className="text-2xl font-medium mb-4 text-black dark:text-white">Strict Vetting</h3>
          <p className="text-black/60 dark:text-white/60 leading-relaxed">We audit every operator and aircraft before they join our network, checking maintenance records, safety history, and insurance coverage.</p>
        </div>
        <div className="bg-white dark:bg-neutral-950 p-10 rounded-3xl border border-black/5 dark:border-white/5">
          <Crosshair className="w-10 h-10 text-black dark:text-white mb-6" />
          <h3 className="text-2xl font-medium mb-4 text-black dark:text-white">Expert Crew</h3>
          <p className="text-black/60 dark:text-white/60 leading-relaxed">Flight crews must exceed industry standards for flight hours and type-specific training. Two pilots are required on every jet flight.</p>
        </div>
        <div className="bg-white dark:bg-neutral-950 p-10 rounded-3xl border border-black/5 dark:border-white/5">
          <Award className="w-10 h-10 text-black dark:text-white mb-6" />
          <h3 className="text-2xl font-medium mb-4 text-black dark:text-white">Certifications</h3>
          <p className="text-black/60 dark:text-white/60 leading-relaxed">We partner exclusively with ARG/US Platinum, Wyvern Wingman, or IS-BAO registered operators to guarantee the highest echelon of safety.</p>
        </div>
      </div>
    </div>
  );
}
