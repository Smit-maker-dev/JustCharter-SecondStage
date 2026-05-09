import { Helmet } from 'react-helmet-async';
export default function CookiePolicy() {
  return (
<div className="bg-[#F5F5F5] dark:bg-neutral-900 min-h-screen pt-20 md:pt-32 pb-16 md:pb-24">
<Helmet><title>Cookie Policy | JustCharter</title><meta name="description" content="Cookie Policy | JustCharter" /><script type="application/ld+json">{`{ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://just-charter-second-stage.vercel.app/" }, { "@type": "ListItem", "position": 2, "name": "CookiePolicy", "item": "https://just-charter-second-stage.vercel.app/cookiepolicy" }]}`}</script></Helmet>
      <div className="max-w-[56rem] mx-auto px-4 sm:px-6">
        <h1 className="text-4xl md:text-5xl font-medium mb-12 text-black dark:text-white" style={{ letterSpacing: '-0.04em' }}>Cookie Policy</h1>
        
        <div className="prose dark:prose-invert prose-lg max-w-none text-black/70 dark:text-white/70">
           <p className="mb-6">Last updated: January 1, 2024</p>
          
          <h2 className="text-2xl font-medium text-black dark:text-white mt-12 mb-4">1. What are cookies?</h2>
          <p className="mb-6">Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently, as well as to provide reporting information.</p>

          <h2 className="text-2xl font-medium text-black dark:text-white mt-12 mb-4">2. How we use cookies</h2>
          <p className="mb-6">We use essential cookies to maintain your login session and secure your bookings. We also use analytics cookies to understand how our high-net-worth clients interact with our platform, enabling us to refine and elevate the digital experience.</p>

          <h2 className="text-2xl font-medium text-black dark:text-white mt-12 mb-4">3. Managing your preferences</h2>
          <p className="mb-6">You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept essential cookies, you may not be able to use certain portions of our service, including the member portal and booking engine.</p>
        </div>
      </div>
    </div>
  );
}
