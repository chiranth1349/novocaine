// HPI 1.7-V
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video, Circle, Square, Activity, Cpu, Thermometer,
  Gauge, Brain, Play, Maximize2, Download, Crosshair,
  Wifi, Settings2, Terminal
} from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { useBackend } from '@/hooks/useBackend';
import { api } from '@/lib/api';
 
export default function HomePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [selectedMode, setSelectedMode] = useState('Smart Detection');
const [systemTime, setSystemTime] = useState<Date>(new Date());

useEffect(() => {
  const clockInterval = setInterval(() => {
    setSystemTime(new Date());
  }, 1000);

  return () => clearInterval(clockInterval);
}, []);

 
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => setRecordingDuration(prev => prev + 1), 1000);
    } else {
      setRecordingDuration(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);
 
  const { telemetry, detection, events } = useBackend();
 
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
 
  const operationModes = [
    { name: 'Feed Only', icon: Video, desc: 'Raw optical input' },
    { name: 'Smart Detection', icon: Brain, desc: 'AI-assisted tracking' },
    { name: '24/7 Online', icon: Activity, desc: 'Continuous logging' },
    { name: 'Tracking Mode', icon: Crosshair, desc: 'Lock on target' },
    { name: 'Passive Monitor', icon: Circle, desc: 'Low power state' }
  ];
 
  const avgConfidence = detection?.confidence ?? 0;
 
  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph flex flex-col overflow-hidden selection:bg-primary/30">
      <style dangerouslySetInnerHTML={{__html: `
        .tech-border { position: relative; }
        .tech-border::before, .tech-border::after {
          content: ''; position: absolute; width: 8px; height: 8px;
          border-color: theme('colors.primary'); border-style: solid; transition: all 0.3s ease;
        }
        .tech-border::before { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
        .tech-border::after { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }
        .tech-border:hover::before, .tech-border:hover::after { width: 16px; height: 16px; }
        .scanline {
          width: 100%; height: 100px;
          background: linear-gradient(to bottom, transparent, theme('colors.primary' / 10%), transparent);
          position: absolute; top: -100px; left: 0;
          animation: scan 4s linear infinite; pointer-events: none; z-index: 10;
        }
        @keyframes scan { 0% { top: -100px; } 100% { top: 100%; } }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: theme('colors.background'); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: theme('colors.thin-separator'); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: theme('colors.primary' / 50%); }
        .grid-bg {
          background-size: 40px 40px;
          background-image:
            linear-gradient(to right, theme('colors.thin-separator' / 30%) 1px, transparent 1px),
            linear-gradient(to bottom, theme('colors.thin-separator' / 30%) 1px, transparent 1px);
        }
      `}} />
 
      <Header />
      <div className="flex flex-1 overflow-hidden relative z-10">
        <Sidebar />
        <main className="flex-1 flex flex-col lg:flex-row gap-6 p-6 ml-20 h-[calc(100vh-64px)] overflow-hidden bg-background grid-bg">
 
          {/* CENTER COLUMN */}
          <div className="flex-1 flex flex-col min-w-0 gap-6 h-full">
 
            {/* Status Bar */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between bg-[#10151c]/80 backdrop-blur-md border border-thin-separator p-3 rounded-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-primary font-heading text-sm tracking-widest">
                  <Terminal className="w-4 h-4" /><span>SYS.OP.NOVOCAINE_v2.4</span>
                </div>
                <div className="h-4 w-[1px] bg-thin-separator"></div>
                <div className="flex items-center gap-2 text-xs text-foreground/60 font-heading">
                  <Wifi className="w-3 h-3 text-secondary" /><span>UPLINK SECURE</span>
                </div>
              </div>
              <div className="text-xs font-heading text-foreground/60 tracking-widest">
                {systemTime.toISOString().replace('T', ' ').substring(0, 19)} UTC
              </div>
            </motion.div>
 
            {/* Video Feed */}
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative flex-1 bg-black border border-thin-separator rounded-sm overflow-hidden tech-border group">
              <div className="scanline"></div>
              <img src="http://localhost:5000/video_feed" alt="Live UAV Feed"
                className="w-full h-full object-cover opacity-85 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(11,15,20,0.8)_100%)] pointer-events-none" />
 
              {/* Crosshair */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 pointer-events-none opacity-30">
                <div className="absolute top-0 left-1/2 w-[1px] h-full bg-primary"></div>
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary"></div>
                <div className="absolute inset-0 border border-primary rounded-full"></div>
              </div>
 
              {/* Recording / Live badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-3">
                <AnimatePresence>
                  {isRecording && (
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                      className="flex items-center gap-3 bg-destructive/10 backdrop-blur-md px-4 py-2 border-l-2 border-destructive">
                      <div className="w-2.5 h-2.5 bg-destructive rounded-full animate-pulse shadow-[0_0_10px_rgba(255,0,51,0.8)]" />
                      <span className="text-sm font-heading text-destructive tracking-widest">REC {formatDuration(recordingDuration)}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="flex items-center gap-3 bg-primary/10 backdrop-blur-md px-4 py-2 border-l-2 border-primary">
                  <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
                  <span className="text-sm font-heading text-primary tracking-widest">LIVE FEED</span>
                </div>
              </div>
 
              {/* Telemetry overlay */}
              <div className="absolute top-6 right-6 flex flex-col items-end gap-1 text-xs font-heading text-primary/80 tracking-wider text-right">
                <div>ALT: 1,240M</div><div>SPD: 145 KM/H</div><div>HDG: 274° W</div>
                <div className="mt-2 text-secondary">AI: ACTIVE</div>
              </div>
 
              {/* Bounding boxes — driven by bbox from backend */}
              {(detection?.detections ?? []).slice(0, 3).map((det, idx) => {
                const [x1, y1, x2, y2] = det.bbox ?? [
                  0.28 + idx * 0.12, 0.25 + idx * 0.1,
                  0.52 + idx * 0.12, 0.55 + idx * 0.1,
                ];
                return (
                  <motion.div key={idx}
                    initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.3, duration: 0.4 }}
                    className="absolute border border-primary/50 bg-primary/5"
                    style={{ top: `${y1 * 100}%`, left: `${x1 * 100}%`, width: `${(x2 - x1) * 100}%`, height: `${(y2 - y1) * 100}%` }}>
                    <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t-2 border-l-2 border-primary" />
                    <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t-2 border-r-2 border-primary" />
                    <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b-2 border-l-2 border-primary" />
                    <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-2 border-r-2 border-primary" />
                    <div className="absolute -top-6 left-0 flex items-center gap-2">
                      <div className="bg-primary/20 backdrop-blur-md border border-primary/50 px-2 py-0.5 text-[10px] font-heading text-primary tracking-wider uppercase">{det.label}</div>
                      <div className="text-[10px] font-heading text-secondary bg-background/80 px-1">{det.confidence}%</div>
                    </div>
                  </motion.div>
                );
              })}
 
              {/* Bottom controls */}
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-background/90 to-transparent flex items-end justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={() => setIsRecording(!isRecording)}
                    className={`p-3 rounded-sm border transition-all duration-300 flex items-center justify-center ${
                      isRecording
                        ? 'bg-destructive/20 border-destructive text-destructive shadow-[0_0_15px_rgba(255,0,51,0.3)]'
                        : 'bg-[#10151c]/80 border-thin-separator text-foreground hover:border-primary hover:text-primary backdrop-blur-md'}`}>
                    {isRecording ? <Square className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                  </button>
                  <button className="p-3 rounded-sm bg-[#10151c]/80 border border-thin-separator text-foreground hover:border-primary hover:text-primary backdrop-blur-md transition-all duration-300">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-xs font-heading text-foreground/50 tracking-widest">CAM_01 // OPTICAL</div>
                  <button className="p-3 rounded-sm bg-[#10151c]/80 border border-thin-separator text-foreground hover:border-primary hover:text-primary backdrop-blur-md transition-all duration-300">
                    <Maximize2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
 
            {/* Operation Modes */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }} className="h-28 flex-shrink-0">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-heading text-foreground/50 uppercase tracking-[0.2em]">Operation Mode</h3>
                <div className="h-[1px] flex-1 bg-thin-separator ml-4"></div>
              </div>
              <div className="flex gap-3 h-[72px]">
                {operationModes.map((mode) => {
                  const Icon = mode.icon;
                  const isSelected = selectedMode === mode.name;
                  return (
                    <button key={mode.name}
                      onClick={() => { setSelectedMode(mode.name); api.setMode(mode.name.toLowerCase().replace(/ /g, '_')); }}
                      className={`flex-1 relative overflow-hidden rounded-sm border transition-all duration-300 flex flex-col items-center justify-center gap-1 group ${
                        isSelected ? 'bg-primary/10 border-primary shadow-[inset_0_0_20px_rgba(0,255,255,0.1)]'
                          : 'bg-[#10151c] border-thin-separator hover:border-primary/50 hover:bg-[#10151c]/80'}`}>
                      {isSelected && <motion.div layoutId="activeMode" className="absolute top-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_10px_rgba(0,255,255,0.8)]" />}
                      <Icon className={`w-5 h-5 transition-colors duration-300 ${isSelected ? 'text-primary' : 'text-foreground/40 group-hover:text-primary/70'}`} />
                      <div className={`text-[10px] font-heading tracking-wider transition-colors duration-300 ${isSelected ? 'text-primary' : 'text-foreground/60 group-hover:text-foreground'}`}>
                        {mode.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
 
          {/* RIGHT COLUMN */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full lg:w-80 flex flex-col h-full flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-heading text-foreground/50 uppercase tracking-[0.2em]">System Telemetry</h3>
              <Settings2 className="w-4 h-4 text-foreground/40 hover:text-primary cursor-pointer transition-colors" />
            </div>
 
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
 
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-[#10151c] p-4 border border-thin-separator rounded-sm tech-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] text-foreground/50 font-heading uppercase tracking-wider">FPS</span>
                    <Activity className="w-3 h-3 text-primary" />
                  </div>
                  <div className="text-2xl font-heading text-primary tracking-tight">{telemetry?.fps ?? '—'}</div>
                  <div className="mt-3 h-[2px] bg-background w-full overflow-hidden">
                    <div className="h-full bg-primary shadow-[0_0_5px_rgba(0,255,255,0.5)]"
                      style={{ width: `${Math.min((telemetry?.fps ?? 0) / 60 * 100, 100)}%` }} />
                  </div>
                </div>
                <div className="bg-[#10151c] p-4 border border-thin-separator rounded-sm tech-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] text-foreground/50 font-heading uppercase tracking-wider">Ping</span>
                    <Gauge className="w-3 h-3 text-secondary" />
                  </div>
                  <div className="text-2xl font-heading text-secondary tracking-tight">12<span className="text-sm text-secondary/50">ms</span></div>
                  <div className="mt-3 h-[2px] bg-background w-full overflow-hidden">
                    <div className="h-full bg-secondary w-1/5 shadow-[0_0_5px_rgba(64,224,208,0.5)]" />
                  </div>
                </div>
              </div>
 
              <div className="bg-[#10151c] p-4 border border-thin-separator rounded-sm space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-primary" />
                      <span className="text-[10px] text-foreground/70 font-heading uppercase tracking-wider">GPU Usage</span>
                    </div>
                    <span className="text-xs font-heading text-primary">{telemetry?.gpu_usage ?? '—'}%</span>
                  </div>
                  <div className="h-[3px] bg-background w-full overflow-hidden rounded-full">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${telemetry?.gpu_usage ?? 0}%` }}
                      transition={{ duration: 1, delay: 0.5 }} className="h-full bg-primary shadow-[0_0_8px_rgba(0,255,255,0.6)]" />
                  </div>
                  <div className="flex justify-between mt-1 text-[9px] text-foreground/40 font-heading">
                    <span>Freq: 2189 MHz</span><span>GPU: {telemetry?.gpu_usage ?? '—'}%</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-3.5 h-3.5 text-secondary" />
                      <span className="text-[10px] text-foreground/70 font-heading uppercase tracking-wider">CPU Load</span>
                    </div>
                    <span className="text-xs font-heading text-secondary">{telemetry?.cpu_load ?? '—'}%</span>
                  </div>
                  <div className="h-[3px] bg-background w-full overflow-hidden rounded-full">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${telemetry?.cpu_load ?? 0}%` }}
                      transition={{ duration: 1, delay: 0.6 }} className="h-full bg-secondary shadow-[0_0_8px_rgba(64,224,208,0.6)]" />
                  </div>
                  <div className="flex justify-between mt-1 text-[9px] text-foreground/40 font-heading">
                    <span>Load: {telemetry?.cpu_load ?? '—'}%</span><span>RAM: {telemetry?.ram_usage ?? '—'}%</span>
                  </div>
                </div>
              </div>
 
              <div className="bg-[#10151c] p-4 border border-thin-separator rounded-sm">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-thin-separator">
                  <Brain className="w-4 h-4 text-primary" />
                  <span className="text-xs text-foreground font-heading uppercase tracking-wider">Neural Engine</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-foreground/60 font-heading uppercase">Tracking Confidence</span>
                      <span className="text-xs font-heading text-primary">{avgConfidence}%</span>
                    </div>
                    <div className="h-[2px] bg-background w-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${avgConfidence}%` }}
                        transition={{ duration: 1, delay: 0.7 }} className="h-full bg-primary" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="bg-background/50 p-2 rounded border border-thin-separator/50">
                      <div className="text-[9px] text-foreground/50 font-heading mb-1">MODEL</div>
                      <div className="text-xs text-foreground font-heading truncate">YOLOv8-TRK</div>
                    </div>
                    <div className="bg-background/50 p-2 rounded border border-thin-separator/50">
                      <div className="text-[9px] text-foreground/50 font-heading mb-1">STATUS</div>
                      <div className="text-xs text-secondary font-heading flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></div>ACTIVE
                      </div>
                    </div>
                  </div>
                </div>
              </div>
 
              <div className="bg-[#10151c] p-4 border border-thin-separator rounded-sm">
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-thin-separator">
                  <span className="text-xs text-foreground font-heading uppercase tracking-wider">Event Log</span>
                </div>
                <div className="space-y-2">
                  {events.length > 0 ? (
                    events.slice(0, 20).map((event, i) => (
                      <div key={i} className="flex items-start gap-2 text-[10px] font-heading">
                        <span className="text-primary/60 shrink-0">{event.timestamp}</span>
                        <span className="text-foreground/80">{event.message}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-[10px] font-heading text-foreground/40 text-center mt-4">NO RECENT EVENTS</div>
                  )}
                  <div className="flex items-start gap-2 text-[10px] font-heading opacity-50">
                    <span className="text-primary/60 shrink-0">SYS</span>
                    <span className="text-foreground/80">Telemetry sync complete.</span>
                  </div>
                  <div className="flex items-start gap-2 text-[10px] font-heading opacity-50">
                    <span className="text-primary/60 shrink-0">SYS</span>
                    <span className="text-foreground/80">Optical sensor calibrated.</span>
                  </div>
                </div>
              </div>
 
            </div>
          </motion.div>
        </main>
      </div>
      <Footer />
    </div>
  );
}