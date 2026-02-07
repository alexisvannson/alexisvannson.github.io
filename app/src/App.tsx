import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { PortfolioLayout } from "@/components/portfolio/PortfolioLayout";
import HomePage from "./pages/HomePage";
import MolInsightPage from "./pages/MolInsightPage";
import ProjectCaseStudy from "./pages/ProjectCaseStudy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<PortfolioLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects/mol-insight" element={<MolInsightPage />} />
              <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
