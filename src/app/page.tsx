"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Eye, LayoutDashboard, Zap, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function Home() {
  const router = useRouter();

  const modes = [
    {
      id: 'focus',
      title: 'Focus Mode',
      desc: 'Max 1–2 charts, guided overlays, reduced visual noise.',
      icon: <Eye className="w-8 h-8 text-primary" />,
      features: ['Guided Overlays', 'Reduced Motion', 'Minimal Distraction']
    },
    {
      id: 'minimal',
      title: 'Minimal Mode',
      desc: '1 primary chart + watchlist. Professional and clean.',
      icon: <LayoutDashboard className="w-8 h-8 text-primary" />,
      features: ['Balanced Layout', 'Essential Tools', 'Quick Access']
    },
    {
      id: 'pro',
      title: 'Pro Desk Mode',
      desc: 'Multi-chart (max 4). Performance-first configuration.',
      icon: <Zap className="w-8 h-8 text-primary" />,
      features: ['Multi-chart Grid', 'Advanced Indicators', 'High-density Data']
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 sm:p-12">
      <div className="max-w-4xl w-full text-center mb-16 space-y-4">
        <h1 className="text-5xl font-bold font-headline text-primary tracking-tight">InsightFlow</h1>
        <p className="text-xl text-muted-foreground font-body">Choose your professional workspace. Calm UX for critical decisions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {modes.map((mode) => (
          <Card key={mode.id} className="relative group overflow-hidden border-2 hover:border-primary/50 transition-all cursor-pointer bg-card shadow-lg hover:shadow-xl" onClick={() => router.push(`/dashboard?mode=${mode.id}`)}>
            <CardHeader className="space-y-4">
              <div className="p-3 bg-primary/10 rounded-xl w-fit group-hover:bg-primary/20 transition-colors">
                {mode.icon}
              </div>
              <div>
                <CardTitle className="text-2xl font-headline">{mode.title}</CardTitle>
                <CardDescription className="mt-2">{mode.desc}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                {mode.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className="w-full group-hover:translate-x-1 transition-transform">
                Enter Workspace
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-20 text-center opacity-40 text-xs font-bold uppercase tracking-widest flex items-center gap-4">
        <div className="h-px w-20 bg-muted-foreground" />
        Verified Intelligence Platform
        <div className="h-px w-20 bg-muted-foreground" />
      </div>
    </div>
  );
}