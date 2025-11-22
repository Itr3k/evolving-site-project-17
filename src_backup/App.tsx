import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import Solutions from "./pages/Solutions";
import Showcase from "./pages/Showcase";
import Resources from "./pages/Resources";
import About from "./pages/About";
import IntelligentAutomation from "./pages/solutions/IntelligentAutomation";
import DecisionIntelligence from "./pages/solutions/DecisionIntelligence";
import ConversationalAI from "./pages/solutions/ConversationalAI";
import DocumentIntelligence from "./pages/solutions/DocumentIntelligence";
import ComputerVision from "./pages/solutions/ComputerVision";
import CustomSolutions from "./pages/solutions/CustomSolutions";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogTag from "./pages/BlogTag";
import BlogAdmin from "./pages/BlogAdmin";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ThankYou from "./pages/ThankYou";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/solutions/intelligent-automation" element={<IntelligentAutomation />} />
            <Route path="/solutions/decision-intelligence" element={<DecisionIntelligence />} />
            <Route path="/solutions/conversational-ai" element={<ConversationalAI />} />
            <Route path="/solutions/document-intelligence" element={<DocumentIntelligence />} />
            <Route path="/solutions/computer-vision" element={<ComputerVision />} />
            <Route path="/solutions/custom-solutions" element={<CustomSolutions />} />
            <Route path="/showcase" element={<Showcase />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/auth" element={<Auth />} />
            <Route 
              path="/blog/admin" 
              element={
                <ProtectedRoute requireAdmin>
                  <BlogAdmin />
                </ProtectedRoute>
              } 
            />
            <Route path="/blog/tag/:slug" element={<BlogTag />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact/thank-you" element={<ThankYou />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
