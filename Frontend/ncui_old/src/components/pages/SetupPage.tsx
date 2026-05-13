import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Camera, Sliders, Zap, Bell, Moon, Sun } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

export default function SetupPage() {
  const [resolution, setResolution] = useState('1920x1080');
  const [fps, setFps] = useState(60);
  const [sensitivity, setSensitivity] = useState(75);
  const [confidenceThreshold, setConfidenceThreshold] = useState(80);
  const [performanceMode, setPerformanceMode] = useState('balanced');
  const [notifications, setNotifications] = useState(true);
  const [audioAlerts, setAudioAlerts] = useState(true);

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
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-heading text-primary">System Configuration</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Camera Settings */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-[#10151c] rounded-lg p-6 border border-thin-separator"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <Camera className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-heading text-primary">Camera Settings</h3>
                  </div>

                  {/* Resolution */}
                  <div className="mb-6">
                    <label className="block text-sm font-heading text-foreground/60 uppercase mb-2">
                      Resolution
                    </label>
                    <select
                      value={resolution}
                      onChange={(e) => setResolution(e.target.value)}
                      className="w-full bg-background border border-thin-separator rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-all"
                    >
                      <option value="1280x720">1280x720 (HD)</option>
                      <option value="1920x1080">1920x1080 (Full HD)</option>
                      <option value="2560x1440">2560x1440 (2K)</option>
                      <option value="3840x2160">3840x2160 (4K)</option>
                    </select>
                  </div>

                  {/* FPS */}
                  <div>
                    <label className="block text-sm font-heading text-foreground/60 uppercase mb-2">
                      Frame Rate: {fps} FPS
                    </label>
                    <input
                      type="range"
                      min="30"
                      max="120"
                      step="30"
                      value={fps}
                      onChange={(e) => setFps(Number(e.target.value))}
                      className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-foreground/60 mt-1">
                      <span>30</span>
                      <span>60</span>
                      <span>90</span>
                      <span>120</span>
                    </div>
                  </div>
                </motion.div>

                {/* Detection Settings */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-[#10151c] rounded-lg p-6 border border-thin-separator"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <Sliders className="w-5 h-5 text-secondary" />
                    <h3 className="text-lg font-heading text-secondary">Detection Settings</h3>
                  </div>

                  {/* Sensitivity */}
                  <div className="mb-6">
                    <label className="block text-sm font-heading text-foreground/60 uppercase mb-2">
                      Detection Sensitivity: {sensitivity}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sensitivity}
                      onChange={(e) => setSensitivity(Number(e.target.value))}
                      className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-secondary"
                    />
                    <div className="flex justify-between text-xs text-foreground/60 mt-1">
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                    </div>
                  </div>

                  {/* Confidence Threshold */}
                  <div>
                    <label className="block text-sm font-heading text-foreground/60 uppercase mb-2">
                      Confidence Threshold: {confidenceThreshold}%
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={confidenceThreshold}
                      onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                      className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-foreground/60 mt-1">
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </motion.div>

                {/* Performance Mode */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-[#10151c] rounded-lg p-6 border border-thin-separator"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <Zap className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-heading text-primary">Performance Mode</h3>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => setPerformanceMode('power-saving')}
                      className={`w-full p-4 rounded-lg border transition-all text-left ${
                        performanceMode === 'power-saving'
                          ? 'bg-primary/10 border-primary'
                          : 'bg-background border-thin-separator hover:border-primary/50'
                      }`}
                    >
                      <div className="font-heading text-sm mb-1">Power Saving</div>
                      <div className="text-xs text-foreground/60">Optimized for battery life</div>
                    </button>

                    <button
                      onClick={() => setPerformanceMode('balanced')}
                      className={`w-full p-4 rounded-lg border transition-all text-left ${
                        performanceMode === 'balanced'
                          ? 'bg-secondary/10 border-secondary'
                          : 'bg-background border-thin-separator hover:border-secondary/50'
                      }`}
                    >
                      <div className="font-heading text-sm mb-1">Balanced</div>
                      <div className="text-xs text-foreground/60">Best balance of performance and efficiency</div>
                    </button>

                    <button
                      onClick={() => setPerformanceMode('performance')}
                      className={`w-full p-4 rounded-lg border transition-all text-left ${
                        performanceMode === 'performance'
                          ? 'bg-primary/10 border-primary'
                          : 'bg-background border-thin-separator hover:border-primary/50'
                      }`}
                    >
                      <div className="font-heading text-sm mb-1">Performance</div>
                      <div className="text-xs text-foreground/60">Maximum processing power</div>
                    </button>
                  </div>
                </motion.div>

                {/* Notifications & Alerts */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-[#10151c] rounded-lg p-6 border border-thin-separator"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <Bell className="w-5 h-5 text-secondary" />
                    <h3 className="text-lg font-heading text-secondary">Notifications & Alerts</h3>
                  </div>

                  <div className="space-y-4">
                    {/* Notifications Toggle */}
                    <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-thin-separator">
                      <div>
                        <div className="font-heading text-sm mb-1">Push Notifications</div>
                        <div className="text-xs text-foreground/60">Receive detection alerts</div>
                      </div>
                      <button
                        onClick={() => setNotifications(!notifications)}
                        className={`relative w-12 h-6 rounded-full transition-all ${
                          notifications ? 'bg-primary' : 'bg-foreground/20'
                        }`}
                      >
                        <motion.div
                          animate={{ x: notifications ? 24 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                        />
                      </button>
                    </div>

                    {/* Audio Alerts Toggle */}
                    <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-thin-separator">
                      <div>
                        <div className="font-heading text-sm mb-1">Audio Alerts</div>
                        <div className="text-xs text-foreground/60">Sound notifications for events</div>
                      </div>
                      <button
                        onClick={() => setAudioAlerts(!audioAlerts)}
                        className={`relative w-12 h-6 rounded-full transition-all ${
                          audioAlerts ? 'bg-secondary' : 'bg-foreground/20'
                        }`}
                      >
                        <motion.div
                          animate={{ x: audioAlerts ? 24 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Save Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-6 flex justify-end"
              >
                <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-all font-heading">
                  Save Configuration
                </button>
              </motion.div>
            </motion.div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
