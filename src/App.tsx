
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ExploreArea from "./pages/ExploreArea";
import NotFound from "./pages/NotFound";
import Crawl from "./pages/Crawl";
import Login from "./pages/admin/Login";
import ContentManager from "./pages/admin/ContentManager";
import About from "./pages/About";
import Booking from "./pages/Booking";
import TaxSeasons from "./pages/admin/TaxSeasons";
import ResetPassword from "./pages/admin/ResetPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/explore-area" element={<ExploreArea />} />
          <Route path="/crawl" element={<Crawl />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/reset-password" element={<ResetPassword />} />
          <Route path="/admin/content" element={<ContentManager />} />
          <Route path="/admin/tax-seasons" element={<TaxSeasons />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
