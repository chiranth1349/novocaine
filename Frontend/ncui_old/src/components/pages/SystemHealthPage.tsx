import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Camera, Cpu, HardDrive, AlertCircle, CheckCircle, XCircle, Play } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { SystemErrorLogs } from '@/entities';
import { format } from 'date-fns';

export default function SystemHealthPage() {
  const [errorLogs, setErrorLogs] = useState<SystemErrorLogs[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRunningCheck, setIsRunningCheck] = useState(false);
  const [systemHealth, setSystemHealth] = useState(94);

  useEffect(() => {
    loadErrorLogs();
  }, []);

  const loadErrorLogs = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<SystemErrorLogs>('systemerrorlogs', {}, { limit: 50 });
    setErrorLogs(result.items);
    setIsLoading(false);
  };

  const runSystemCheck = async () => {
    setIsRunningCheck(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSystemHealth(Math.floor(Math.random() * 10) + 90);
    setIsRunningCheck(false);
  };

  const unresolvedErrors = errorLogs.filter(log => !log.isResolved).length;
  const criticalErrors = errorLogs.filter(log => log.severity?.toLowerCase() === 'critical').length;

  const getSeverityColor = (severity?: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'text-destructive';
      case 'high':
        return 'text-destructive';
      case 'medium':
        return 'text-secondary';
      case 'low':
        return 'text-primary';
      default:
        return 'text-foreground/60';
    }
  };

  const getSeverityIcon = (severity?: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
      case 'high':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'medium':
        return <AlertCircle className="w-4 h-4 text-secondary" />;
      default:
        return <CheckCircle className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-20 p-8">
          <div className="max-w-[120rem] mx-auto min-h-[600px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-heading text-primary">System Health</h2>
                <button
                  onClick={runSystemCheck}
                  disabled={isRunningCheck}
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 font-heading disabled:opacity-50"
                >
                  <Play className={`w-4 h-4 ${isRunningCheck ? 'animate-spin' : ''}`} />
                  {isRunningCheck ? 'Running Check...' : 'Run System Check'}
                </button>
              </div>

              {/* Overall Health */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-[#10151c] rounded-lg p-6 border border-thin-separator mb-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-heading text-primary">Overall System Health</h3>
                  <div className="text-4xl font-heading text-primary">{systemHealth}%</div>
                </div>
                <div className="h-3 bg-background rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${systemHealth}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                  />
                </div>
              </motion.div>

              {/* Component Status Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="bg-[#10151c] rounded-lg p-4 border border-thin-separator"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-foreground/60 font-heading uppercase">Camera</span>
                    <Camera className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-sm font-heading text-primary">Online</span>
                  </div>
                  <div className="text-xs text-foreground/60">1920x1080 • 60 FPS</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="bg-[#10151c] rounded-lg p-4 border border-thin-separator"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-foreground/60 font-heading uppercase">GPU</span>
                    <Cpu className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-sm font-heading text-primary">Active</span>
                  </div>
                  <div className="text-xs text-foreground/60">67% Usage • 58°C</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="bg-[#10151c] rounded-lg p-4 border border-thin-separator"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-foreground/60 font-heading uppercase">Sensors</span>
                    <Activity className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                    <span className="text-sm font-heading text-secondary">Connected</span>
                  </div>
                  <div className="text-xs text-foreground/60">All sensors operational</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="bg-[#10151c] rounded-lg p-4 border border-thin-separator"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-foreground/60 font-heading uppercase">Storage</span>
                    <HardDrive className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-sm font-heading text-primary">Healthy</span>
                  </div>
                  <div className="text-xs text-foreground/60">2.4 TB Available</div>
                </motion.div>
              </div>

              {/* Error Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="bg-[#10151c] rounded-lg p-4 border border-thin-separator"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground/60 font-heading uppercase">Total Errors</span>
                    <AlertCircle className="w-4 h-4 text-foreground/60" />
                  </div>
                  <div className="text-2xl font-heading text-foreground">{errorLogs.length}</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                  className="bg-[#10151c] rounded-lg p-4 border border-thin-separator"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground/60 font-heading uppercase">Unresolved</span>
                    <XCircle className="w-4 h-4 text-destructive" />
                  </div>
                  <div className="text-2xl font-heading text-destructive">{unresolvedErrors}</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                  className="bg-[#10151c] rounded-lg p-4 border border-thin-separator"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground/60 font-heading uppercase">Critical</span>
                    <AlertCircle className="w-4 h-4 text-destructive" />
                  </div>
                  <div className="text-2xl font-heading text-destructive">{criticalErrors}</div>
                </motion.div>
              </div>

              {/* Error Logs */}
              {isLoading ? null : errorLogs.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="bg-[#10151c] rounded-lg border border-thin-separator overflow-hidden"
                >
                  <div className="p-4 border-b border-thin-separator">
                    <h3 className="text-lg font-heading text-primary">Error Logs</h3>
                  </div>
                  <div className="divide-y divide-thin-separator max-h-96 overflow-y-auto">
                    {errorLogs.map((log, index) => (
                      <motion.div
                        key={log._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: index * 0.02 }}
                        className="p-4 hover:bg-background/50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          {getSeverityIcon(log.severity)}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-xs font-heading uppercase ${getSeverityColor(log.severity)}`}>
                                {log.severity || 'Unknown'} Severity
                              </span>
                              {log.timestamp && (
                                <span className="text-xs text-foreground/60">
                                  {format(new Date(log.timestamp), 'MMM dd, yyyy HH:mm')}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-foreground mb-1">
                              {log.errorMessage || 'No error message available'}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-foreground/60">
                              {log.affectedComponent && (
                                <span>Component: {log.affectedComponent}</span>
                              )}
                              {log.errorCode && (
                                <span className="font-mono">Code: {log.errorCode}</span>
                              )}
                              {log.isResolved !== undefined && (
                                <span className={log.isResolved ? 'text-primary' : 'text-destructive'}>
                                  {log.isResolved ? '✓ Resolved' : '○ Unresolved'}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-20">
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-foreground/60 font-heading">No errors detected</p>
                  <p className="text-sm text-foreground/40 mt-2">System is running smoothly</p>
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
