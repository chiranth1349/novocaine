import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Database, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { api } from '@/lib/api';

type TrackedDataLogs = {
  _id: string;
  label?: string;
  confidence?: number;
  x?: number;
  y?: number;
  z?: number;
  timestamp?: string;
};

export default function TrackedDataPage() {
  const [trackedData, setTrackedData] = useState<TrackedDataLogs[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTrackedData();
  }, []);

  const loadTrackedData = async () => {
    setIsLoading(true);
    try {
      const data = await api.getTrackedData();
      setTrackedData(data);
    } catch (e) {
      console.error('Failed to load tracked data', e);
    } finally {
      setIsLoading(false);
    }
  };

  const avgConfidence = trackedData.length > 0
    ? (trackedData.reduce((sum, item) => sum + (item.confidence || 0), 0) / trackedData.length).toFixed(1)
    : '0.0';

  const avgDuration = '0.0';

  const classifications = trackedData.reduce((acc, item) => {
    const classification = item.label || 'Unknown';
    acc[classification] = (acc[classification] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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
                <h2 className="text-3xl font-heading text-primary">Tracked Data Analytics</h2>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 font-heading">
                  <Download className="w-4 h-4" />
                  Export Data
                </button>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="bg-[#10151c] rounded-lg p-4 border border-thin-separator"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground/60 font-heading uppercase">Total Logs</span>
                    <Database className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-2xl font-heading text-primary">{trackedData.length}</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="bg-[#10151c] rounded-lg p-4 border border-thin-separator"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground/60 font-heading uppercase">Avg Confidence</span>
                    <TrendingUp className="w-4 h-4 text-secondary" />
                  </div>
                  <div className="text-2xl font-heading text-secondary">{avgConfidence}%</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="bg-[#10151c] rounded-lg p-4 border border-thin-separator"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground/60 font-heading uppercase">Avg Duration</span>
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-2xl font-heading text-primary">{avgDuration}s</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="bg-[#10151c] rounded-lg p-4 border border-thin-separator"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground/60 font-heading uppercase">Classifications</span>
                    <Database className="w-4 h-4 text-secondary" />
                  </div>
                  <div className="text-2xl font-heading text-secondary">{Object.keys(classifications).length}</div>
                </motion.div>
              </div>

              {/* Classification Breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-[#10151c] rounded-lg p-6 border border-thin-separator mb-6"
              >
                <h3 className="text-lg font-heading text-primary mb-4">Object Classification Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(classifications).map(([classification, count]) => (
                    <div key={classification} className="bg-background rounded-lg p-3 border border-thin-separator">
                      <div className="text-xs text-foreground/60 mb-1">{classification}</div>
                      <div className="text-xl font-heading text-primary">{count}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Data Table */}
              {isLoading ? null : trackedData.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-[#10151c] rounded-lg border border-thin-separator overflow-hidden"
                >
                  <div className="p-4 border-b border-thin-separator">
                    <h3 className="text-lg font-heading text-primary">Coordinate Data Logs</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-background">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-heading text-foreground/60 uppercase">Timestamp</th>
                          <th className="px-4 py-3 text-left text-xs font-heading text-foreground/60 uppercase">X</th>
                          <th className="px-4 py-3 text-left text-xs font-heading text-foreground/60 uppercase">Y</th>
                          <th className="px-4 py-3 text-left text-xs font-heading text-foreground/60 uppercase">Z</th>
                          <th className="px-4 py-3 text-left text-xs font-heading text-foreground/60 uppercase">Confidence</th>
                          <th className="px-4 py-3 text-left text-xs font-heading text-foreground/60 uppercase">Duration</th>
                          <th className="px-4 py-3 text-left text-xs font-heading text-foreground/60 uppercase">Classification</th>
                        </tr>
                      </thead>
                      <tbody>
                        {trackedData.map((item, index) => (
                          <motion.tr
                            key={item._id || index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: index * 0.02 }}
                            className="border-t border-thin-separator hover:bg-background/50 transition-colors"
                          >
                            <td className="px-4 py-3 text-sm text-foreground/80">
                              {item.timestamp ? format(new Date(item.timestamp), 'MMM dd, HH:mm:ss') : 'N/A'}
                            </td>
                            <td className="px-4 py-3 text-sm font-mono text-primary">
                              {item.x?.toFixed(2) ?? '0.00'}
                            </td>
                            <td className="px-4 py-3 text-sm font-mono text-primary">
                              {item.y?.toFixed(2) ?? '0.00'}
                            </td>
                            <td className="px-4 py-3 text-sm font-mono text-primary">
                              {item.z?.toFixed(2) ?? '0.00'}
                            </td>
                            <td className="px-4 py-3 text-sm text-secondary">
                              {item.confidence ? `${item.confidence}%` : 'N/A'}
                            </td>
                            <td className="px-4 py-3 text-sm text-foreground/80">
                              N/A
                            </td>
                            <td className="px-4 py-3 text-sm text-foreground/80">
                              {item.label ?? 'Unknown'}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-20">
                  <Database className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
                  <p className="text-foreground/60 font-heading">No tracked data available</p>
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
