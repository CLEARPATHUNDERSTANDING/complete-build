"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { ViewMode, VisualProfile } from "@/lib/dashboard-types"
import { MarketPanel } from "@/components/dashboard/MarketPanel"
import { NewsPanel } from "@/components/dashboard/NewsPanel"
import { CandlestickChart } from "@/components/dashboard/CandlestickChart"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ChevronLeft, 
  Info, 
  Settings, 
  User, 
  Eye, 
  Layout, 
  Zap, 
  SlidersHorizontal,
  Maximize2,
  Brain,
  Grid2X2,
  Rows
} from "lucide-react"
import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { NEURO_PROFILES, NeuroProfileId, getProfile } from "@/lib/neuro/profiles"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const initialMode = (searchParams.get('mode') as ViewMode) || 'minimal';
  const profileParam = searchParams.get('profile') as NeuroProfileId;
  
  const [mode, setMode] = React.useState<ViewMode>(initialMode);
  const [selectedProfileId, setSelectedProfileId] = React.useState<NeuroProfileId>(profileParam || "calm_focus");
  const [layoutStyle, setLayoutStyle] = React.useState<'grid' | 'stack'>('grid');

  // Update profile if URL param changes
  React.useEffect(() => {
    if (profileParam && profileParam !== selectedProfileId) {
      setSelectedProfileId(profileParam);
    }
  }, [profileParam]);

  const neuroProfile = React.useMemo(() => getProfile(selectedProfileId), [selectedProfileId]);

  const [visualProfile, setVisualProfile] = React.useState<VisualProfile>({
    density: 'comfortable',
    motion: 'reduced',
    contrast: 'standard',
    fontScaling: 1,
  });

  const toggleHighContrast = (checked: boolean) => {
    setVisualProfile(prev => ({ ...prev, contrast: checked ? 'high' : 'standard' }));
  };

  const toggleReducedMotion = (checked: boolean) => {
    setVisualProfile(prev => ({ ...prev, motion: checked ? 'reduced' : 'full' }));
  };

  return (
    <div className={`min-h-screen bg-background flex flex-col transition-all duration-500 ${visualProfile.contrast === 'high' ? 'contrast-125 saturate-150' : ''} ${visualProfile.motion === 'reduced' ? 'motion-reduce' : ''}`}>
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
              <TabsTrigger value="focus" className="text-xs gap-1.5"><Zap className="w-3 h-3" /> Focus</TabsTrigger>
              <TabsTrigger value="minimal" className="text-xs gap-1.5"><Layout className="w-3 h-3" /> Minimal</TabsTrigger>
              <TabsTrigger value="dual" className="text-xs gap-1.5"><Maximize2 className="w-3 h-3" /> Dual</TabsTrigger>
              <TabsTrigger value="quad" className="text-xs gap-1.5"><Grid2X2 className="w-3 h-3" /> Quad</TabsTrigger>
              <TabsTrigger value="pro" className="text-xs gap-1.5"><Eye className="w-3 h-3" /> Pro Desk</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-3">
          {mode === 'quad' && (
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 rounded-full"
              onClick={() => setLayoutStyle(prev => prev === 'grid' ? 'stack' : 'grid')}
            >
              {layoutStyle === 'grid' ? <Rows className="w-4 h-4" /> : <Grid2X2 className="w-4 h-4" />}
              {layoutStyle === 'grid' ? 'Stack Layout' : 'Grid Layout'}
            </Button>
          )}

          <Button variant="outline" size="sm" className="gap-2 rounded-full border-primary/30 bg-primary/5 text-primary">
            <Brain className="w-4 h-4" />
            {neuroProfile.label}
          </Button>

          <Button variant="outline" size="icon" className="rounded-full w-8 h-8"><Info className="w-4 h-4" /></Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full w-8 h-8">
                <SlidersHorizontal className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>UI Personalization</SheetTitle>
                <SheetDescription>
                  Custom structures for neurodivergent focus. Dial down the noise.
                </SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-8">
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-primary" />
                    Neuro-Divergent Profile
                  </Label>
                  <Select value={selectedProfileId} onValueChange={(v) => setSelectedProfileId(v as NeuroProfileId)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a profile" />
                    </SelectTrigger>
                    <SelectContent>
                      {NEURO_PROFILES.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          <div className="flex flex-col items-start gap-0.5">
                            <span className="font-medium">{p.label}</span>
                            <span className="text-[10px] text-muted-foreground">{p.tagline}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>High Contrast</Label>
                    <p className="text-xs text-muted-foreground">Enhance readability and focus.</p>
                  </div>
                  <Switch 
                    checked={visualProfile.contrast === 'high'} 
                    onCheckedChange={toggleHighContrast}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Reduced Motion</Label>
                    <p className="text-xs text-muted-foreground">Minimize animations to reduce noise.</p>
                  </div>
                  <Switch 
                    checked={visualProfile.motion === 'reduced'} 
                    onCheckedChange={toggleReducedMotion}
                  />
                </div>
                <div className="space-y-3">
                  <Label>UI Scaling</Label>
                  <Slider 
                    defaultValue={[visualProfile.fontScaling]} 
                    max={1.5} 
                    min={0.8} 
                    step={0.1}
                    onValueChange={([v]) => setVisualProfile(p => ({ ...p, fontScaling: v }))}
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>

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
              <Zap className="w-5 h-5 text-primary mt-1" />
              <div>
                <h4 className="font-bold text-primary mb-1">Ultra-Focus Mode</h4>
                <p className="text-sm text-muted-foreground">Reduced noise, high-contrast assets, and single-task orientation.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 flex-1 overflow-hidden">
              <div className="bg-card rounded-2xl border p-2 shadow-sm h-full overflow-hidden">
                <CandlestickChart personality={neuroProfile.personality} title="Primary Analysis" />
              </div>
            </div>
          </div>
        )}

        {mode === 'dual' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            <div className="flex flex-col gap-6">
              <div className="bg-card rounded-2xl border p-2 shadow-sm flex-1 overflow-hidden">
                <CandlestickChart personality={neuroProfile.personality} title="Feed Alpha" />
              </div>
              <div className="bg-card rounded-2xl border p-2 shadow-sm h-1/3"><MarketPanel /></div>
            </div>
            <div className="flex flex-col gap-6 border-l-2 border-dashed border-primary/20 pl-6">
              <div className="bg-card rounded-2xl border p-2 shadow-sm flex-1 overflow-hidden">
                <CandlestickChart personality={neuroProfile.personality} title="Feed Beta" />
              </div>
              <div className="bg-card rounded-2xl border p-2 shadow-sm h-1/3"><NewsPanel /></div>
            </div>
          </div>
        )}

        {mode === 'quad' && (
          <div className={`h-full ${layoutStyle === 'stack' ? 'overflow-y-auto pr-2 custom-scrollbar' : ''}`}>
            <div className={layoutStyle === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-4 h-full" : "flex flex-col gap-4 pb-10"}>
              <div className={layoutStyle === 'grid' ? "h-full" : "h-[400px]"}>
                <CandlestickChart personality={neuroProfile.personality} title="Stream 01" />
              </div>
              <div className={layoutStyle === 'grid' ? "h-full" : "h-[400px]"}>
                <CandlestickChart personality={neuroProfile.personality} title="Stream 02" />
              </div>
              <div className={layoutStyle === 'grid' ? "h-full" : "h-[400px]"}>
                <CandlestickChart personality={neuroProfile.personality} title="Stream 03" />
              </div>
              <div className={layoutStyle === 'grid' ? "h-full" : "h-[400px]"}>
                <CandlestickChart personality={neuroProfile.personality} title="Stream 04" />
              </div>
            </div>
          </div>
        )}

        {mode === 'minimal' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
            <div className="lg:col-span-8 bg-card rounded-2xl border p-2 shadow-sm overflow-hidden">
              <CandlestickChart personality={neuroProfile.personality} />
            </div>
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-card rounded-2xl border p-2 shadow-sm flex-1"><MarketPanel /></div>
              <div className="bg-card rounded-2xl border p-2 shadow-sm h-1/3"><NewsPanel /></div>
            </div>
          </div>
        )}

        {mode === 'pro' && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 h-full">
            <div className="col-span-2 row-span-2 bg-card rounded-xl border p-2 shadow-sm overflow-hidden">
               <CandlestickChart personality={neuroProfile.personality} />
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
          Structure v1.2.0 • Identical Dual Active • {neuroProfile.label} • {visualProfile.contrast === 'high' ? 'High Contrast: ON' : ''}
        </div>
      </footer>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--primary) / 0.3);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
