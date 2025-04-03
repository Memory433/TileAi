import { useState } from "react";
import ChatInterface from "@/components/chat/chat-interface";

export default function Chat() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">AI Chat Assistant</h1>
        <p className="text-muted-foreground">
          Have a conversation with our AI to get personalized guidance on your tile and sanitary product needs
        </p>
      </div>
      
      <div className="bg-card rounded-xl p-4 md:p-6">
        <ChatInterface fullPage />
      </div>
    </div>
  );
}
