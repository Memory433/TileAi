import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema, insertChatMessageSchema } from "@shared/schema";
import { getChatResponse, getTileRecommendations } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  
  // Product routes
  app.get("/api/products", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const featured = req.query.featured === "true";
      
      let products;
      if (category && featured) {
        products = await storage.getFeaturedProductsByCategory(category);
      } else if (category) {
        products = await storage.getProductsByCategory(category);
      } else if (featured) {
        products = await storage.getFeaturedProducts();
      } else {
        products = await storage.getAllProducts();
      }
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProductById(id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Chat routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, userId, conversationHistory } = req.body;
      
      if (!message) {
        return res.status(400).json({ message: "Message is required" });
      }
      
      // Save user message
      const userMessage = {
        userId: userId || 1,
        content: message,
        isUserMessage: true
      };
      
      await storage.createChatMessage(userMessage);
      
      // Get AI response
      const aiResponse = await getChatResponse(message, conversationHistory || []);
      
      // Save AI response
      const assistantMessage = {
        userId: userId || 1,
        content: aiResponse.text,
        isUserMessage: false
      };
      
      await storage.createChatMessage(assistantMessage);
      
      res.json(aiResponse);
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ message: "Failed to process chat message" });
    }
  });

  // Tile calculator recommendations
  app.post("/api/recommendations", async (req, res) => {
    try {
      const { roomType, surfaceType, area } = req.body;
      
      if (!roomType || !surfaceType || !area) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      const recommendations = await getTileRecommendations(roomType, surfaceType, area);
      
      res.json(recommendations);
    } catch (error) {
      console.error("Recommendations error:", error);
      res.status(500).json({ message: "Failed to get recommendations" });
    }
  });

  // Order submission
  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(orderData);
      
      res.status(201).json(order);
    } catch (error) {
      console.error("Order submission error:", error);
      res.status(400).json({ message: "Invalid order data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
