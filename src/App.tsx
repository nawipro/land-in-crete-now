import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const ExploreArea = lazy(() => import("./pages/ExploreArea"));
const Crawl = lazy(() => import("./pages/Crawl"));
const About = lazy(() => import("./pages/About"));
const Booking = lazy(() => import("./pages/Booking"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const Login = lazy(() => import("./pages/admin/Login"));
const ResetPassword = lazy(() => import("./pages/admin/ResetPassword"));
const ProtectedRoute = lazy(() => import("./components/admin/ProtectedRoute"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const ContentManager = lazy(() => import("./pages/admin/ContentManager"));
const PricingManager = lazy(() => import("./pages/admin/PricingManager"));
const CalendarSync = lazy(() => import("./pages/admin/CalendarSync"));
const TaxSeasons = lazy(() => import("./pages/admin/TaxSeasons"));
const SettingsManager = lazy(() => import("./pages/admin/SettingsManager"));
const ThingsToDoChania = lazy(() => import("./pages/ThingsToDoChania"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#f8f5f2]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c5a059]" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/explore-area" element={<ExploreArea />} />
            <Route path="/crawl" element={<Crawl />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/things-to-do-chania" element={<ThingsToDoChania />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/reset-password" element={<ResetPassword />} />
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<Navigate to="content" replace />} />
                <Route path="content" element={<ContentManager />} />
                <Route path="pricing" element={<PricingManager />} />
                <Route path="calendar" element={<CalendarSync />} />
                <Route path="tax-seasons" element={<TaxSeasons />} />
                <Route path="settings" element={<SettingsManager />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
