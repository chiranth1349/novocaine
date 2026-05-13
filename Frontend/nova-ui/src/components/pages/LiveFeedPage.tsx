import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBackend } from '@/hooks/useBackend';
import { ZoomIn, ZoomOut, Maximize2, Minimize2, Circle, Square } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

export default function LiveFeedPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const { detection } = useBackend();

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-20 p-8">
          <div className="max-w-[120rem] mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-3xl font-heading text-primary mb-6">Live Feed</h2>

              <div className={`bg-[#10151c] rounded-xl overflow-hidden border border-thin-separator ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}>
                <div className="relative aspect-video bg-black overflow-hidden">

                  <img
                    src="http://localhost:5000/video_feed"
                    alt="Live UAV Feed"
                    className="w-full h-full object-cover"
                    style={{ transform: `scale(${zoom / 100})` }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

                  {/* Top Bar */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-3 py-2 rounded-lg border border-primary">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <span className="text-xs font-heading text-primary">LIVE FEED</span>
                    </div>
                    {isRecording && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="flex items-center gap-2 bg-destructive/20 backdrop-blur-sm px-3 py-2 rounded-lg border border-destructive">
                        <Circle className="w-3 h-3 text-destructive fill-destructive animate-pulse" />
                        <span className="text-xs font-heading text-destructive">RECORDING</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Bounding boxes from backend */}
                  {(detection?.detections ?? []).slice(0, 3).map((det, idx) => {
                    const [x1, y1, x2, y2] = det.bbox ?? [
                      0.28 + idx * 0.12, 0.25 + idx * 0.1,
                      0.52 + idx * 0.12, 0.55 + idx * 0.1,
                    ];
                    return (
                      <motion.div key={idx}
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        className="absolute border-2 border-primary"
                        style={{ top: `${y1 * 100}%`, left: `${x1 * 100}%`, width: `${(x2 - x1) * 100}%`, height: `${(y2 - y1) * 100}%` }}>
                        <div className="absolute -top-6 left-0 bg-primary/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-heading text-primary-foreground">
                          {det.label} {det.confidence}%
                        </div>
                        <div className="absolute top-1 left-1 right-1 bottom-1 border border-primary/30 rounded" />
                      </motion.div>
                    );
                  })}

                  {/* Bottom Controls */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-thin-separator rounded-lg p-2">
                      <button onClick={() => setZoom(Math.max(50, zoom - 10))} className="p-2 hover:bg-primary/10 rounded transition-all">
                        <ZoomOut className="w-4 h-4 text-foreground" />
                      </button>
                      <span className="text-xs font-heading text-foreground px-2">{zoom}%</span>
                      <button onClick={() => setZoom(Math.min(200, zoom + 10))} className="p-2 hover:bg-primary/10 rounded transition-all">
                        <ZoomIn className="w-4 h-4 text-foreground" />
                      </button>
                    </div>
                    <button onClick={() => setIsRecording(!isRecording)}
                      className={`p-3 rounded-lg transition-all ${isRecording
                        ? 'bg-destructive/20 border border-destructive hover:bg-destructive/30'
                        : 'bg-background/80 backdrop-blur-sm border border-thin-separator hover:border-primary'}`}>
                      {isRecording
                        ? <Square className="w-5 h-5 text-destructive fill-destructive" />
                        : <Circle className="w-5 h-5 text-primary" />}
                    </button>
                    <button onClick={() => setIsFullscreen(!isFullscreen)}
                      className="bg-background/80 backdrop-blur-sm border border-thin-separator p-3 rounded-lg hover:border-primary transition-all">
                      {isFullscreen ? <Minimize2 className="w-5 h-5 text-foreground" /> : <Maximize2 className="w-5 h-5 text-foreground" />}
                    </button>
                  </div>

                  {/* Crosshair */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative w-8 h-8">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-3 bg-primary/50" />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-3 bg-primary/50" />
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-3 bg-primary/50" />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-3 bg-primary/50" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-primary rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Feed Info */}
                <div className="p-4 border-t border-thin-separator">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-heading text-primary">Primary Camera Feed</h3>
                      <p className="text-xs text-foreground/60">1920x1080 • 60 FPS • H.264 Encoding</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-heading">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" /><span>Stream Active</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full" /><span>AI Tracking</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}