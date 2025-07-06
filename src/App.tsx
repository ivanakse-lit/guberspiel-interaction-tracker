
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import LogInteraction from "./pages/LogInteraction";
import CreateGroup from "./pages/CreateGroup";
import JoinGroup from "./pages/JoinGroup";
import GroupHistory from "./pages/GroupHistory";
import GroupOverview from "./pages/GroupOverview";
import Analytics from "./pages/Analytics";
import Changelog from "./pages/Changelog";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AuthDebug from "./pages/AuthDebug";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth-debug" element={<AuthDebug />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="/log-interaction" element={<LogInteraction />} />
            <Route path="/create-group" element={<CreateGroup />} />
            <Route path="/join-group" element={<JoinGroup />} />
            <Route path="/group/:groupId/history" element={<GroupHistory />} />
            <Route path="/group/:groupId/overview" element={<GroupOverview />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
