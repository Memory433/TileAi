import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useChat, ChatMessage } from "@/hooks/use-chat";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatInterfaceProps {
  fullPage?: boolean;
}

export default function ChatInterface({ fullPage = false }: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState("");
  const { messages, isTyping, sendMessage } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };
  
  const renderMessage = (message: ChatMessage, index: number) => {
    const time = new Date(message.timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    if (message.isUser) {
      return (
        <motion.div 
          key={index} 
          className="flex items-start justify-end mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <div className="bg-primary bg-opacity-20 rounded-lg p-3 inline-block max-w-[85%]">
              <p>{message.content}</p>
            </div>
            <div className="text-xs text-muted-foreground mt-1 text-right">{time}</div>
          </div>
        </motion.div>
      );
    } else {
      return (
        <motion.div 
          key={index} 
          className="flex items-start mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8V4H8"/>
              <rect x="2" y="2" width="20" height="8" rx="2"/>
              <path d="M2 12h20"/>
              <path d="M2 16h20"/>
              <path d="M2 20h20"/>
            </svg>
          </div>
          <div>
            <div className="bg-card rounded-lg p-3 inline-block max-w-[85%]">
              <p>{message.content}</p>
            </div>
            <div className="text-xs text-muted-foreground mt-1">{time}</div>
          </div>
        </motion.div>
      );
    }
  };
  
  return (
    <Card className="bg-card">
      <CardContent className={`p-4 md:p-6 ${fullPage ? '' : ''}`}>
        <ScrollArea className={`mb-4 pr-4 ${fullPage ? 'h-[60vh]' : 'h-80'}`}>
          <div className="space-y-4">
            {messages.map((msg, index) => renderMessage(msg, index))}
            
            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 8V4H8"/>
                      <rect x="2" y="2" width="20" height="8" rx="2"/>
                      <path d="M2 12h20"/>
                      <path d="M2 16h20"/>
                      <path d="M2 20h20"/>
                    </svg>
                  </div>
                  <div className="bg-card rounded-lg py-3 px-4 inline-flex">
                    <span className="typing-dots">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground inline-block mx-0.5 animate-pulse" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-2 h-2 rounded-full bg-muted-foreground inline-block mx-0.5 animate-pulse" style={{ animationDelay: "200ms" }}></span>
                      <span className="w-2 h-2 rounded-full bg-muted-foreground inline-block mx-0.5 animate-pulse" style={{ animationDelay: "400ms" }}></span>
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div ref={bottomRef} />
          </div>
        </ScrollArea>
        
        <form onSubmit={handleSubmit} className="relative">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about tiles, designs, or recommendations..."
            className="pr-12"
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-primary"
            disabled={isTyping}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </Button>
        </form>
        
        <div className="mt-3 flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs rounded-full"
            onClick={() => {
              sendMessage("What tiles would you recommend for a bathroom?");
            }}
          >
            Tile recommendations
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs rounded-full"
            onClick={() => {
              sendMessage("Can you suggest some bathroom design ideas?");
            }}
          >
            Bathroom design ideas
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs rounded-full"
            onClick={() => {
              sendMessage("How many tiles do I need for a 10 square meter room?");
            }}
          >
            Calculate tiles needed
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
