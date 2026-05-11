import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Clock, Key } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { LoginHistory } from '@/entities';
import { format } from 'date-fns';

export default function UserCredentialsPage() {
  const [loginHistory, setLoginHistory] = useState<LoginHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLoginHistory();
  }, []);

  const loadLoginHistory = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<LoginHistory>('loginhistory', {}, { limit: 20 });
    setLoginHistory(result.items);
    setIsLoading(false);
  };

  const totalSessions = loginHistory.length;
  const avgSessionDuration = loginHistory.length > 0
    ? (loginHistory.reduce((sum, item) => sum + (item.sessionDuration || 0), 0) / loginHistory.length / 60).toFixed(1)
    : '0.0';

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
              <div className="flex items-center gap-3 mb-6">
                <User className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-heading text-primary">User Credentials</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Information */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-[#10151c] rounded-lg p-6 border border-thin-separator"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <User className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-heading text-primary">Operator Profile</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-foreground/60 font-heading uppercase mb-1">
                        Operator ID
                      </label>
                      <div className="text-sm text-foreground font-mono">OP-2026-4571</div>
                    </div>

                    <div>
                      <label className="block text-xs text-foreground/60 font-heading uppercase mb-1">
                        Name
                      </label>
                      <div className="text-sm text-foreground">System Administrator</div>
                    </div>

                    <div>
                      <label className="block text-xs text-foreground/60 font-heading uppercase mb-1">
                        Email
                      </label>
                      <div className="text-sm text-foreground">admin@novocaine.uav</div>
                    </div>

                    <div>
                      <label className="block text-xs text-foreground/60 font-heading uppercase mb-1">
                        Access Level
                      </label>
                      <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary px-3 py-1 rounded text-xs font-heading text-primary">
                        <Shield className="w-3 h-3" />
                        Administrator
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-foreground/60 font-heading uppercase mb-1">
                        Status
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-sm text-primary font-heading">Active</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Security Settings */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-[#10151c] rounded-lg p-6 border border-thin-separator"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <Key className="w-5 h-5 text-secondary" />
                    <h3 className="text-lg font-heading text-secondary">Security Settings</h3>
                  </div>

                  <div className="space-y-4">
                    <button className="w-full bg-background border border-thin-separator px-4 py-3 rounded-lg hover:border-primary transition-all text-left">
                      <div className="font-heading text-sm mb-1">Change Password</div>
                      <div className="text-xs text-foreground/60">Last changed 45 days ago</div>
                    </button>

                    <button className="w-full bg-background border border-thin-separator px-4 py-3 rounded-lg hover:border-primary transition-all text-left">
                      <div className="font-heading text-sm mb-1">Two-Factor Authentication</div>
                      <div className="text-xs text-foreground/60">
                        <span className="text-primary">● Enabled</span>
                      </div>
                    </button>

                    <button className="w-full bg-background border border-thin-separator px-4 py-3 rounded-lg hover:border-primary transition-all text-left">
                      <div className="font-heading text-sm mb-1">API Keys</div>
                      <div className="text-xs text-foreground/60">Manage access tokens</div>
                    </button>

                    <button className="w-full bg-background border border-thin-separator px-4 py-3 rounded-lg hover:border-primary transition-all text-left">
                      <div className="font-heading text-sm mb-1">Session Timeout</div>
                      <div className="text-xs text-foreground/60">30 minutes of inactivity</div>
                    </button>
                  </div>
                </motion.div>

                {/* Session Statistics */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-[#10151c] rounded-lg p-6 border border-thin-separator"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <Clock className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-heading text-primary">Session Statistics</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-background rounded-lg p-4 border border-thin-separator">
                      <div className="text-xs text-foreground/60 mb-1">Total Sessions</div>
                      <div className="text-2xl font-heading text-primary">{totalSessions}</div>
                    </div>

                    <div className="bg-background rounded-lg p-4 border border-thin-separator">
                      <div className="text-xs text-foreground/60 mb-1">Avg Session Duration</div>
                      <div className="text-2xl font-heading text-secondary">{avgSessionDuration}m</div>
                    </div>

                    <div className="bg-background rounded-lg p-4 border border-thin-separator">
                      <div className="text-xs text-foreground/60 mb-1">Last Login</div>
                      <div className="text-sm font-heading text-foreground">
                        {loginHistory.length > 0 && loginHistory[0].loginTimestamp
                          ? format(new Date(loginHistory[0].loginTimestamp), 'MMM dd, yyyy HH:mm')
                          : 'N/A'}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Login History */}
              {isLoading ? null : loginHistory.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-6 bg-[#10151c] rounded-lg border border-thin-separator overflow-hidden"
                >
                  <div className="p-4 border-b border-thin-separator">
                    <h3 className="text-lg font-heading text-primary">Login History</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-background">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-heading text-foreground/60 uppercase">Operator ID</th>
                          <th className="px-4 py-3 text-left text-xs font-heading text-foreground/60 uppercase">Login Time</th>
                          <th className="px-4 py-3 text-left text-xs font-heading text-foreground/60 uppercase">Logout Time</th>
                          <th className="px-4 py-3 text-left text-xs font-heading text-foreground/60 uppercase">Duration</th>
                          <th className="px-4 py-3 text-left text-xs font-heading text-foreground/60 uppercase">Access Level</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loginHistory.map((session, index) => (
                          <motion.tr
                            key={session._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: index * 0.02 }}
                            className="border-t border-thin-separator hover:bg-background/50 transition-colors"
                          >
                            <td className="px-4 py-3 text-sm font-mono text-foreground/80">
                              {session.operatorId || 'N/A'}
                            </td>
                            <td className="px-4 py-3 text-sm text-foreground/80">
                              {session.loginTimestamp
                                ? format(new Date(session.loginTimestamp), 'MMM dd, yyyy HH:mm')
                                : 'N/A'}
                            </td>
                            <td className="px-4 py-3 text-sm text-foreground/80">
                              {session.logoutTimestamp
                                ? format(new Date(session.logoutTimestamp), 'MMM dd, yyyy HH:mm')
                                : 'Active'}
                            </td>
                            <td className="px-4 py-3 text-sm text-primary">
                              {session.sessionDuration
                                ? `${(session.sessionDuration / 60).toFixed(0)}m`
                                : 'N/A'}
                            </td>
                            <td className="px-4 py-3 text-sm text-secondary">
                              {session.accessLevel || 'Standard'}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              ) : (
                <div className="mt-6 text-center py-20">
                  <Clock className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
                  <p className="text-foreground/60 font-heading">No login history available</p>
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
