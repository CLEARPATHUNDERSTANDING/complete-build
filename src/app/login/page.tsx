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
import { errorEmitter } from "@/firebase/error-emitter";
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

  useEffect(() => {
    const handleAuthError = (error: any) => {
      toast({
        variant: "destructive",
        title: "Security Protocol Failure",
        description: error.message || "Failed to synchronize with the Intelligence Hub.",
      });
    };

    errorEmitter.on('auth-error', handleAuthError);
    return () => errorEmitter.off('auth-error', handleAuthError);
  }, [toast]);

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
            <h1 className="text-3xl font-black uppercase tracking-[0.3em] text-white">CLEAR PATH TRADER</h1>
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

        {/* HIGH-VISIBILITY MOBILE DEPLOYMENT LOGOS */}
        <div className="flex justify-center gap-12 pt-4">
          <div className="flex flex-col items-center gap-3">
            <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#00e5ff] fill-current drop-shadow-[0_0_12px_#00e5ff]" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.05 20.28c-.98.95-2.05 1.61-3.22 1.61-1.12 0-1.5-.68-2.83-.68-1.32 0-1.76.66-2.82.68-1.13.02-2.32-.75-3.32-1.73-2.04-1.99-3.12-5.11-3.12-7.81 0-2.69 1.01-4.64 2.1-5.79 1.09-1.15 2.33-1.74 3.42-1.74 1.04 0 1.76.41 2.72.41 1.01 0 1.5-.41 2.7-.41 1.01 0 2.14.53 3.06 1.43-2.41 1.43-2.01 4.69.41 5.81-.51 1.28-1.17 2.52-2.13 3.56l.01-.01zM12.03 4.13c-.02-1.34.52-2.63 1.41-3.56.91-.95 2.21-1.57 3.51-1.57.02 1.34-.52 2.63-1.41 3.56-.91.95-2.21 1.57-3.51 1.57z"/>
            </svg>
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-indigo-400">iOS Ready</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#ff00d4] fill-current drop-shadow-[0_0_12px_#ff00d4]" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.523 15.3414c-.5511 0-1-.4489-1-1s.4489-1 1-1 1 .4489 1 1-.4489 1-1 1zm-11.046 0c-.5511 0-1-.4489-1-1s.4489-1 1-1 1 .4489 1 1-.4489 1-1 1zM18.1535 11.6566c-.1141-.1141-.2617-.1712-.4092-.1712h-11.4886c-.1475 0-.2951.0571-.4092.1712-.1141.1141-.1712.2617-.1712.4092v2.0114c0 .1475.0571.2951.1712.4092.1141.1141.2617.1712.4092.1712h11.4886c.1475 0 .2951-.0571.4092-.1712.1141-.1141.1712-.2617.1712-.4092v-2.0114c0-.1475-.0571-.2951-.1712-.4092zM12 2c-4.9706 0-9 4.0294-9 9 0 4.1788 2.8412 7.6933 6.6923 8.6885-.0152-.224-.0256-.4501-.0256-.6785v-.01c0-1.6569 1.3431-3 3-3s3 1.3431 3 3v.01c0 .2284-.0104.4545-.0256.6785 3.8511-.9952 6.6923-4.5097 6.6923-8.6885 0-4.9706-4.0294-9-9-9z"/>
            </svg>
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-pink-400">Android Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}
