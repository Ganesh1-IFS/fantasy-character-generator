import React from 'react';

export const WorkbenchDecor: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none opacity-80">
      <div
        className="absolute inset-0 bg-[#0e0a07]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 30%, rgba(218, 165, 32, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 15% 85%, rgba(184, 115, 51, 0.06) 0%, transparent 40%),
            radial-gradient(circle at 85% 85%, rgba(138, 43, 226, 0.05) 0%, transparent 40%),
            linear-gradient(to bottom, rgba(14, 10, 7, 0.7), rgba(8, 5, 4, 0.95))
          `,
        }}
      />

      <div className="absolute -left-24 top-1/4 w-96 h-96 opacity-15">
        <svg viewBox="0 0 400 400" className="w-full h-full animate-[spin_120s_linear_infinite]">
          <circle cx="200" cy="200" r="190" fill="none" stroke="#d4af37" strokeWidth="2" strokeDasharray="8 6" />
          <circle cx="200" cy="200" r="160" fill="none" stroke="#d4af37" strokeWidth="1" />
          <polygon points="200,40 338,280 62,280" fill="none" stroke="#d4af37" strokeWidth="1.5" />
          <polygon points="200,360 62,120 338,120" fill="none" stroke="#d4af37" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="80" fill="none" stroke="#d4af37" strokeWidth="2" />
          <circle cx="200" cy="200" r="40" fill="none" stroke="#d4af37" strokeWidth="1" />
        </svg>
      </div>

      <div className="absolute -right-24 bottom-10 w-96 h-96 opacity-10">
        <svg viewBox="0 0 400 400" className="w-full h-full animate-[spin_160s_linear_infinite_reverse]">
          <circle cx="200" cy="200" r="180" fill="none" stroke="#c084fc" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="#c084fc" strokeWidth="2" strokeDasharray="12 8" />
          <polygon points="200,60 321,130 321,270 200,340 79,270 79,130" fill="none" stroke="#c084fc" strokeWidth="1" />
        </svg>
      </div>

      <div className="absolute top-4 left-6 hidden lg:flex items-end gap-5 opacity-70">
        <div className="relative flex flex-col items-center">
          <div className="w-3 h-6 bg-amber-900/60 border border-amber-600/40 rounded-t" />
          <div className="relative w-12 h-16 rounded-b-2xl border-2 border-cyan-400/40 bg-cyan-950/40 backdrop-blur-xs overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <div className="absolute bottom-0 inset-x-0 h-11 bg-gradient-to-t from-cyan-600 to-cyan-400 opacity-80" />
            <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-white/80 animate-ping" />
            <div className="absolute bottom-5 right-3 w-1 h-1 rounded-full bg-white/90" />
          </div>
          <span className="text-[10px] text-cyan-300 font-serif tracking-widest mt-1 opacity-70">AETHER</span>
        </div>

        <div className="relative flex flex-col items-center">
          <div className="w-2.5 h-5 bg-amber-900/60 border border-amber-600/40" />
          <div className="relative w-14 h-14 rounded-full border-2 border-red-500/40 bg-red-950/40 backdrop-blur-xs overflow-hidden shadow-[0_0_20px_rgba(239,68,68,0.35)]">
            <div className="absolute bottom-0 inset-x-0 h-9 bg-gradient-to-t from-red-600 to-rose-400 opacity-80" />
            <div className="absolute bottom-3 left-4 w-1.5 h-1.5 rounded-full bg-white/70" />
          </div>
          <span className="text-[10px] text-red-300 font-serif tracking-widest mt-1 opacity-70">SANGUIS</span>
        </div>

        <div className="relative flex flex-col items-center">
          <div className="w-2 h-4 bg-amber-900/60" />
          <div className="relative w-7 h-20 rounded-b-full border-2 border-emerald-400/40 bg-emerald-950/40 backdrop-blur-xs overflow-hidden shadow-[0_0_12px_rgba(16,185,129,0.3)]">
            <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-emerald-600 to-teal-400 opacity-75" />
            <div className="absolute bottom-4 left-2 w-1 h-1 rounded-full bg-white/80" />
          </div>
          <span className="text-[10px] text-emerald-300 font-serif tracking-widest mt-1 opacity-70">VENOM</span>
        </div>
      </div>

      <div className="absolute top-4 right-8 hidden lg:flex items-end gap-6 opacity-75">
        <div className="relative flex flex-col items-center rotate-6">
          <div className="w-16 h-8 bg-[#d8c7a1] rounded-sm border border-[#a38a5e] shadow-md flex items-center justify-center">
            <div className="w-2 h-full bg-red-800/80 mx-auto" />
          </div>
          <div className="w-14 h-6 -mt-1 bg-[#c9b486] rounded-sm border border-[#8f7547] shadow-sm" />
        </div>

        <div className="relative flex flex-col items-center">
          <div className="relative -mb-1 w-3 h-5">
            <div className="w-3 h-5 bg-gradient-to-t from-amber-500 via-yellow-300 to-white rounded-full blur-[1px] animate-pulse shadow-[0_0_15px_#f59e0b]" />
            <div className="absolute inset-x-1 bottom-0 h-2 bg-blue-500/80 rounded-full" />
          </div>
          <div className="w-0.5 h-2 bg-black" />
          <div className="w-5 h-12 bg-gradient-to-b from-[#e8dcbd] to-[#bda97e] rounded-t-sm border border-[#9b8559] shadow-inner" />
          <div className="w-12 h-3 bg-gradient-to-r from-[#92400e] via-[#d97706] to-[#78350f] rounded-full border border-[#f59e0b]/50 shadow" />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#060403] to-transparent pointer-events-none" />
    </div>
  );
};
