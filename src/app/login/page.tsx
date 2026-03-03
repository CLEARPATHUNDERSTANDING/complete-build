
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Activity, 
  Mail, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Brain
} from "lucide-react";
import { useFirebase } from "@/firebase/provider";
import { initiateEmailSignIn, initiateEmailSignUp } from "@/firebase/non-blocking-login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NeonBoard from "@/components/NeonBoard";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const { auth, user, isUserLoading } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (user && !isUserLoading) {
      router.push("/");
    }
  }, [user, isUserLoading, router]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    if (isSignUp) {
      initiateEmailSignUp(auth, email, password);
      toast({
        title: "Initializing Identity",
        description: "Your diagnostic profile is being broadcast to the network...",
      });
    } else {
      initiateEmailSignIn(auth, email, password);
      toast({
        title: "Synchronizing Data",
        description: "Establishing a secure link to the Intelligence Hub...",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 selection:bg-indigo-500 font-body">
      <div className="w-full max-w-[450px] space-y-10">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.5)]">
            <Activity className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-black uppercase tracking-tighter text-white">CLEAR PATH TRADER</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Secure Identity Protocol v2.5.0</p>
          </div>
        </div>

        <NeonBoard className="w-full">
          <form onSubmit={handleAuth} className="p-8 space-y-6 bg-[#070b16]">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                  <Mail className="w-3 h-3" /> Network Identifier (Email)
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@intelligence.com"
                  className="bg-white/5 border-white/10 h-12 rounded-xl focus:border-indigo-500/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                  <Lock className="w-3 h-3" /> Secure Access Key (Password)
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 h-12 rounded-xl focus:border-indigo-500/50"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 bg-indigo-500 hover:bg-indigo-400 text-white font-black uppercase text-[11px] tracking-widest rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all"
            >
              {isSignUp ? "Authorize Profile →" : "Synchronize Session →"}
            </Button>

            <div className="pt-4 border-t border-white/5 flex flex-col gap-4">
              <button 
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-white transition-colors"
              >
                {isSignUp ? "Already have a profile? Synchronize" : "Need a diagnostic identifier? Create Profile"}
              </button>
              
              <div className="flex items-center gap-3 text-white/20">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[9px] font-bold uppercase tracking-widest leading-none">Encrypted Data Truth Layer Active</span>
              </div>
            </div>
          </form>
        </NeonBoard>

        <div className="flex justify-center gap-8">
          <div className="flex flex-col items-center gap-2 opacity-30">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span className="text-[8px] font-black uppercase tracking-widest">Neuro-Ready</span>
          </div>
          <div className="flex flex-col items-center gap-2 opacity-30">
            <Brain className="w-5 h-5 text-indigo-400" />
            <span className="text-[8px] font-black uppercase tracking-widest">Cognition-Aware</span>
          </div>
        </div>
      </div>
    </div>
  );
}
