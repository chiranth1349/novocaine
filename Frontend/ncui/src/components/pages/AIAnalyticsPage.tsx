import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Lightbulb, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { AIRecommendations } from '@/entities';
import { format } from 'date-fns';

export default function AIAnalyticsPage() {
  const [recommendations, setRecommendations] = useState<AIRecommendations[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<AIRecommendations>('airecommendations', {}, { limit: 50 });
    setRecommendations(result.items);
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
