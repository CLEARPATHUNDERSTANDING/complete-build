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
import { useToast } from "@/hooks/use-toast";
import { doc, serverTimestamp } from "firebase/firestore";
import { useMounted } from "@/hooks/use-mounted";
import DiagnosticLogo from "@/components/DiagnosticLogo";
import NeonBoard from "@/components/NeonBoard";

export default function LoginPage() {
  const mounted = useMounted();
  const { auth, firestore, user, isUserLoading } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

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
        title: "Login Error",
        description: error.message || "Could not access the hub.",
      });
    };

    errorEmitter.on('auth-error', handleAuthError as any);
    return () => errorEmitter.off('auth-error', handleAuthError as any);
  }, [toast, mounted]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !auth) return;

    if (isSignUp) {
      initiateEmailSignUp(auth, email, password);
      toast({
        title: "Creating Profile",
        description: "Your identity is being set up...",
      });
    } else {
      initiateEmailSignIn(auth, email, password);
      toast({
        title: "Logging In",
        description: "Connecting to the hub...",
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
          <NeonBoard className="w-48 h-48">
            <DiagnosticLogo size="lg" className="w-full h-full" />
          </NeonBoard>
          <div className="space-y-4">
            <h1 className="text-3xl font-black uppercase tracking-[0.3em] text-white">SECURE ACCESS</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">SECURE LOGIN SYSTEM V2.5.0</p>
          </div>
        </div>

        <div className="w-full p-8 space-y-6 bg-white/[0.02] border border-white/10 rounded-[32px] backdrop-blur-xl">
          <form onSubmit={handleAuth} className="space-y-6 bg-transparent">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                  <Mail className="w-3 h-3 text-indigo-400" /> EMAIL ADDRESS
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="bg-white/5 border-white/10 h-12 rounded-xl focus:border-indigo-500/50 text-white placeholder:text-white/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                  <Lock className="w-3 h-3 text-pink-400" /> PASSWORD
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
              {isSignUp ? "CREATE ACCOUNT →" : "LOG IN →"}
            </Button>

            <div className="pt-4 border-t border-white/5 flex flex-col gap-4 text-center">
              <button 
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-white transition-colors"
              >
                {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
              </button>
              
              <div className="flex items-center justify-center gap-3 text-white/20">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[9px] font-bold uppercase tracking-widest leading-none">Encrypted Connection Active</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
