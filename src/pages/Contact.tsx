import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '', website: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.website) {
      // Honeypot triggered, silently succeed
      setStatus('success');
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus('loading');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', message: '', website: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
<div className="bg-[#F5F5F5] dark:bg-neutral-900 min-h-screen pt-20 md:pt-24 pb-16 md:pb-24">
<Helmet><title>Contact JustCharter | 24/7 Charter Support</title><meta name="description" content="Contact JustCharter | 24/7 Charter Support" /><script type="application/ld+json">{`{ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://just-charter-second-stage.vercel.app/" }, { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://just-charter-second-stage.vercel.app/contact" }]}`}</script></Helmet>
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mt-8 md:mt-16 mb-12 md:mb-24">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-medium leading-[1.1] md:leading-tight mb-6 md:mb-8 text-black dark:text-white" style={{ letterSpacing: '-0.04em' }}>
          Get in Touch.
        </h1>
        <p className="text-black/60 dark:text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
          Our global team is available 24/7 to assist with your charter requirements, membership inquiries, or any other questions you may have.
        </p>
      </div>

      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
        {/* Contact Form */}
        <div className="bg-white dark:bg-neutral-950 p-8 md:p-12 rounded-3xl border border-black/5 dark:border-white/5">
          <h2 className="text-2xl md:text-3xl font-medium mb-8 text-black dark:text-white">Send us a message</h2>
          {status === 'success' ? (
            <div className="bg-green-50 dark:bg-green-900/10 text-green-800 dark:text-green-400 p-6 rounded-2xl flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">Message Sent</h4>
                <p className="text-sm opacity-80">Thank you for contacting us. Our team will get back to you within 15 minutes.</p>
                <button onClick={() => setStatus('idle')} className="mt-4 text-sm font-medium hover:underline">Send another message</button>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="website" 
                value={formData.website} 
                onChange={(e) => setFormData({...formData, website: e.target.value})} 
                style={{display:'none'}} 
                tabIndex={-1} 
                aria-hidden="true" 
              />
              
              {status === 'error' && (
                <div className="bg-red-50 dark:bg-red-900/10 text-red-800 dark:text-red-400 p-4 rounded-xl flex items-center gap-3 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  Failed to send message. Please try again.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-black/70 dark:text-white/70">First Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className={`w-full bg-black/5 dark:bg-white/5 border ${errors.firstName ? 'border-red-500' : 'border-transparent focus:border-black/20 dark:focus:border-white/20'} rounded-xl px-4 py-3 outline-none text-black dark:text-white transition-colors`} 
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-black/70 dark:text-white/70">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/20 dark:focus:border-white/20 rounded-xl px-4 py-3 outline-none text-black dark:text-white transition-colors" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-black/70 dark:text-white/70">Email Address <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full bg-black/5 dark:bg-white/5 border ${errors.email ? 'border-red-500' : 'border-transparent focus:border-black/20 dark:focus:border-white/20'} rounded-xl px-4 py-3 outline-none text-black dark:text-white transition-colors`} 
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-black/70 dark:text-white/70">Message <span className="text-red-500">*</span></label>
                <textarea 
                  id="message"
                  rows={4} 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className={`w-full bg-black/5 dark:bg-white/5 border ${errors.message ? 'border-red-500' : 'border-transparent focus:border-black/20 dark:focus:border-white/20'} rounded-xl px-4 py-3 outline-none text-black dark:text-white transition-colors resize-none`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {status === 'loading' ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  <>Send Message <Send className="w-4 h-4" /></>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-medium mb-8 text-black dark:text-white">Contact Information</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white dark:bg-neutral-950 border border-black/5 dark:border-white/5 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-black dark:text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-black dark:text-white mb-1">Phone</h4>
                  <p className="text-black/60 dark:text-white/60 mb-1">+1 (800) 123-4567</p>
                  <p className="text-black/60 dark:text-white/60 text-sm">Available 24/7 for tailored assistance.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white dark:bg-neutral-950 border border-black/5 dark:border-white/5 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-black dark:text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-black dark:text-white mb-1">Email</h4>
                  <p className="text-black/60 dark:text-white/60 mb-1">charter@justcharter.com</p>
                  <p className="text-black/60 dark:text-white/60 text-sm">We'll respond within 15 minutes.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white dark:bg-neutral-950 border border-black/5 dark:border-white/5 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-black dark:text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-black dark:text-white mb-1">Global Headquarters</h4>
                  <p className="text-black/60 dark:text-white/60 mb-1">100 Aviation Way<br/>London, W1J 7BU<br/>United Kingdom</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
