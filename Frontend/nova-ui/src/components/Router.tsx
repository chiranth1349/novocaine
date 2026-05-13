import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import LiveFeedPage from "./pages/LiveFeedPage";
import HistoryPage from "./pages/HistoryPage";
import TrackedDataPage from "./pages/TrackedDataPage";
import AIAnalyticsPage from "./pages/AIAnalyticsPage";
import SystemHealthPage from "./pages/SystemHealthPage";
import FlightControlsPage from "./pages/FlightControlsPage";
import SetupPage from "./pages/SetupPage";
import UserCredentialsPage from "./pages/UserCredentialsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/live-feed",
    element: <LiveFeedPage />,
  },
  {
    path: "/history",
    element: <HistoryPage />,
  },
  {
    path: "/tracked-data",
    element: <TrackedDataPage />,
  },
  {
    path: "/ai-analytics",
    element: <AIAnalyticsPage />,
  },
  {
    path: "/system-health",
    element: <SystemHealthPage />,
  },
  {
    path: "/flight-controls",
    element: <FlightControlsPage />,
  },
  {
    path: "/setup",
    element: <SetupPage />,
  },
  {
    path: "/user-credentials",
    element: <UserCredentialsPage />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}