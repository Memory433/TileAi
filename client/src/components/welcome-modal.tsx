import { useState } from "react";
import { useUser } from "@/hooks/use-user";
import { useWelcome } from "@/hooks/use-welcome";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function WelcomeModal() {
  const [username, setUsername] = useState("");
  const { saveUser } = useUser();
  const { closeWelcome } = useWelcome();
  const [error, setError] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError("Please enter your name");
      return;
    }
    
    saveUser(username);
    closeWelcome();
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 animate-in fade-in-0">
      <div className="bg-card rounded-xl p-8 max-w-md w-full mx-4 animate-in slide-in-from-bottom-10 duration-300">
        <h2 className="text-2xl font-bold mb-4">Welcome to TileAI</h2>
        <p className="text-muted-foreground mb-6">Your smart assistant for tiles and sanitary fixtures. Let's start by getting to know you.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username" className="block text-sm font-medium mb-1">Your Name</Label>
            <Input 
              type="text" 
              id="username" 
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              placeholder="Enter your name" 
              className="w-full px-4 py-3"
            />
            {error && <p className="text-sm text-destructive mt-1">{error}</p>}
          </div>
          
          <div className="pt-4">
            <Button type="submit" className="w-full">
              Get Started
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
