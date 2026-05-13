import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Video,
  History,
  Database,
  Brain,
  Activity,
  Radio,
  Settings,
  User
} from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Live Feed', path: '/live-feed', icon: Video },
  { name: 'History', path: '/history', icon: History },
  { name: 'Tracked Data', path: '/tracked-data', icon: Database },
  { name: 'AI Analytics', path: '/ai-analytics', icon: Brain },
  { name: 'System Health', path: '/system-health', icon: Activity },
  { name: 'Flight Controls', path: '/flight-controls', icon: Radio },
  { name: 'Setup', path: '/setup', icon: Settings },
  { name: 'User Credentials', path: '/user-credentials', icon: User }
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-[73px] bottom-0 w-20 bg-[#10151c] border-r border-thin-separator z-40">
      <nav className="flex flex-col items-center py-6 gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-primary/10 border border-primary shadow-[0_0_15px_rgba(0,255,255,0.3)]'
                    : 'bg-background border border-thin-separator hover:border-primary/50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-foreground/60 group-hover:text-primary'}`} />
              </motion.div>

              {/* Tooltip */}
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-background border border-thin-separator px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                <span className="text-xs font-heading text-foreground">{item.name}</span>
              </div>

              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
