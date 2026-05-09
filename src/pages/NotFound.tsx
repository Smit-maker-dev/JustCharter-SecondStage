import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, PlaneLanding } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-[#F5F5F5] dark:bg-neutral-900 min-h-screen flex items-center justify-center px-4 pt-20">
      <Helmet>
        <title>404 - Page Not Found | JustCharter</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>
      
      <div className="max-w-md w-full text-center">
        <div className="relative mb-8 inline-block">
          <div className="absolute inset-0 bg-brand/20 blur-3xl rounded-full" />
          <PlaneLanding className="w-24 h-24 text-black dark:text-white relative z-10 mx-auto" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-medium text-black dark:text-white mb-4 tracking-tighter">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium text-black/80 dark:text-white/80 mb-6">
          Lost in transit.
        </h2>
        <p className="text-black/60 dark:text-white/60 text-lg mb-10 leading-relaxed">
          The destination you're looking for doesn't seem to be on our flight path. Let's get you back on course.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-brand transition-colors duration-200"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
