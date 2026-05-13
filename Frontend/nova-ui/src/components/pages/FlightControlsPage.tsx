import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Radio, 
  Battery, 
  Navigation, 
  Home as HomeIcon, 
  Pause, 
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  RotateCw
} from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

export default function FlightControlsPage() {
  const [isConnected, setIsConnected] = useState(true);
  const [battery, setBattery] = useState(87);
  const [altitude, setAltitude] = useState(125);
  const [heading, setHeading] = useState(245);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-20 p-8">
          <div className="max-w-[120rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-heading text-primary mb-6">Flight Controls</h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Panel - Status */}
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-[#10151c] rounded-lg p-6 border border-thin-separator"
                  >
                    <h3 className="text-lg font-heading text-primary mb-4">UAV Status</h3>
                    
                    {/* Connection Status */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-foreground/60 font-heading uppercase">Connection</span>
                        <Radio className={`w-4 h-4 ${isConnected ? 'text-primary' : 'text-destructive'}`} />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-primary animate-pulse' : 'bg-destructive'}`} />
                        <span className={`text-sm font-heading ${isConnected ? 'text-primary' : 'text-destructive'}`}>
                          {isConnected ? 'Connected' : 'Disconnected'}
                        </span>
                      </div>
                    </div>

                    {/* Battery */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-foreground/60 font-heading uppercase">Battery</span>
                        <Battery className="w-4 h-4 text-primary" />
                      </div>
                      <div className="text-2xl font-heading text-primary mb-2">{battery}%</div>
                      <div className="h-2 bg-background rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${battery > 50 ? 'bg-primary' : battery > 20 ? 'bg-secondary' : 'bg-destructive'}`}
                          style={{ width: `${battery}%` }}
                        />
                      </div>
                    </div>

                    {/* Altitude */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-foreground/60 font-heading uppercase">Altitude</span>
                        <ArrowUp className="w-4 h-4 text-secondary" />
                      </div>
                      <div className="text-2xl font-heading text-secondary">{altitude}m</div>
                    </div>

                    {/* Heading */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-foreground/60 font-heading uppercase">Heading</span>
                        <Navigation className="w-4 h-4 text-primary" />
                      </div>
                      <div className="text-2xl font-heading text-primary">{heading}°</div>
                    </div>
                  </motion.div>

                  {/* Emergency Controls */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-[#10151c] rounded-lg p-6 border border-thin-separator"
                  >
                    <h3 className="text-lg font-heading text-destructive mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Emergency
                    </h3>
                    <button className="w-full bg-destructive/20 border-2 border-destructive text-destructive px-4 py-3 rounded-lg hover:bg-destructive/30 transition-all font-heading">
                      EMERGENCY STOP
                    </button>
                  </motion.div>
                </div>

                {/* Center Panel - Controls */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-[#10151c] rounded-lg p-6 border border-thin-separator"
                >
                  <h3 className="text-lg font-heading text-primary mb-6">Manual Controls</h3>

                  {/* Primary Actions */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button className="bg-primary/10 border border-primary text-primary px-4 py-6 rounded-lg hover:bg-primary/20 transition-all font-heading flex flex-col items-center gap-2">
                      <HomeIcon className="w-6 h-6" />
                      Return Home
                    </button>
                    <button 
                      onClick={() => setIsHovering(!isHovering)}
                      className={`border px-4 py-6 rounded-lg transition-all font-heading flex flex-col items-center gap-2 ${
                        isHovering 
                          ? 'bg-secondary/10 border-secondary text-secondary' 
                          : 'bg-background border-thin-separator text-foreground hover:border-secondary'
                      }`}
                    >
                      <Pause className="w-6 h-6" />
                      {isHovering ? 'Hovering' : 'Hover Mode'}
                    </button>
                  </div>

                  {/* Altitude Controls */}
                  <div className="mb-6">
                    <h4 className="text-sm font-heading text-foreground/60 uppercase mb-3">Altitude Control</h4>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setAltitude(Math.min(500, altitude + 10))}
                        className="flex-1 bg-background border border-thin-separator px-4 py-3 rounded-lg hover:border-primary transition-all font-heading flex items-center justify-center gap-2"
                      >
                        <ArrowUp className="w-4 h-4" />
                        Ascend
                      </button>
                      <button 
                        onClick={() => setAltitude(Math.max(0, altitude - 10))}
                        className="flex-1 bg-background border border-thin-separator px-4 py-3 rounded-lg hover:border-primary transition-all font-heading flex items-center justify-center gap-2"
                      >
                        <ArrowDown className="w-4 h-4" />
                        Descend
                      </button>
                    </div>
                  </div>

                  {/* Heading Controls */}
                  <div>
                    <h4 className="text-sm font-heading text-foreground/60 uppercase mb-3">Heading Control</h4>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setHeading((heading - 15 + 360) % 360)}
                        className="flex-1 bg-background border border-thin-separator px-4 py-3 rounded-lg hover:border-primary transition-all font-heading flex items-center justify-center gap-2"
                      >
                        <RotateCw className="w-4 h-4 transform -scale-x-100" />
                        Left
                      </button>
                      <button 
                        onClick={() => setHeading((heading + 15) % 360)}
                        className="flex-1 bg-background border border-thin-separator px-4 py-3 rounded-lg hover:border-primary transition-all font-heading flex items-center justify-center gap-2"
                      >
                        <RotateCw className="w-4 h-4" />
                        Right
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Right Panel - Tactical Map */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-[#10151c] rounded-lg p-6 border border-thin-separator"
                >
                  <h3 className="text-lg font-heading text-primary mb-4">Tactical Map</h3>
                  
                  {/* Mini Map */}
                  <div className="aspect-square bg-background rounded-lg border border-thin-separator relative overflow-hidden mb-4">
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(0, 255, 255, 0.1) 19px, rgba(0, 255, 255, 0.1) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(0, 255, 255, 0.1) 19px, rgba(0, 255, 255, 0.1) 20px)'
                      }} />
                    </div>
                    
                    {/* UAV Position */}
                    <motion.div
                      animate={{ 
                        rotate: heading,
                        x: Math.sin(heading * Math.PI / 180) * 20,
                        y: -Math.cos(heading * Math.PI / 180) * 20
                      }}
                      transition={{ duration: 0.5 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_rgba(0,255,255,0.8)]" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-primary/30 rounded-full animate-ping" />
                    </motion.div>

                    {/* Home Position */}
                    <div className="absolute bottom-1/4 right-1/4">
                      <div className="w-3 h-3 bg-secondary rounded-full" />
                    </div>
                  </div>

                  {/* Coordinates */}
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Latitude:</span>
                      <span className="text-primary">40.7128° N</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Longitude:</span>
                      <span className="text-primary">74.0060° W</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Distance to Home:</span>
                      <span className="text-secondary">342m</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
