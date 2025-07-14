import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Cursos from "./pages/Cursos";
import Catalogo from "./pages/Catalogo";
import SobreNos from "./pages/SobreNos";
import GestaoDeCultura from "./pages/GestaoDeCultura";
import Historia from "./pages/Historia";
import Layout from "./components/Layout";
import EnrollmentPage from "./pages/EnrollmentPage";
import AdminPage from "./pages/AdminPage";
import { SiteDataProvider } from "@/context/SiteDataContext";
import Checkout from "./pages/Checkout";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={
                  <SiteDataProvider>
                    <Index />
                  </SiteDataProvider>
                }
              />
              <Route
                path="/cursos"
                element={
                  <SiteDataProvider>
                    <Cursos />
                  </SiteDataProvider>
                }
              />
              <Route
                path="/admin"
                element={
                  <SiteDataProvider>
                    <AdminPage />
                  </SiteDataProvider>
                }
              />
              <Route
                path="/catalogo"
                element={
                  <SiteDataProvider>
                    <Catalogo />
                  </SiteDataProvider>
                }
              />
              <Route
                path="/sobre-nos"
                element={
                  <SiteDataProvider>
                    <SobreNos />
                  </SiteDataProvider>
                }
              />
              <Route
                path="/gestao-de-cultura"
                element={
                  <SiteDataProvider>
                    <GestaoDeCultura />
                  </SiteDataProvider>
                }
              />
              <Route
                path="/historia"
                element={
                  <SiteDataProvider>
                    <Historia />
                  </SiteDataProvider>
                }
              />
              <Route path="/inscricao" element={<EnrollmentPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
