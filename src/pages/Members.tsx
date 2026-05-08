import { ArrowRight, Check, Shield, Star, Crown } from 'lucide-react';

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
      color: "bg-gray-100",
      textColor: "text-gray-800",
      buttonColor: "bg-black text-white hover:bg-gray-800 dark:hover:bg-neutral-200"
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
      color: "bg-black",
      textColor: "text-white",
      buttonColor: "bg-brand text-white hover:bg-[#c99530]"
    },
    {
      name: "Platinum",
      icon: <Crown className="w-6 h-6 text-purple-600" />,
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
      color: "bg-[#F5F5F5] dark:bg-neutral-900",
      textColor: "text-black dark:text-white",
      buttonColor: "bg-black text-white hover:bg-gray-800 dark:hover:bg-neutral-200"
    }
  ];

  return (
    <div className="bg-white dark:bg-neutral-950 min-h-screen pt-20 md:pt-24 pb-16 md:pb-24">
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mt-8 md:mt-16 mb-12 md:mb-24 text-center">
        <h4 className="text-black/50 dark:text-white/50 text-sm mb-4 font-medium tracking-wide uppercase">
          JustCharter Membership
        </h4>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-medium leading-[1.1] md:leading-tight mb-6 md:mb-8" style={{ letterSpacing: '-0.04em' }}>
          Elevate Your<br/>Travel Status.
        </h1>
        <p className="text-black/60 dark:text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Join an exclusive network of global travelers. Choose the membership tier that aligns perfectly with your lifestyle and flying requirements.
        </p>
      </div>

      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mb-24 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-lg lg:max-w-none mx-auto">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative rounded-3xl p-10 flex flex-col \${plan.color} \${plan.textColor}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand text-white text-xs font-semibold uppercase tracking-widest py-1.5 px-4 rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 \${plan.name === 'Gold' ? 'bg-white/10' : 'bg-white dark:bg-neutral-950 shadow-sm'}`}>
                  {plan.icon}
                </div>
                <h3 className="text-3xl font-medium mb-3" style={{ letterSpacing: '-0.02em' }}>
                  {plan.name}
                </h3>
                <p className="opacity-70 text-sm leading-relaxed mb-6 min-h-[60px]">
                  {plan.description}
                </p>
                <div className="text-xl font-medium">
                  {plan.price}
                </div>
              </div>

              <div className="flex-1">
                <div className="h-px w-full bg-current opacity-10 mb-8" />
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 opacity-70 shrink-0" />
                      <span className="opacity-90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className={`w-full py-4 rounded-full font-medium transition-colors duration-200 \${plan.buttonColor}`}>
                Apply for {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[88rem] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-4 md:mb-6" style={{ letterSpacing: '-0.03em' }}>
              Why become a member?
            </h2>
            <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed mb-8">
              A JustCharter membership isn't just about booking flights—it's about gaining unparalleled control over your time and travel experience. Our dedicated team works around the clock to understand your preferences, anticipate your needs, and deliver flawless execution on every journey.
            </p>
            <button className="inline-flex items-center gap-3 text-black dark:text-white text-lg font-medium group cursor-pointer">
              Speak with a Membership Advisor
              <span className="w-10 h-10 rounded-full bg-[#F5F5F5] dark:bg-neutral-900 flex items-center justify-center group-hover:bg-black transition-colors duration-200">
                <ArrowRight className="w-4 h-4 text-black dark:text-white group-hover:text-white transition-colors" />
              </span>
            </button>
          </div>
          <div className="relative rounded-3xl overflow-hidden aspect-square">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/4/4d/BBJ_interior_2011.jpg" 
              alt="Luxury Interior" 
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
