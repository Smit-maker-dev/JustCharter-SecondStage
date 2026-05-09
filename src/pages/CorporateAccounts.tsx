import { Helmet } from 'react-helmet-async';
import { Briefcase, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function CorporateAccounts() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    monthlyFlights: '',
    routes: '',
    passengers: '',
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      nextStep();
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/corporate-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
<div className="bg-[#F5F5F5] dark:bg-neutral-900 min-h-screen pt-20 md:pt-24 pb-16 md:pb-24">
<Helmet><title>Corporate Jet Charter Accounts | JustCharter</title><meta name="description" content="Corporate Jet Charter Accounts | JustCharter" /><script type="application/ld+json">{`{ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://just-charter-second-stage.vercel.app/" }, { "@type": "ListItem", "position": 2, "name": "CorporateAccounts", "item": "https://just-charter-second-stage.vercel.app/corporateaccounts" }]}`}</script></Helmet>
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mt-8 md:mt-16 mb-12 md:mb-24">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-medium leading-[1.1] md:leading-tight mb-6 md:mb-8 text-black dark:text-white" style={{ letterSpacing: '-0.04em' }}>
          Corporate Accounts.
        </h1>
        <p className="text-black/60 dark:text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
          Streamline your company's travel with centralized billing, dedicated logistics managers, and guaranteed availability for executives worldwide.
        </p>
      </div>

      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mb-16">
        <div className="bg-white dark:bg-neutral-950 p-8 md:p-12 rounded-3xl border border-black/5 dark:border-white/5 max-w-3xl">
          {status === 'success' ? (
            <div className="text-center py-12">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h3 className="text-3xl font-medium mb-4">Enquiry Received</h3>
              <p className="text-black/60 dark:text-white/60 text-lg">
                Thank you for your interest. A dedicated corporate account manager will contact you within 2 business hours.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-medium mb-8">Apply for a Corporate Account</h2>
              
              {/* Progress Bar */}
              <div className="flex gap-2 mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= step ? 'bg-black dark:bg-white' : 'bg-black/10 dark:bg-white/10'}`} />
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-black/70 dark:text-white/70 mb-2">Company Name</label>
                      <input id="companyName" required type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/20 dark:focus:border-white/20 rounded-xl px-4 py-3 outline-none transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="industry" className="block text-sm font-medium text-black/70 dark:text-white/70 mb-2">Industry</label>
                      <input id="industry" required type="text" name="industry" value={formData.industry} onChange={handleChange} className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/20 dark:focus:border-white/20 rounded-xl px-4 py-3 outline-none transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="monthlyFlights" className="block text-sm font-medium text-black/70 dark:text-white/70 mb-2">Est. Monthly Flights</label>
                      <select id="monthlyFlights" required name="monthlyFlights" value={formData.monthlyFlights} onChange={handleChange} className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/20 dark:focus:border-white/20 rounded-xl px-4 py-3 outline-none transition-colors appearance-none">
                        <option value="">Select...</option>
                        <option value="1-5">1-5</option>
                        <option value="6-10">6-10</option>
                        <option value="11-20">11-20</option>
                        <option value="20+">20+</option>
                      </select>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div>
                      <label htmlFor="routes" className="block text-sm font-medium text-black/70 dark:text-white/70 mb-2">Preferred Routes (e.g. LCY-JFK)</label>
                      <input id="routes" required type="text" name="routes" value={formData.routes} onChange={handleChange} className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/20 dark:focus:border-white/20 rounded-xl px-4 py-3 outline-none transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="passengers" className="block text-sm font-medium text-black/70 dark:text-white/70 mb-2">Typical Passenger Count</label>
                      <select id="passengers" required name="passengers" value={formData.passengers} onChange={handleChange} className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/20 dark:focus:border-white/20 rounded-xl px-4 py-3 outline-none transition-colors appearance-none">
                        <option value="">Select...</option>
                        <option value="1-4">1-4 Passengers</option>
                        <option value="5-8">5-8 Passengers</option>
                        <option value="9-14">9-14 Passengers</option>
                        <option value="15+">15+ Passengers</option>
                      </select>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div>
                      <label htmlFor="contactName" className="block text-sm font-medium text-black/70 dark:text-white/70 mb-2">Contact Name</label>
                      <input id="contactName" required type="text" name="contactName" value={formData.contactName} onChange={handleChange} className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/20 dark:focus:border-white/20 rounded-xl px-4 py-3 outline-none transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="contactEmail" className="block text-sm font-medium text-black/70 dark:text-white/70 mb-2">Email Address</label>
                      <input id="contactEmail" required type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/20 dark:focus:border-white/20 rounded-xl px-4 py-3 outline-none transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="contactPhone" className="block text-sm font-medium text-black/70 dark:text-white/70 mb-2">Phone Number</label>
                      <input id="contactPhone" required type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/20 dark:focus:border-white/20 rounded-xl px-4 py-3 outline-none transition-colors" />
                    </div>
                    {status === 'error' && (
                       <p className="text-red-500 text-sm">Failed to submit. Please try again.</p>
                    )}
                  </div>
                )}

                <div className="mt-8 flex justify-between gap-4">
                  {step > 1 && (
                    <button type="button" onClick={prevStep} className="px-6 py-3 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 font-medium transition-colors">
                      Back
                    </button>
                  )}
                  <button type="submit" disabled={status === 'loading'} className={`ml-auto flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black py-3 px-8 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-neutral-200 transition-colors ${status === 'loading' ? 'opacity-70' : ''}`}>
                    {status === 'loading' ? 'Submitting...' : step === 3 ? 'Submit Enquiry' : 'Continue'} 
                    {status !== 'loading' && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
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
            <img src="https://images.unsplash.com/photo-1554774853-719586f82d77?w=1200&q=75&fm=webp&auto=format" alt="Business professionals in meeting environment" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </div>
  );
}
