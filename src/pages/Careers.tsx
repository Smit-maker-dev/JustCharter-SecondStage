import { ArrowRight } from 'lucide-react';

export default function Careers() {
  const positions = [
    { title: "Aviation Consultant", location: "London / Remote", type: "Full-Time" },
    { title: "Senior Logistics Coordinator", location: "New York", type: "Full-Time" },
    { title: "Client Relationship Manager", location: "Dubai", type: "Full-Time" },
  ];

  return (
    <div className="bg-[#F5F5F5] dark:bg-neutral-900 min-h-screen pt-20 md:pt-24 pb-16 md:pb-24">
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mt-8 md:mt-16 mb-12 md:mb-24">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-medium leading-[1.1] md:leading-tight mb-6 md:mb-8 text-black dark:text-white" style={{ letterSpacing: '-0.04em' }}>
          Join the Future of Aviation.
        </h1>
        <p className="text-black/60 dark:text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
          We are always looking for passionate, driven individuals to redefine luxury travel and private aviation operations.
        </p>
      </div>

      <div className="max-w-[88rem] mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-medium mb-8 text-black dark:text-white">Open Positions</h2>
        <div className="grid grid-cols-1 divide-y divide-black/5 dark:divide-white/5 border-t border-black/5 dark:border-white/5">
          {positions.map((pos, idx) => (
            <div key={idx} className="py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-white dark:hover:bg-neutral-950 -mx-4 px-4 transition-colors rounded-xl">
              <div>
                <h3 className="text-xl font-medium text-black dark:text-white mb-2">{pos.title}</h3>
                <div className="flex items-center gap-4 text-sm text-black/50 dark:text-white/50">
                  <span>{pos.location}</span>
                  <span className="w-1 h-1 bg-black/20 dark:bg-white/20 rounded-full" />
                  <span>{pos.type}</span>
                </div>
              </div>
              <button className="flex items-center gap-2 text-black dark:text-white font-medium group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black py-2 px-6 rounded-full border border-black/10 dark:border-white/10 transition-colors">
                Apply Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
