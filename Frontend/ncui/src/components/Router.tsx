import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import LiveFeedPage from '@/components/pages/LiveFeedPage';
import HistoryPage from '@/components/pages/HistoryPage';
import TrackedDataPage from '@/components/pages/TrackedDataPage';
import AIAnalyticsPage from '@/components/pages/AIAnalyticsPage';
import SystemHealthPage from '@/components/pages/SystemHealthPage';
import FlightControlsPage from '@/components/pages/FlightControlsPage';
import SetupPage from '@/components/pages/SetupPage';
import UserCredentialsPage from '@/components/pages/UserCredentialsPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "live-feed",
        element: <LiveFeedPage />,
        routeMetadata: {
          pageIdentifier: 'live-feed',
        },
      },
      {
        path: "history",
        element: <HistoryPage />,
        routeMetadata: {
          pageIdentifier: 'history',
        },
      },
      {
        path: "tracked-data",
        element: <TrackedDataPage />,
        routeMetadata: {
          pageIdentifier: 'tracked-data',
        },
      },
      {
        path: "ai-analytics",
        element: <AIAnalyticsPage />,
        routeMetadata: {
          pageIdentifier: 'ai-analytics',
        },
      },
      {
        path: "system-health",
        element: <SystemHealthPage />,
        routeMetadata: {
          pageIdentifier: 'system-health',
        },
      },
      {
        path: "flight-controls",
        element: <FlightControlsPage />,
        routeMetadata: {
          pageIdentifier: 'flight-controls',
        },
      },
      {
        path: "setup",
        element: <SetupPage />,
        routeMetadata: {
          pageIdentifier: 'setup',
        },
      },
      {
        path: "user-credentials",
        element: <UserCredentialsPage />,
        routeMetadata: {
          pageIdentifier: 'user-credentials',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
