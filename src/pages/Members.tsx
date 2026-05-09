import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, Shield, Star, Crown, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Members() {
  const plans = [
    {
      name: "Silver",
      icon: <Shield className="w-6 h-6" />,
      description: "For the occasional private flyer seeking ease and flexibility on demand.",
      price: "Pay as you go",
      features: [
        "Access to Light & Midsize Jets",
        "24/7 Dedicated Account Manager",
        "Standard Catering Options",
        "48-Hour Notice Period",
        "Transparent Point-to-Point Pricing"
      ],
      color: "bg-gray-100 dark:bg-neutral-900 border border-transparent dark:border-white/5",
      textColor: "text-gray-900 dark:text-white",
      buttonColor: "bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-neutral-200"
    },
    {
      name: "Gold",
      icon: <Star className="w-6 h-6 text-brand" />,
      description: "For frequent travelers requiring priority access and fixed hourly certainty.",
      price: "Fixed Hourly Rates",
      popular: true,
      features: [
        "Access to All Jet Categories",
        "Priority Booking Access",
        "Complimentary Cabin Upgrades*",
        "24-Hour Notice Period",
        "Simplified Hourly Pricing",
      ],
      color: "bg-black text-white dark:bg-neutral-950 border border-black dark:border-white/10 shadow-2xl scale-[1.02] z-10",
      textColor: "text-white",
      buttonColor: "bg-brand text-white hover:bg-[#c99530]"
    },
    {
      name: "Platinum",
      icon: <Crown className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      description: "The ultimate membership offering guaranteed availability and unparalleled luxury.",
      price: "Custom Access",
      features: [
        "Guaranteed Aircraft Availability",
        "No Peak Day Surcharges",
        "Complimentary Ground Transfers",
        "12-Hour Notice Period",
        "Premium Custom Catering Included",
        "Priority on Empty Leg Flights"
      ],
      color: "bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/5",
      textColor: "text-gray-900 dark:text-white",
      buttonColor: "bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-neutral-200"
    }
  ];

  return (
<motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-neutral-950 min-h-screen pt-24 md:pt-32 pb-24 md:pb-32"
    >
<Helmet><title>JustCharter Members Club | Exclusive Benefits</title><meta name="description" content="JustCharter Members Club | Exclusive Benefits" /><script type="application/ld+json">{`{ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://just-charter-second-stage.vercel.app/" }, { "@type": "ListItem", "position": 2, "name": "Members", "item": "https://just-charter-second-stage.vercel.app/members" }]}`}</script></Helmet>
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mb-16 md:mb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h4 className="text-black/50 dark:text-white/50 text-sm mb-6 font-medium tracking-[0.15em] uppercase pb-2 border-b border-black/10 dark:border-white/10 inline-block">
            JustCharter Membership
          </h4>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] mb-6 md:mb-8 text-black dark:text-white" style={{ letterSpacing: '-0.04em' }}>
            Elevate Your<br/>Travel Status.
          </h1>
          <p className="text-black/60 dark:text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Join an exclusive network of global travelers. Choose the membership tier that aligns perfectly with your lifestyle and flying requirements.
          </p>
        </motion.div>
      </div>

      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mb-32 md:mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-xl lg:max-w-none mx-auto items-center">
          {plans.map((plan, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              key={idx} 
              className={`relative rounded-[2.5rem] p-10 md:p-12 flex flex-col hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 ease-out group ${plan.color} ${plan.textColor}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand text-white text-[10px] font-bold uppercase tracking-widest py-2 px-6 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${plan.name === 'Gold' ? 'bg-white/10 text-brand' : 'bg-white dark:bg-neutral-800 shadow-sm text-black dark:text-white'}`}>
                  {plan.icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-medium mb-4" style={{ letterSpacing: '-0.02em' }}>
                  {plan.name}
                </h3>
                <p className={`opacity-70 text-base leading-relaxed mb-6 min-h-[72px] font-light ${plan.name === 'Gold' ? 'text-white/80' : 'text-black/70 dark:text-white/70'}`}>
                  {plan.description}
                </p>
                <div className="text-2xl font-medium tracking-tight">
                  {plan.price}
                </div>
              </div>

              <div className="flex-1">
                <div className="h-px w-full bg-current opacity-10 mb-10" />
                <ul className="space-y-5 mb-12">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <Check className="w-5 h-5 opacity-70 shrink-0 mt-0.5" />
                      <span className="opacity-90 leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className={`w-full py-4 rounded-full font-medium transition-all duration-300 shadow-sm hover:shadow-md ${plan.buttonColor}`}>
                Apply for {plan.name}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-[88rem] mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center"
        >
          <div className="order-2 md:order-1">
            <h4 className="text-black/50 dark:text-white/50 text-sm mb-6 font-medium tracking-[0.15em] uppercase pb-2 border-b border-black/10 dark:border-white/10 inline-block">
              Dedicated Service
            </h4>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] mb-6 md:mb-8 text-black dark:text-white" style={{ letterSpacing: '-0.03em' }}>
              Why become a member?
            </h2>
            <p className="text-black/60 dark:text-white/60 text-lg md:text-xl leading-relaxed mb-10 font-light">
              A JustCharter membership isn't just about booking flights—it's about gaining unparalleled control over your time and travel experience. Our dedicated team works around the clock to understand your preferences, anticipate your needs, and deliver flawless execution on every journey.
            </p>
            <button className="flex items-center gap-4 bg-black text-white dark:bg-white dark:text-black px-8 py-4 rounded-full hover:bg-black/90 dark:hover:bg-white/90 transition-all duration-300 font-medium group">
              Speak with an Advisor
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="order-1 md:order-2 relative rounded-[3rem] overflow-hidden aspect-square md:aspect-[4/5] shadow-2xl group">
            <img 
              src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&q=75&fm=webp&auto=format" 
              alt="Luxury Interior" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 border border-white/10 rounded-[3rem] z-10 pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}