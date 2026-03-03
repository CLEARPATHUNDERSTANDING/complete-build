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
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.151 3.096 3.712 3.034 1.498-.058 2.074-1.047 3.882-1.047 1.8 0 2.316 1.047 3.89 1.012 1.61-.027 2.59-1.478 3.572-2.902 1.129-1.659 1.597-3.258 1.621-3.34-.034-.014-3.11-1.194-3.14-4.741-.024-2.96 2.42-4.384 2.53-4.455-1.389-2.03-3.522-2.27-4.274-2.32-1.912-.155-3.41 1.115-4.39 1.115zM15.21 4.501c.849-1.02 1.419-2.439 1.263-3.851-1.218.049-2.69.811-3.562 1.83-.783.9-.1.465-2.421-1.311-3.838.156 1.41.039 2.826-.812 3.86z"/>
            </svg>
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-indigo-400">iOS Ready</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#ff00d4] fill-current drop-shadow-[0_0_12px_#ff00d4]" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.52 14.33c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-11.04 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM18.15 10.66c-.11-.11-.26-.17-.41-.17H6.26c-.15 0-.3.06-.41.17-.11.11-.17.26-.17.41v2.01c0 .15.06.3.17.41.11.11.26.17.41.17h11.49c.15 0 .3-.06.41-.17.11-.11.17-.26.17-.41v-2.01c0-.15-.06-.3-.17-.41zM12 1c-4.97 0-9 4.03-9 9 0 4.18 2.84 7.69 6.69 8.69-.02-.22-.03-.45-.03-.68v-.01c0-1.66 1.34-3 3-3s3 1.34 3 3v.01c0 .23-.01.45-.03.68 3.85-1 6.69-4.51 6.69-8.69 0-4.97-4.03-9-9-9z"/>
            </svg>
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-pink-400">Android Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}