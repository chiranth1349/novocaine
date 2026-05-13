import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Camera,
  Cpu,
  HardDrive,
  AlertCircle,
  CheckCircle,
  XCircle,
  Play,
} from 'lucide-react';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

import { format } from 'date-fns';

type SystemErrorLogs = {
  _id: string;
  errorCode?: string;
  severity?: string;
  message?: string;
  timestamp?: string;
  resolved?: boolean;
};

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

    const mockLogs: SystemErrorLogs[] = [
      {
        _id: '1',
        errorCode: 'SYS-204',
        severity: 'High',
        message: 'Telemetry sync interruption detected',
        timestamp: new Date().toISOString(),
        resolved: false,
      },
      {
        _id: '2',
        errorCode: 'OPT-117',
        severity: 'Medium',
        message: 'Optical sensor recalibrated',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        resolved: true,
      },
    ];

    setErrorLogs(mockLogs);
    setIsLoading(false);
  };

  const runSystemCheck = async () => {
    setIsRunningCheck(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSystemHealth(Math.floor(Math.random() * 10) + 90);
    setIsRunningCheck(false);
  };

  const unresolvedErrors = errorLogs.filter(
    (log) => !log.resolved
  ).length;

  const criticalErrors = errorLogs.filter(
    (log) => log.severity?.toLowerCase() === 'critical'
  ).length;

  const getSeverityColor = (severity?: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
      case 'high':
        return 'text-red-500';

      case 'medium':
        return 'text-yellow-400';

      case 'low':
        return 'text-cyan-400';

      default:
        return 'text-gray-400';
    }
  };

  const getSeverityIcon = (severity?: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
      case 'high':
        return <XCircle className="w-4 h-4 text-red-500" />;

      case 'medium':
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;

      default:
        return <CheckCircle className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white">
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
                <h2 className="text-3xl font-bold text-cyan-400">
                  System Health
                </h2>

                <button
                  onClick={runSystemCheck}
                  disabled={isRunningCheck}
                  className="bg-cyan-500 text-black px-6 py-3 rounded-lg hover:bg-cyan-400 transition-all flex items-center gap-2 font-semibold disabled:opacity-50"
                >
                  <Play
                    className={`w-4 h-4 ${
                      isRunningCheck ? 'animate-spin' : ''
                    }`}
                  />

                  {isRunningCheck
                    ? 'Running Check...'
                    : 'Run System Check'}
                </button>
              </div>

              {/* Overall Health */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-[#10151c] rounded-lg p-6 border border-cyan-500/20 mb-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-cyan-400">
                    Overall System Health
                  </h3>

                  <div className="text-4xl font-bold text-cyan-400">
                    {systemHealth}%
                  </div>
                </div>

                <div className="h-3 bg-[#1a2233] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${systemHealth}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                  />
                </div>
              </motion.div>

              {/* Component Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  {
                    title: 'Camera',
                    status: 'Online',
                    desc: '1920x1080 • 60 FPS',
                    icon: Camera,
                  },
                  {
                    title: 'GPU',
                    status: 'Active',
                    desc: '67% Usage • 58°C',
                    icon: Cpu,
                  },
                  {
                    title: 'Sensors',
                    status: 'Connected',
                    desc: 'All sensors operational',
                    icon: Activity,
                  },
                  {
                    title: 'Storage',
                    status: 'Healthy',
                    desc: '2.4 TB Available',
                    icon: HardDrive,
                  },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.2 + index * 0.1,
                      }}
                      className="bg-[#10151c] rounded-lg p-4 border border-cyan-500/20"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-gray-400 uppercase">
                          {item.title}
                        </span>

                        <Icon className="w-5 h-5 text-cyan-400" />
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />

                        <span className="text-sm text-cyan-300">
                          {item.status}
                        </span>
                      </div>

                      <div className="text-xs text-gray-500">
                        {item.desc}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Error Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[#10151c] rounded-lg p-4 border border-cyan-500/20">
                  <div className="text-xs text-gray-400 uppercase mb-2">
                    Total Logs
                  </div>

                  <div className="text-2xl font-bold text-cyan-400">
                    {errorLogs.length}
                  </div>
                </div>

                <div className="bg-[#10151c] rounded-lg p-4 border border-red-500/20">
                  <div className="text-xs text-gray-400 uppercase mb-2">
                    Unresolved
                  </div>

                  <div className="text-2xl font-bold text-red-500">
                    {unresolvedErrors}
                  </div>
                </div>

                <div className="bg-[#10151c] rounded-lg p-4 border border-yellow-500/20">
                  <div className="text-xs text-gray-400 uppercase mb-2">
                    Critical
                  </div>

                  <div className="text-2xl font-bold text-yellow-400">
                    {criticalErrors}
                  </div>
                </div>
              </div>

              {/* Error Logs */}
              {isLoading ? (
                <div className="text-center py-10 text-gray-400">
                  Loading logs...
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-[#10151c] rounded-lg border border-cyan-500/20 overflow-hidden"
                >
                  <div className="p-4 border-b border-cyan-500/20">
                    <h3 className="text-lg font-semibold text-cyan-400">
                      Error Logs
                    </h3>
                  </div>

                  <div className="divide-y divide-cyan-500/10">
                    {errorLogs.map((log) => (
                      <div
                        key={log._id}
                        className="p-4 hover:bg-[#0b1220] transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          {getSeverityIcon(log.severity)}

                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span
                                className={`text-xs uppercase font-semibold ${getSeverityColor(
                                  log.severity
                                )}`}
                              >
                                {log.severity} Severity
                              </span>

                              {log.timestamp && (
                                <span className="text-xs text-gray-500">
                                  {format(
                                    new Date(log.timestamp),
                                    'MMM dd, yyyy HH:mm'
                                  )}
                                </span>
                              )}
                            </div>

                            <p className="text-sm text-white mb-2">
                              {log.message}
                            </p>

                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>Code: {log.errorCode}</span>

                              <span
                                className={
                                  log.resolved
                                    ? 'text-cyan-400'
                                    : 'text-red-500'
                                }
                              >
                                {log.resolved
                                  ? '✓ Resolved'
                                  : '○ Unresolved'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}