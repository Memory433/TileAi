import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export interface ChatMessage {
  id?: number;
  content: string;
  isUser: boolean;
  timestamp: string;
}

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      content: "Hi there! Welcome to TileAI. How can I help you with your tile or sanitary ware needs today?",
      isUser: false,
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  // Convert messages to the format expected by OpenAI
  const getConversationHistory = () => {
    return messages.map(msg => ({
      role: msg.isUser ? "user" : "assistant" as "user" | "assistant",
      content: msg.content
    }));
  };

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest(
        "POST",
        "/api/chat",
        {
          message,
          conversationHistory: getConversationHistory()
        }
      );
      return response.json();
    },
    onMutate: (message) => {
      // Add user message to the chat immediately
      const newUserMessage: ChatMessage = {
        content: message,
        isUser: true,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, newUserMessage]);
      setIsTyping(true);
    },
    onSuccess: (data) => {
      // Add AI response to the chat
      const newAIMessage: ChatMessage = {
        content: data.text,
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, newAIMessage]);
      setIsTyping(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
      setIsTyping(false);
    },
  });

  const getTileRecommendationsMutation = useMutation({
    mutationFn: async (data: { roomType: string; surfaceType: string; area: number }) => {
      const response = await apiRequest(
        "POST",
        "/api/recommendations",
        data
      );
      return response.json();
    },
    onMutate: (data) => {
      // Add user query as a message
      const message = `I need recommendations for ${data.roomType} ${data.surfaceType} tiles. My area is ${data.area} m².`;
      
      const newUserMessage: ChatMessage = {
        content: message,
        isUser: true,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, newUserMessage]);
      setIsTyping(true);
    },
    onSuccess: (data) => {
      // Add AI response with recommendations
      const newAIMessage: ChatMessage = {
        content: data.text,
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, newAIMessage]);
      setIsTyping(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to get recommendations. Please try again.",
        variant: "destructive",
      });
      setIsTyping(false);
    },
  });

  const sendMessage = (message: string) => {
    if (message.trim()) {
      sendMessageMutation.mutate(message);
    }
  };

  const getRecommendations = (data: { roomType: string; surfaceType: string; area: number }) => {
    getTileRecommendationsMutation.mutate(data);
  };

  return {
    messages,
    isTyping,
    sendMessage,
    getRecommendations,
  };
};
