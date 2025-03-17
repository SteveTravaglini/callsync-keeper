
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnimatedTransition from "@/components/AnimatedTransition";
import Index from "./pages/Index";
import Recordings from "./pages/Recordings";
import JoinCall from "./pages/JoinCall";
import RecordingDetails from "./pages/RecordingDetails";
import Transcript from "./pages/Transcript";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedTransition>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/recordings" element={<Recordings />} />
            <Route path="/join-call" element={<JoinCall />} />
            <Route path="/recording/:id" element={<RecordingDetails />} />
            <Route path="/transcript/:id" element={<Transcript />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatedTransition>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
