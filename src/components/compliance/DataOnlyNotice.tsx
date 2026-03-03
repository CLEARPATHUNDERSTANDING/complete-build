'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function DataOnlyNotice({ line }: { line: string }) {
  return (
    <div className="bg-indigo-500/5 border border-indigo-500/20 p-4 rounded-2xl flex items-start gap-4">
      <div className="p-2 bg-indigo-500/10 rounded-lg shrink-0">
        <ShieldCheck className="w-5 h-5 text-indigo-400" />
      </div>
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-1">Compliance Monitor</h4>
        <p className="text-[11px] font-bold text-white/50 leading-relaxed uppercase tracking-widest">
          {line}
        </p>
      </div>
    </div>
  );
}
