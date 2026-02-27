"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { ViewMode } from "@/lib/dashboard-types"
import { MarketPanel } from "@/components/dashboard/MarketPanel"
import { NewsPanel } from "@/components/dashboard/NewsPanel"
import { CandlestickChart } from "@/components/dashboard/CandlestickChart"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Info, Settings, User } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const initialMode = (searchParams.get('mode') as ViewMode) || 'minimal';
  const [mode, setMode] = React.useState<ViewMode>(initialMode);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation */}
      <header className="h-16 border-b bg-card flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              <span className="font-bold text-primary text-xl">InsightFlow</span>
            </Button>
          </Link>
          <div className="h-6 w-px bg-border" />
          <Tabs value={mode} onValueChange={(v) => setMode(v as ViewMode)}>
            <TabsList className="bg-muted/50 border">
              <TabsTrigger value="focus" className="text-xs">Focus</TabsTrigger>
              <TabsTrigger value="minimal" className="text-xs">Minimal</TabsTrigger>
              <TabsTrigger value="pro" className="text-xs">Pro Desk</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="rounded-full w-8 h-8"><Info className="w-4 h-4" /></Button>
          <Button variant="outline" size="icon" className="rounded-full w-8 h-8"><Settings className="w-4 h-4" /></Button>
          <Button variant="primary" size="sm" className="rounded-full gap-2 px-4">
            <User className="w-4 h-4" />
            Profile
          </Button>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-6 overflow-hidden">
        {mode === 'focus' && (
          <div className="max-w-4xl mx-auto h-full flex flex-col gap-6">
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
              <Info className="w-5 h-5 text-primary mt-1" />
              <div>
                <h4 className="font-bold text-primary mb-1">Guided View Enabled</h4>
                <p className="text-sm text-muted-foreground">Focus mode reduces noise. We've optimized your primary chart and news stream for clarity.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
              <div className="bg-card rounded-2xl border p-2 shadow-sm"><CandlestickChart /></div>
              <div className="bg-card rounded-2xl border p-2 shadow-sm"><NewsPanel /></div>
            </div>
          </div>
        )}

        {mode === 'minimal' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
            <div className="lg:col-span-8 bg-card rounded-2xl border p-2 shadow-sm">
              <CandlestickChart />
            </div>
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-card rounded-2xl border p-2 shadow-sm flex-1"><MarketPanel /></div>
              <div className="bg-card rounded-2xl border p-2 shadow-sm h-1/3"><NewsPanel /></div>
            </div>
          </div>
        )}

        {mode === 'pro' && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 h-full">
            <div className="col-span-2 row-span-2 bg-card rounded-xl border p-2 shadow-sm">
               <CandlestickChart />
            </div>
            <div className="col-span-2 bg-card rounded-xl border p-2 shadow-sm overflow-hidden">
              <NewsPanel />
            </div>
            <div className="bg-card rounded-xl border p-4 shadow-sm flex flex-col justify-center items-center text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Latency</p>
              <p className="text-2xl font-headline text-green-600">12ms</p>
            </div>
            <div className="bg-card rounded-xl border p-4 shadow-sm flex flex-col justify-center items-center text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">System Health</p>
              <p className="text-2xl font-headline text-primary">Stable</p>
            </div>
          </div>
        )}
      </main>

      {/* Status Bar */}
      <footer className="h-8 border-t bg-card flex items-center justify-between px-6 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Exchange: Connected</span>
          <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Feed: Real-time</span>
        </div>
        <div>
          Schema V1.0.0 • Session 08:42:12
        </div>
      </footer>
    </div>
  );
}