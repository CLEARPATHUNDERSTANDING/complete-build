"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ViewMode, VisualProfile } from "@/lib/dashboard-types"
import { MarketPanel } from "@/components/dashboard/MarketPanel"
import { NewsPanel } from "@/components/dashboard/NewsPanel"
import { CandlestickChart } from "@/components/dashboard/CandlestickChart"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Settings, 
  User, 
  Eye, 
  Layout, 
  Zap, 
  SlidersHorizontal,
  Maximize2,
  Brain,
  Grid2X2,
  Rows,
  Activity,
  LineChart
} from "lucide-react"
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
import { NEURO_PROFILES, NeuroProfileId, getProfile } from "@/lib/neuro/profiles"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { NeuroGlowCard } from "@/components/ui/NeuroGlowCard"
import { TimeframeBar } from "@/components/dashboard/TimeframeBar"
import { BackToDashboard } from "@/components/nav/BackToDashboard"

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // URL Param State
  const initialMode = (searchParams.get('mode') as ViewMode) || 'minimal';
  const profileParam = searchParams.get('profile') as NeuroProfileId;
  const marketParam = searchParams.get('market') || 'stocks';
  const symbolParam = searchParams.get('symbol') || 'AAPL';
  
  // Local State
  const [mode, setMode] = React.useState<ViewMode>(initialMode);
  const [selectedProfileId, setSelectedProfileId] = React.useState<NeuroProfileId>(profileParam || "calm_focus");
  const [layoutStyle, setLayoutStyle] = React.useState<'grid' | 'stack'>('grid');
  const [timeframe, setTimeframe] = React.useState<any>("1h");
  const [selectedSymbol, setSelectedSymbol] = React.useState(symbolParam);

  // Sync URL Params to State
  React.useEffect(() => {
    const p = searchParams.get('profile') as NeuroProfileId;
    if (p && p !== selectedProfileId) setSelectedProfileId(p);
  }, [searchParams, selectedProfileId]);

  React.useEffect(() => {
    const s = searchParams.get('symbol');
    if (s && s !== selectedSymbol) setSelectedSymbol(s);
  }, [searchParams, selectedSymbol]);

  const neuroProfile = React.useMemo(() => getProfile(selectedProfileId), [selectedProfileId]);

  const [visualProfile, setVisualProfile] = React.useState<VisualProfile>({
    density: 'comfortable',
    motion: 'reduced',
    contrast: 'standard',
    fontScaling: 1,
  });

  const handleSymbolSelect = (symbol: string) => {
    setSelectedSymbol(symbol);
    const params = new URLSearchParams(searchParams.toString());
    params.set('symbol', symbol);
    router.replace(`/dashboard?${params.toString()}`, { scroll: false });
  };

  const updateMode = (newMode: ViewMode) => {
    setMode(newMode);
    const params = new URLSearchParams(searchParams.toString());
    params.set('mode', newMode);
    router.replace(`/dashboard?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={`min-h-screen bg-transparent flex flex-col transition-all duration-500 ${visualProfile.contrast === 'high' ? 'contrast-125 saturate-150' : ''} ${visualProfile.motion === 'reduced' ? 'motion-reduce' : ''}`}>
      {/* Top Navigation */}
      <header className="h-16 border-b bg-card/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <BackToDashboard href="/" label="Back to Social" />
          <div className="h-6 w-px bg-border" />
          <Tabs value={mode} onValueChange={(v) => updateMode(v as ViewMode)}>
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
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full border border-primary/10 mr-2">
            <LineChart className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider">{selectedSymbol}</span>
          </div>

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
                  Medical consultant approved structures for neurodivergent focus.
                </SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-8">
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-primary" />
                    Neuro-Divergent Profile
                  </Label>
                  <Select 
                    value={selectedProfileId} 
                    onValueChange={(v) => {
                      setSelectedProfileId(v as NeuroProfileId);
                      const params = new URLSearchParams(searchParams.toString());
                      params.set('profile', v);
                      router.replace(`/dashboard?${params.toString()}`, { scroll: false });
                    }}
                  >
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
                    onCheckedChange={(c) => setVisualProfile(p => ({ ...p, contrast: c ? 'high' : 'standard' }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Reduced Motion</Label>
                    <p className="text-xs text-muted-foreground">Minimize animations to reduce noise.</p>
                  </div>
                  <Switch 
                    checked={visualProfile.motion === 'reduced'} 
                    onCheckedChange={(c) => setVisualProfile(p => ({ ...p, motion: c ? 'reduced' : 'full' }))}
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
                <p className="text-sm text-muted-foreground">Reduced noise, high-contrast assets, and single-task orientation for {selectedSymbol}.</p>
              </div>
            </div>
            <NeuroGlowCard neuroModeId={selectedProfileId} className="flex-1">
              <TimeframeBar active={timeframe} onChange={setTimeframe} neuroModeId={selectedProfileId} />
              <CandlestickChart neuroModeId={selectedProfileId} title={selectedSymbol} height={600} />
            </NeuroGlowCard>
          </div>
        )}

        {mode === 'dual' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            <div className="flex flex-col gap-6">
              <NeuroGlowCard neuroModeId={selectedProfileId} className="flex-1">
                <CandlestickChart neuroModeId={selectedProfileId} title={selectedSymbol} height={450} />
              </NeuroGlowCard>
              <div className="bg-card rounded-2xl border p-2 shadow-sm h-1/3 overflow-hidden">
                <MarketPanel type={marketParam} onSelect={handleSymbolSelect} activeSymbol={selectedSymbol} />
              </div>
            </div>
            <div className="flex flex-col gap-6 border-l-2 border-dashed border-primary/20 pl-6">
              <NeuroGlowCard neuroModeId={selectedProfileId} className="flex-1">
                <CandlestickChart neuroModeId={selectedProfileId} title={`${selectedSymbol} (Alt)`} height={450} />
              </NeuroGlowCard>
              <div className="bg-card rounded-2xl border p-2 shadow-sm h-1/3 overflow-hidden">
                <NewsPanel />
              </div>
            </div>
          </div>
        )}

        {mode === 'quad' && (
          <div className={`h-full ${layoutStyle === 'stack' ? 'overflow-y-auto pr-2 custom-scrollbar' : ''}`}>
            <div className={layoutStyle === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-4 h-full" : "flex flex-col gap-4 pb-10"}>
              <NeuroGlowCard neuroModeId={selectedProfileId} className={layoutStyle === 'grid' ? "h-full" : "h-[450px]"}>
                <CandlestickChart neuroModeId={selectedProfileId} title={selectedSymbol} height={400} />
              </NeuroGlowCard>
              <NeuroGlowCard neuroModeId={selectedProfileId} className={layoutStyle === 'grid' ? "h-full" : "h-[450px]"}>
                <CandlestickChart neuroModeId={selectedProfileId} title={`${selectedSymbol} Vol`} height={400} />
              </NeuroGlowCard>
              <NeuroGlowCard neuroModeId={selectedProfileId} className={layoutStyle === 'grid' ? "h-full" : "h-[450px]"}>
                <CandlestickChart neuroModeId={selectedProfileId} title={`${selectedSymbol} Momentum`} height={400} />
              </NeuroGlowCard>
              <NeuroGlowCard neuroModeId={selectedProfileId} className={layoutStyle === 'grid' ? "h-full" : "h-[450px]"}>
                <CandlestickChart neuroModeId={selectedProfileId} title={`${selectedSymbol} Flux`} height={400} />
              </NeuroGlowCard>
            </div>
          </div>
        )}

        {mode === 'minimal' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
            <div className="lg:col-span-8">
              <NeuroGlowCard neuroModeId={selectedProfileId} className="h-full">
                <CandlestickChart neuroModeId={selectedProfileId} title={selectedSymbol} height={600} />
              </NeuroGlowCard>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-card rounded-2xl border p-2 shadow-sm flex-1 overflow-hidden">
                <MarketPanel type={marketParam} onSelect={handleSymbolSelect} activeSymbol={selectedSymbol} />
              </div>
              <div className="bg-card rounded-2xl border p-2 shadow-sm h-1/3 overflow-hidden">
                <NewsPanel />
              </div>
            </div>
          </div>
        )}

        {mode === 'pro' && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 h-full">
            <div className="col-span-2 row-span-2">
              <NeuroGlowCard neuroModeId={selectedProfileId} className="h-full">
                <CandlestickChart neuroModeId={selectedProfileId} title={selectedSymbol} height={600} />
              </NeuroGlowCard>
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
          <span className="flex items-center gap-1.5 text-primary"><Activity className="w-3 h-3" /> Analyzing: {selectedSymbol}</span>
        </div>
        <div>
          Structure v1.5.0 • Physics Enabled • {neuroProfile.label}
        </div>
      </footer>
    </div>
  );
}
