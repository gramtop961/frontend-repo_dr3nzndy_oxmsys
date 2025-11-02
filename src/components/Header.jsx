import { User, Settings } from "lucide-react";

export default function Header({ onSettings = () => {}, onSignIn = () => {} }) {
  return (
    <header className="sticky top-0 z-20 w-full backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-emerald-500 grid place-items-center text-white font-bold">C</div>
          <div className="leading-tight">
            <p className="font-semibold text-slate-900">CarbMat</p>
            <p className="text-xs text-slate-500 -mt-0.5">Your Smart Carb Counting Companion</p>
          </div>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-600">
          <a href="#scan" className="hover:text-slate-900 transition">Scan</a>
          <a href="#log" className="hover:text-slate-900 transition">Today</a>
          <a href="#report" className="hover:text-slate-900 transition">Reports</a>
          <a href="#learn" className="hover:text-slate-900 transition">Learn</a>
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={onSettings} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </button>
          <button onClick={onSignIn} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 transition">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Sign in</span>
          </button>
        </div>
      </div>
    </header>
  );
}
