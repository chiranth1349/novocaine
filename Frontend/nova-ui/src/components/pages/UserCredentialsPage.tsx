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

  const loadLoginHistory = async () => {
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
  }; // ← loadLoginHistory closes here

  const totalSessions = loginHistory.length; // ← now correctly inside the component

  // ... rest of your JSX return
}