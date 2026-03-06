"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Mail, 
  Lock, 
  ShieldCheck, 
  Loader2
} from "lucide-react";
import { useFirebase } from "@/firebase/provider";
import { initiateEmailSignIn, initiateEmailSignUp } from "@/firebase/non-blocking-login";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { errorEmitter } from "@/firebase/error-emitter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NeonBoard from "@/components/NeonBoard";
import { useToast } from "@/hooks/use-toast";
import { doc, serverTimestamp } from "firebase/firestore";
import { useMounted } from "@/hooks/use-mounted";

export default function LoginPage() {
  const mounted = useMounted();
  const { auth, firestore, user, isUserLoading } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  // Sync user profile to database on first login
  useEffect(() => {
    if (mounted && user && !isUserLoading && firestore) {
      const userRef = doc(firestore, "users", user.uid);
      setDocumentNonBlocking(userRef, {
        id: user.uid,
        role: "standard",
        lastSeen: serverTimestamp(),
        email: user.email,
        createdAt: serverTimestamp()
      }, { merge: true });
      
      // Allow profile broadcast to initialize before navigation
      const timer = setTimeout(() => {
        router.push("/community");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [user, isUserLoading, router, firestore, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const handleAuthError = (error: any) => {
      toast({
        variant: "destructive",
        title: "Security Protocol Failure",
        description: error.message || "Failed to synchronize with the Intelligence Hub.",
      });
    };

    errorEmitter.on('auth-error', handleAuthError);
    return () => errorEmitter.off('auth-error', handleAuthError);
  }, [toast, mounted]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !auth) return;

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

  if (!mounted || isUserLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 selection:bg-indigo-500 font-body">
      <div className="w-full max-w-[500px] space-y-10">
        <div className="flex flex-col items-center gap-10 text-center">
          <NeonBoard className="w-40 h-40 group hover:scale-110 transition-transform duration-500">
            <img 
              src="https://i.postimg.cc/3NZqktNh/Chat-GPT-Image-Feb-26-2026-02-20-36-PM.png"
              alt="Clear Path Logo"
              className="w-full h-full object-cover brightness-125 saturate-150"
            />
          </NeonBoard>
          <div className="space-y-4">
            <h1 className="text-3xl font-black uppercase tracking-[0.3em] text-white">SECURE ACCESS</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Diagnostic Identity Protocol v2.5.0</p>
          </div>
        </div>

        <NeonBoard className="w-full">
          <form onSubmit={handleAuth} className="p-8 space-y-6 bg-transparent">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                  <Mail className="w-3 h-3 text-indigo-400" /> Network Identifier
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@intelligence.com"
                  className="bg-white/5 border-white/10 h-12 rounded-xl focus:border-indigo-500/50 text-white placeholder:text-white/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                  <Lock className="w-3 h-3 text-pink-400" /> Secure Key
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 h-12 rounded-xl focus:border-indigo-500/50 text-white placeholder:text-white/20"
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
      </div>
    </div>
  );
}