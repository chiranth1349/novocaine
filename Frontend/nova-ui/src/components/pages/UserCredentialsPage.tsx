import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Clock, Key } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { format } from 'date-fns';

type LoginHistory = {
  _id: string;
  operatorId?: string;
  loginTimestamp?: string;
  logoutTimestamp?: string;
  sessionDuration?: number;
  accessLevel?: string;
};

export default function UserCredentialsPage() {
  const [loginHistory, setLoginHistory] = useState<LoginHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLoginHistory();
  }, []);

  const loadLoginHistory = () => {
    setIsLoading(true);
    const mockData: LoginHistory[] = [
      {
        _id: '1',
        operatorId: 'OP-2026-4571',
        loginTimestamp: new Date().toISOString(),
        logoutTimestamp: '',
        sessionDuration: 5400,
        accessLevel: 'Administrator',
      },
      {
        _id: '2',
        operatorId: 'OP-2026-1192',
        loginTimestamp: new Date(Date.now() - 86400000).toISOString(),
        logoutTimestamp: new Date(Date.now() - 82800000).toISOString(),
        sessionDuration: 3600,
        accessLevel: 'Standard',
      },
      {
        _id: '3',
        operatorId: 'OP-2026-8834',
        loginTimestamp: new Date(Date.now() - 172800000).toISOString(),
        logoutTimestamp: new Date(Date.now() - 169200000).toISOString(),
        sessionDuration: 2400,
        accessLevel: 'Field Operator',
      },
    ];
    setTimeout(() => {
      setLoginHistory(mockData);
      setIsLoading(false);
    }, 500);
  };

  const totalSessions = loginHistory.length;
  const activeSessions = loginHistory.filter(s => !s.logoutTimestamp).length;
  const avgDuration = loginHistory.length > 0
    ? Math.round(loginHistory.reduce((sum, s) => sum + (s.sessionDuration ?? 0), 0) / loginHistory.length)
    : 0;

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  const getAccessColor = (level?: string) => {
    switch (level?.toLowerCase()) {
      case 'administrator': return 'text-destructive border-destructive/30 bg-destructive/5';
      case 'standard': return 'text-secondary border-secondary/30 bg-secondary/5';
      default: return 'text-primary border-primary/30 bg-primary/5';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-20 p-8">
          <div className="max-w-[120rem] mx-auto min-h-[600px]">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-heading text-primary">User Credentials</h2>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="bg-[#10151c] rounded-lg p-4 border border-thin-separator">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground/60 font-heading uppercase">Total Sessions</span>
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-2xl font-heading text-primary">{totalSessions}</div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="bg-[#10151c] rounded-lg p-4 border border-thin-separator">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground/60 font-heading uppercase">Active Now</span>
                    <Key className="w-4 h-4 text-secondary" />
                  </div>
                  <div className="text-2xl font-heading text-secondary">{activeSessions}</div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="bg-[#10151c] rounded-lg p-4 border border-thin-separator">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground/60 font-heading uppercase">Avg Session</span>
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-2xl font-heading text-primary">{formatDuration(avgDuration)}</div>
                </motion.div>
              </div>

              {/* Session Log Table */}
              {isLoading ? (
                <div className="text-center py-20 text-foreground/40 font-heading">Loading sessions...</div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-[#10151c] rounded-lg border border-thin-separator overflow-hidden">
                  <div className="p-4 border-b border-thin-separator">
                    <h3 className="text-lg font-heading text-primary">Session History</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-background">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-heading text-foreground/60 uppercase">Operator ID</th>
                          <th className="px-4 py-3 text-left text-xs font-heading text-foreground/60 uppercase">Access Level</th>
                          <th className="px-4 py-3 text-left text-xs font-heading text-foreground/60 uppercase">Login</th>
                          <th className="px-4 py-3 text-left text-xs font-heading text-foreground/60 uppercase">Logout</th>
                          <th className="px-4 py-3 text-left text-xs font-heading text-foreground/60 uppercase">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loginHistory.map((session, index) => (
                          <motion.tr key={session._id}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            className="border-t border-thin-separator hover:bg-background/50 transition-colors">
                            <td className="px-4 py-3 text-sm font-mono text-foreground">{session.operatorId ?? 'N/A'}</td>
                            <td className="px-4 py-3">
                              <span className={`text-xs font-heading px-2 py-1 rounded border ${getAccessColor(session.accessLevel)}`}>
                                {session.accessLevel ?? 'Unknown'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-foreground/80">
                              {session.loginTimestamp ? format(new Date(session.loginTimestamp), 'MMM dd, HH:mm:ss') : 'N/A'}
                            </td>
                            <td className="px-4 py-3 text-sm text-foreground/80">
                              {session.logoutTimestamp
                                ? format(new Date(session.logoutTimestamp), 'MMM dd, HH:mm:ss')
                                : <span className="text-secondary font-heading text-xs">ACTIVE</span>}
                            </td>
                            <td className="px-4 py-3 text-sm text-primary font-heading">
                              {session.sessionDuration ? formatDuration(session.sessionDuration) : 'N/A'}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
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