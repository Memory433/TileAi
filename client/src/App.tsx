import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Sidebar from "@/components/layout/sidebar";
import MobileNav from "@/components/layout/mobile-nav";
import WelcomeModal from "@/components/welcome-modal";
import { useUser } from "@/hooks/use-user";
import { useWelcome } from "@/hooks/use-welcome";

// Pages
import Home from "@/pages/home";
import Chat from "@/pages/chat";
import Calculator from "@/pages/calculator";
import Order from "@/pages/order";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/chat" component={Chat} />
      <Route path="/calculator" component={Calculator} />
      <Route path="/order" component={Order} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { user } = useUser();
  const { showWelcome } = useWelcome();
  const [location] = useLocation();
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col md:flex-row h-screen">
        <Sidebar />
        
        <div className="flex-1 md:ml-64 pb-16 md:pb-0">
          {/* Mobile Header is included in MobileNav */}
          
          <main className="p-4 md:p-8">
            <Router />
          </main>
          
          <MobileNav currentPath={location} />
        </div>
      </div>
      
      {showWelcome && <WelcomeModal />}
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
