import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="bg-[#F5F5F5] dark:bg-neutral-900 min-h-screen pt-20 md:pt-24 pb-16 md:pb-24 flex items-center justify-center">
      <div className="max-w-md w-full mx-4 bg-white dark:bg-neutral-950 p-10 rounded-3xl border border-black/5 dark:border-white/5 shadow-xl">
        <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-2xl flex items-center justify-center mb-8 mx-auto">
          <Lock className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-medium text-center mb-2 text-black dark:text-white">Welcome Back</h1>
        <p className="text-black/60 dark:text-white/60 text-center mb-8">Sign in to your member portal</p>
        
        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-black/70 dark:text-white/70">Email Address</label>
            <input type="email" className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/20 dark:focus:border-white/20 rounded-xl px-4 py-3 outline-none text-black dark:text-white transition-colors" />
          </div>
          <div className="space-y-2">
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-black/70 dark:text-white/70">Password</label>
                <a href="#" className="text-sm text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white">Forgot password?</a>
             </div>
            <input type="password" className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/20 dark:focus:border-white/20 rounded-xl px-4 py-3 outline-none text-black dark:text-white transition-colors" />
          </div>
          <button className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-neutral-200 transition-colors">
            Sign In
          </button>
        </form>
        
        <p className="mt-8 text-center text-sm text-black/60 dark:text-white/60">
          Not a member yet? <Link to="/members" className="text-black dark:text-white font-medium hover:underline">Explore memberships</Link>
        </p>
      </div>
    </div>
  );
}
