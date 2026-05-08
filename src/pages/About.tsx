import { ArrowRight, ShieldCheck, EyeOff, Diamond, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const values = [
    {
      icon: <ShieldCheck className="w-8 h-8 stroke-[1.5]" />,
      title: "Uncompromising Safety",
      description: "Our rigorous safety standards exceed industry regulations. Every aircraft and crew member undergoes stringent vetting before every flight."
    },
    {
      icon: <EyeOff className="w-8 h-8 stroke-[1.5]" />,
      title: "Absolute Privacy",
      description: "Discretion is the cornerstone of our service. From confidential bookings to private terminals, your anonymity is guaranteed."
    },
    {
      icon: <Diamond className="w-8 h-8 stroke-[1.5]" />,
      title: "Unrivaled Excellence",
      description: "We obsess over every detail. From curated catering to precise logistics, we deliver a flawless experience, every single time."
    },
    {
      icon: <Globe className="w-8 h-8 stroke-[1.5]" />,
      title: "Global Reach",
      description: "With access to over 7,000 airports worldwide and a diverse fleet, we connect you to any destination, no matter how remote."
    }
  ];

  return (
    <div className="bg-[#F5F5F5] dark:bg-neutral-900 min-h-screen pt-20 md:pt-24 pb-16 md:pb-24">
      {/* Hero Section */}
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mt-8 md:mt-16 mb-12 md:mb-24">
        <h4 className="text-black/50 dark:text-white/50 text-sm mb-4 font-medium tracking-wide uppercase">
          About JustCharter
        </h4>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-medium leading-[1.1] md:leading-tight mb-6 md:mb-8 max-w-4xl" style={{ letterSpacing: '-0.04em' }}>
          We don't just fly you to your destination. We elevate the entire journey.
        </h1>
        <p className="text-black/60 dark:text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
          Founded on the principle that time is your most valuable asset, JustCharter is a premier global aviation network dedicated to seamless, bespoke private travel.
        </p>
      </div>

      {/* Image Block */}
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mb-24 md:mb-32">
        <div className="relative rounded-3xl overflow-hidden aspect-[21/9]">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Gulfstream_G650ER%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0749%29.jpg/1280px-Gulfstream_G650ER%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0749%29.jpg" 
            alt="Private Jet Flying" 
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mb-24 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 item-start">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-4 md:mb-6" style={{ letterSpacing: '-0.03em' }}>
              The New Standard<br/>in Private Aviation.
            </h2>
          </div>
          <div>
            <p className="text-black/70 dark:text-white/70 text-lg leading-relaxed mb-6">
              The traditional charter market is fragmented, opaque, and often unpredictable. We built JustCharter to fix this. By combining cutting-edge logistics technology with deep industry expertise and an unwavering commitment to hospitality, we have created an intuitive, reliable, and transparent way to fly private.
            </p>
            <p className="text-black/70 dark:text-white/70 text-lg leading-relaxed">
              We don't own aircraft; instead, we have cultivated a meticulously vetted network of top-tier operators worldwide. This asset-light approach means our loyalty lies solely with you, the client. We neutrally source the absolute best aircraft for your specific mission, ensuring safety, efficiency, and value.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mb-24 md:mb-32">
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-medium leading-tight" style={{ letterSpacing: '-0.03em' }}>
            Our Core Values
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {values.map((value, idx) => (
            <div key={idx}>
              <div className="mb-6 w-14 h-14 rounded-2xl bg-white dark:bg-neutral-950 shadow-sm flex items-center justify-center text-black dark:text-white">
                {value.icon}
              </div>
              <h3 className="text-xl font-medium mb-3" style={{ letterSpacing: '-0.01em' }}>
                {value.title}
              </h3>
              <p className="text-black/60 dark:text-white/60 text-base leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mb-24 md:mb-32">
        <div className="mb-12 md:mb-16">
          <h4 className="text-black/50 dark:text-white/50 text-sm mb-4 font-medium tracking-wide uppercase">
            Client Perspectives
          </h4>
          <h2 className="text-3xl md:text-4xl font-medium leading-tight" style={{ letterSpacing: '-0.03em' }}>
            Trusted by global leaders.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              quote: "JustCharter fundamentally changed how our executive team travels. Their attention to detail and ability to source exactly what we need on short notice is unmatched.",
              name: "Sarah Jenkins",
              role: "CEO, TechNova Solutions",
              image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200"
            },
            {
              quote: "As someone whose schedule changes by the hour, I need an aviation partner that is as flexible as I am. JustCharter consistently delivers flawless execution.",
              name: "Marcus Thorne",
              role: "Managing Partner, Thorne Capital",
              image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200"
            },
            {
              quote: "We used JustCharter for a complex multi-leg European roadshow. The logistics were handled with absolute precision, and the crew was phenomenally professional.",
              name: "Elena Rodriguez",
              role: "Director of Investor Relations",
              image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200"
            }
          ].map((testimonial, idx) => (
            <div key={idx} className="bg-white dark:bg-neutral-950 rounded-3xl p-8 md:p-10 border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
              <p className="text-black/80 dark:text-white/80 text-lg leading-relaxed mb-8 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-medium text-black dark:text-white leading-snug">{testimonial.name}</h4>
                  <p className="text-sm text-black/50 dark:text-white/50">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Layer */}
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6">
        <div className="bg-black text-white rounded-[2rem] md:rounded-3xl p-8 sm:p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 text-center md:text-left">
           <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-3 md:mb-4" style={{ letterSpacing: '-0.03em' }}>
              Experience the difference.
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-xl">
              Connect with our dedicated aviation experts today to plan your next journey.
            </p>
          </div>
          <button className="shrink-0 inline-flex items-center gap-3 bg-white dark:bg-neutral-950 text-black dark:text-white text-base md:text-lg font-medium px-6 md:px-8 py-3.5 md:py-4 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors duration-200">
            Contact Our Team
            <ArrowRight className="w-5 h-5 text-black dark:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
