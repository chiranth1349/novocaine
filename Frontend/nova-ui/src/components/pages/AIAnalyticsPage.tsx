import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Lightbulb, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { format } from 'date-fns';

type AIRecommendations = {
  _id: string;
  priority?: string;
  category?: string;
  recommendationText?: string;
  relatedMetrics?: string;
  generatedAt?: string;
};

export default function AIAnalyticsPage() {
  const [recommendations, setRecommendations] = useState<AIRecommendations[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = () => {
    setIsLoading(true);

    // Mock AI recommendations — replace with real API call when backend endpoint is ready
    const mockRecommendations: AIRecommendations[] = [
      {
        _id: '1',
        priority: 'High',
        category: 'Detection',
        recommendationText: 'Detection confidence dropped below 80% in low-light conditions. Consider switching to thermal imaging mode.',
        relatedMetrics: 'confidence: 74%, lux: 12',
        generatedAt: new Date().toISOString(),
      },
      {
        _id: '2',
        priority: 'High',
        category: 'Detection',
        recommendationText: 'Multiple overlapping bounding boxes detected. NMS threshold may need tuning.',
        relatedMetrics: 'iou: 0.68, detections: 14',
        generatedAt: new Date(Date.now() - 1800000).toISOString(),
      },
      {
        _id: '3',
        priority: 'Medium',
        category: 'Performance',
        recommendationText: 'GPU utilization has been above 90% for the past 30 minutes. Reduce model resolution to improve throughput.',
        relatedMetrics: 'gpu_usage: 93%, fps: 18',
        generatedAt: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        _id: '4',
        priority: 'Medium',
        category: 'Performance',
        recommendationText: 'Inference latency averaging 31ms. YOLOv8-Nano may be more appropriate for real-time tracking.',
        relatedMetrics: 'avg_inference: 31ms, target: 20ms',
        generatedAt: new Date(Date.now() - 5400000).toISOString(),
      },
      {
        _id: '5',
        priority: 'Low',
        category: 'Tracking',
        recommendationText: 'Target lock lost 3 times in the last session due to fast lateral movement. Increase Kalman filter aggressiveness.',
        relatedMetrics: 'lock_failures: 3, session_duration: 12min',
        generatedAt: new Date(Date.now() - 7200000).toISOString(),
      },
      {
        _id: '6',
        priority: 'Low',
        category: 'Tracking',
        recommendationText: 'Trajectory prediction accuracy is at 88%. Additional training data for aerial vehicle classes recommended.',
        relatedMetrics: 'pred_accuracy: 88%, class: UAV',
        generatedAt: new Date(Date.now() - 9000000).toISOString(),
      },
    ];

    setRecommendations(mockRecommendations);
    setIsLoading(false);
  };

  const getPriorityIcon = (priority?: string) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-destructive" />;
      case 'medium':
        return <Zap className="w-5 h-5 text-secondary" />;
      case 'low':
        return <CheckCircle className="w-5 h-5 text-primary" />;
      default:
        return <Lightbulb className="w-5 h-5 text-foreground/60" />;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'border-destructive bg-destructive/5';
      case 'medium':
        return 'border-secondary bg-secondary/5';
      case 'low':
        return 'border-primary bg-primary/5';
      default:
        return 'border-thin-separator bg-[#10151c]';
    }
  };

  const categorizedRecommendations = recommendations.reduce((acc, rec) => {
    const category = rec.category || 'General';
    if (!acc[category]) acc[category] = [];
    acc[category].push(rec);
    return acc;
  }, {} as Record<string, AIRecommendations[]>);

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
                <Brain className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-heading text-primary">AI Analytics & Recommendations</h2>
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
                    <span className="text-xs text-foreground/60 font-heading uppercase">Total Insights</span>
                    <Brain className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-2xl font-heading text-primary">{recommendations.length}</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="bg-[#10151c] rounded-lg p-4 border border-thin-separator"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground/60 font-heading uppercase">High Priority</span>
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                  </div>
                  <div className="text-2xl font-heading text-destructive">
                    {recommendations.filter(r => r.priority?.toLowerCase() === 'high').length}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="bg-[#10151c] rounded-lg p-4 border border-thin-separator"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground/60 font-heading uppercase">Categories</span>
                    <TrendingUp className="w-4 h-4 text-secondary" />
                  </div>
                  <div className="text-2xl font-heading text-secondary">{Object.keys(categorizedRecommendations).length}</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="bg-[#10151c] rounded-lg p-4 border border-thin-separator"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground/60 font-heading uppercase">AI Status</span>
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-sm font-heading text-primary">Active</span>
                  </div>
                </motion.div>
              </div>

              {/* Recommendations by Category */}
              {isLoading ? null : recommendations.length > 0 ? (
                <div className="space-y-6">
                  {Object.entries(categorizedRecommendations).map(([category, recs], categoryIndex) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                    >
                      <h3 className="text-lg font-heading text-primary mb-3 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        {category}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {recs.map((rec, index) => (
                          <motion.div
                            key={rec._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className={`rounded-lg p-4 border ${getPriorityColor(rec.priority)}`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-1">
                                {getPriorityIcon(rec.priority)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <span className={`text-xs font-heading uppercase ${
                                    rec.priority?.toLowerCase() === 'high' ? 'text-destructive' :
                                    rec.priority?.toLowerCase() === 'medium' ? 'text-secondary' :
                                    'text-primary'
                                  }`}>
                                    {rec.priority || 'Normal'} Priority
                                  </span>
                                  {rec.generatedAt && (
                                    <span className="text-xs text-foreground/60">
                                      {format(new Date(rec.generatedAt), 'MMM dd, HH:mm')}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-foreground mb-2">
                                  {rec.recommendationText || 'No recommendation text available'}
                                </p>
                                {rec.relatedMetrics && (
                                  <div className="text-xs text-foreground/60 font-mono">
                                    Metrics: {rec.relatedMetrics}
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <Brain className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
                  <p className="text-foreground/60 font-heading">No AI recommendations available</p>
                  <p className="text-sm text-foreground/40 mt-2">The AI system is analyzing data and will provide insights soon</p>
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
