import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-[#F5F5F5] dark:bg-neutral-900 min-h-screen pt-20 md:pt-24 pb-16 md:pb-24">
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
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-black/70 dark:text-white/70">First Name</label>
                <input type="text" className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/20 dark:focus:border-white/20 rounded-xl px-4 py-3 outline-none text-black dark:text-white transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-black/70 dark:text-white/70">Last Name</label>
                <input type="text" className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/20 dark:focus:border-white/20 rounded-xl px-4 py-3 outline-none text-black dark:text-white transition-colors" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-black/70 dark:text-white/70">Email Address</label>
              <input type="email" className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/20 dark:focus:border-white/20 rounded-xl px-4 py-3 outline-none text-black dark:text-white transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-black/70 dark:text-white/70">Message</label>
              <textarea rows={4} className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/20 dark:focus:border-white/20 rounded-xl px-4 py-3 outline-none text-black dark:text-white transition-colors resize-none"></textarea>
            </div>
            <button className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2">
              Send Message <Send className="w-4 h-4" />
            </button>
          </form>
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
