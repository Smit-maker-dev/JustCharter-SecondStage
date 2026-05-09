import { motion, AnimatePresence } from "motion/react";
import { Plane } from "lucide-react";
import { useEffect, useState } from "react";

export default function SplashScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loaderStatus, setLoaderStatus] = useState("INITIALIZING SYSTEMS");

  const customEase: [number, number, number, number] = [0.76, 0, 0.24, 1]; // Premium cubic-bezier for sophisticated motion

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + 1;
        if (next === 25) setLoaderStatus("SECURING CLEARANCE");
        if (next === 60) setLoaderStatus("PREPARING CABIN");
        if (next === 90) setLoaderStatus("CLEARED FOR TAKEOFF");
        return next;
      });
    }, 30);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        document.body.style.overflow = "";
        onComplete();
      }, 1500); // Wait for exit animation (slide up is long)
    }, 3800);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ y: "0vh" }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 1.2, ease: customEase, delay: 0.2 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-between py-12 md:py-24 bg-[#F5F5F5] dark:bg-[#050505] overflow-hidden"
        >
          {/* Subtle grid background */}
          <motion.div 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_10%,transparent_100%)] opacity-50 block top-0"
          ></motion.div>

          {/* Ambient Glow */}
          <motion.div 
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 dark:bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" 
          />

          {/* Top minimal header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1, delay: 0.5, ease: customEase }}
            className="w-full px-8 md:px-16 flex justify-between items-center text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-black/40 dark:text-white/40 z-10"
          >
            <span>Est. 2026</span>
            <span>Global Aviation</span>
          </motion.div>

          <motion.div 
             exit={{ opacity: 0, y: -50, filter: "blur(10px)", scale: 0.95 }}
             transition={{ duration: 0.8, ease: customEase }}
             className="relative z-10 flex flex-col items-center justify-center flex-1 w-full"
          >
            <div className="flex flex-col items-center">
              {/* Airplane Icon Reveal */}
              <div className="overflow-hidden mb-6 md:mb-8">
                <motion.div
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 1.2, ease: customEase, delay: 0.2 }}
                  className="relative"
                >
                  <Plane className="w-10 h-10 md:w-12 md:h-12 text-black dark:text-white fill-black dark:fill-white" />
                </motion.div>
              </div>

              {/* Title Mask Reveal */}
              <div className="overflow-hidden py-2 px-4 flex">
                {["J", "u", "s", "t", "C", "h", "a", "r", "t", "e", "r"].map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "100%", opacity: 0, rotate: 10 }}
                    animate={{ y: "0%", opacity: 1, rotate: 0 }}
                    transition={{
                      duration: 1.2,
                      ease: customEase,
                      delay: 0.4 + i * 0.04,
                    }}
                    className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-black dark:text-white inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Subtitle Reveal */}
              <div className="overflow-hidden mt-4 md:mt-6">
                <motion.p
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1, ease: customEase }}
                  className="text-black/50 dark:text-white/50 text-[10px] md:text-xs font-medium tracking-[0.4em] uppercase"
                >
                  A higher standard of travel
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Bottom loader */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 1.2, ease: customEase }}
            className="w-full px-8 md:px-16 flex flex-col z-10 gap-3"
          >
            <div className="flex justify-between items-end text-[10px] md:text-xs font-mono uppercase tracking-[0.15em] text-black/40 dark:text-white/40">
              <motion.span
                key={loaderStatus}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {loaderStatus}
              </motion.span>
              <span className="text-black dark:text-white font-medium">{String(Math.min(progress, 100)).padStart(3, '0')}%</span>
            </div>
            
            <div className="w-full h-[1px] bg-black/10 dark:bg-white/10 overflow-hidden relative">
              <motion.div
                className="absolute inset-y-0 left-0 bg-black dark:bg-white w-full origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
