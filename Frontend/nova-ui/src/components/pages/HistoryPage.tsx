import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Download, Eye } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { format } from 'date-fns';

type DetectionHistory = {
  _id: string;
  detectedObject?: string;
  detectionLocation?: string;
  timestamp?: string;
  confidenceScore?: number;
};

export default function HistoryPage() {
  const [detections, setDetections] = useState<DetectionHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    loadDetections();
  }, []);

  const loadDetections = () => {
    setIsLoading(true);
    const mockDetections: DetectionHistory[] = [
      { _id: '1', detectedObject: 'UAV', detectionLocation: 'Sector A-12', timestamp: new Date().toISOString(), confidenceScore: 0.96 },
      { _id: '2', detectedObject: 'Drone', detectionLocation: 'North Perimeter', timestamp: new Date(Date.now() - 3600000).toISOString(), confidenceScore: 0.91 },
      { _id: '3', detectedObject: 'Aircraft', detectionLocation: 'Zone C', timestamp: new Date(Date.now() - 7200000).toISOString(), confidenceScore: 0.88 },
      { _id: '4', detectedObject: 'Drone', detectionLocation: 'East Grid', timestamp: new Date(Date.now() - 10800000).toISOString(), confidenceScore: 0.74 },
      { _id: '5', detectedObject: 'UAV', detectionLocation: 'Sector B-07', timestamp: new Date(Date.now() - 14400000).toISOString(), confidenceScore: 0.82 },
    ];
    setDetections(mockDetections);
    setIsLoading(false);
  };

  const filteredDetections = detections.filter(detection => {
    const matchesSearch =
      detection.detectedObject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      detection.detectionLocation?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || detection.detectedObject?.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-20 p-8">
          <div className="max-w-[120rem] mx-auto min-h-[600px]">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-3xl font-heading text-primary mb-6">Detection History</h2>

              {/* Search and Filter */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60" />
                  <input
                    type="text"
                    placeholder="Search detections..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#10151c] border border-thin-separator rounded-lg pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-foreground/60 focus:outline-none focus:border-primary transition-all"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-[#10151c] border border-thin-separator rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-all"
                >
                  <option value="all">All Types</option>
                  <option value="uav">UAV</option>
                  <option value="drone">Drone</option>
                  <option value="aircraft">Aircraft</option>
                  <option value="vehicle">Vehicle</option>
                </select>
                <button className="bg-[#10151c] border border-thin-separator rounded-lg px-4 py-3 hover:border-primary transition-all flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-foreground" />
                  <span className="text-sm font-heading">Date Range</span>
                </button>
              </div>

              {/* Detection Grid */}
              {isLoading ? null : filteredDetections.length > 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDetections.map((detection, index) => (
                    <motion.div key={detection._id}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-[#10151c] rounded-lg border border-thin-separator overflow-hidden hover:border-primary transition-all group">

                      {/* Placeholder snapshot */}
                      <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center">
                        <Eye className="w-12 h-12 text-foreground/20" />
                        <div className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-heading text-primary-foreground">
                          {detection.confidenceScore ? `${(detection.confidenceScore * 100).toFixed(0)}%` : 'N/A'}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h3 className="text-lg font-heading text-primary mb-2">{detection.detectedObject || 'Unknown Object'}</h3>
                        <div className="space-y-1 text-xs text-foreground/60">
                          <div className="flex items-center justify-between">
                            <span>Location:</span>
                            <span className="text-foreground">{detection.detectionLocation || 'Unknown'}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Timestamp:</span>
                            <span className="text-foreground">
                              {detection.timestamp ? format(new Date(detection.timestamp), 'MMM dd, yyyy HH:mm') : 'N/A'}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button className="flex-1 bg-background border border-thin-separator text-foreground px-3 py-2 rounded text-xs font-heading hover:border-primary transition-all flex items-center justify-center gap-1">
                            <Download className="w-3 h-3" />Export
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-20">
                  <Eye className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
                  <p className="text-foreground/60 font-heading">No detections found</p>
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