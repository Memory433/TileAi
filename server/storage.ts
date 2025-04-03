import { 
  users, User, InsertUser, 
  products, Product, InsertProduct,
  chatMessages, ChatMessage, InsertChatMessage,
  orders, Order, InsertOrder
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product operations
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getFeaturedProductsByCategory(category: string): Promise<Product[]>;
  
  // Chat operations
  getChatMessagesByUserId(userId: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  // Order operations
  createOrder(order: InsertOrder): Promise<Order>;
  getOrderById(id: number): Promise<Order | undefined>;
  
  // Initialize the database
  initializeDatabase(): Promise<void>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private chatMessages: Map<number, ChatMessage>;
  private orders: Map<number, Order>;
  
  private userCurrentId: number;
  private productCurrentId: number;
  private chatMessageCurrentId: number;
  private orderCurrentId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.chatMessages = new Map();
    this.orders = new Map();
    
    this.userCurrentId = 1;
    this.productCurrentId = 1;
    this.chatMessageCurrentId = 1;
    this.orderCurrentId = 1;
    
    // Initialize with sample products
    this.initializeProducts();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Product operations
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category === category
    );
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.isFeatured
    );
  }
  
  async getFeaturedProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category === category && product.isFeatured
    );
  }
  
  // Chat operations
  async getChatMessagesByUserId(userId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values()).filter(
      message => message.userId === userId
    );
  }
  
  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.chatMessageCurrentId++;
    const timestamp = new Date();
    const message: ChatMessage = { ...insertMessage, id, timestamp };
    this.chatMessages.set(id, message);
    return message;
  }
  
  // Order operations
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.orderCurrentId++;
    const timestamp = new Date();
    const order: Order = { ...insertOrder, id, status: "pending", timestamp };
    this.orders.set(id, order);
    return order;
  }
  
  async getOrderById(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  // This needs to be called explicitly in PostgreSQL implementation
  async initializeDatabase(): Promise<void> {
    // Already initialized in constructor
    return;
  }
  
  // Initialize with sample products
  private initializeProducts() {
    // Tile products
    const tileProducts: InsertProduct[] = [
      {
        name: "Modern Hexagon Collection",
        description: "Porcelain geometric tiles for modern spaces",
        category: "tile",
        imageUrl: "https://images.unsplash.com/photo-1575652487037-abef22446c4b?auto=format&fit=crop&w=600&h=400",
        price: "24.99",
        unit: "sqm",
        isFeatured: true
      },
      {
        name: "Marble Effect Series",
        description: "Elegant ceramic tiles with marble finish",
        category: "tile",
        imageUrl: "https://images.unsplash.com/photo-1610768260300-a60e7f12699b?auto=format&fit=crop&w=600&h=400",
        price: "32.50",
        unit: "sqm",
        isFeatured: true
      },
      {
        name: "Natural Wood Effect",
        description: "Durable porcelain with authentic wood look",
        category: "tile",
        imageUrl: "https://images.unsplash.com/photo-1628602813485-4e8b09442e98?auto=format&fit=crop&w=600&h=400",
        price: "28.75",
        unit: "sqm",
        isFeatured: true
      },
      {
        name: "Urban Concrete",
        description: "Industrial style concrete effect tiles",
        category: "tile",
        imageUrl: "https://images.unsplash.com/photo-1557245526-5b47d9515a8a?auto=format&fit=crop&w=600&h=400",
        price: "21.99",
        unit: "sqm",
        isFeatured: false
      },
      {
        name: "Moroccan Pattern",
        description: "Colorful patterned tiles for feature walls",
        category: "tile",
        imageUrl: "https://images.unsplash.com/photo-1546301590-4a9e8b537fcf?auto=format&fit=crop&w=600&h=400",
        price: "36.25",
        unit: "sqm",
        isFeatured: false
      },
      {
        name: "Metro Subway Tiles",
        description: "Classic rectangular tiles for walls",
        category: "tile",
        imageUrl: "https://images.unsplash.com/photo-1534117218761-b4c712128381?auto=format&fit=crop&w=600&h=400",
        price: "18.50",
        unit: "sqm",
        isFeatured: false
      }
    ];
    
    // Sanitary products
    const sanitaryProducts: InsertProduct[] = [
      {
        name: "Wall-Hung Toilet Suite",
        description: "Space-saving design with concealed cistern",
        category: "sanitary",
        imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426nbf0a?auto=format&fit=crop&w=600&h=400",
        price: "649.00",
        unit: "unit",
        isFeatured: true
      },
      {
        name: "Freestanding Bathtub",
        description: "Modern oval design with overflow",
        category: "sanitary",
        imageUrl: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&w=600&h=400",
        price: "1199.00",
        unit: "unit",
        isFeatured: true
      },
      {
        name: "Wall-Mounted Vanity",
        description: "Minimalist design with integrated sink",
        category: "sanitary",
        imageUrl: "https://images.unsplash.com/photo-1584622781564-d34bd8a9076c?auto=format&fit=crop&w=600&h=400",
        price: "849.00",
        unit: "unit",
        isFeatured: true
      },
      {
        name: "Rain Shower Head",
        description: "Ceiling mounted rainfall shower experience",
        category: "sanitary",
        imageUrl: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=600&h=400",
        price: "249.00",
        unit: "unit",
        isFeatured: false
      },
      {
        name: "Modern Basin Mixer",
        description: "Single lever chrome tap for basins",
        category: "sanitary",
        imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426nbf0a?auto=format&fit=crop&w=600&h=400",
        price: "189.00",
        unit: "unit",
        isFeatured: false
      },
      {
        name: "Glass Shower Screen",
        description: "Frameless glass panel for walk-in showers",
        category: "sanitary",
        imageUrl: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=600&h=400",
        price: "379.00",
        unit: "unit",
        isFeatured: false
      }
    ];
    
    // Add products to storage
    [...tileProducts, ...sanitaryProducts].forEach(product => {
      const id = this.productCurrentId++;
      this.products.set(id, { 
        ...product, 
        id, 
        isFeatured: product.isFeatured ?? false 
      });
    });
  }
}

// PostgreSQL storage implementation
export class DbStorage implements IStorage {
  
  constructor() {}
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }
  
  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }
  
  // Product operations
  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id));
    return result[0];
  }
  
  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.category, category));
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.isFeatured, true));
  }
  
  async getFeaturedProductsByCategory(category: string): Promise<Product[]> {
    return await db.select().from(products).where(
      and(
        eq(products.category, category),
        eq(products.isFeatured, true)
      )
    );
  }
  
  // Chat operations
  async getChatMessagesByUserId(userId: number): Promise<ChatMessage[]> {
    return await db.select().from(chatMessages).where(eq(chatMessages.userId, userId));
  }
  
  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const result = await db.insert(chatMessages).values(message).returning();
    return result[0];
  }
  
  // Order operations
  async createOrder(order: InsertOrder): Promise<Order> {
    const result = await db.insert(orders).values({
      ...order,
      status: "pending"
    }).returning();
    return result[0];
  }
  
  async getOrderById(id: number): Promise<Order | undefined> {
    const result = await db.select().from(orders).where(eq(orders.id, id));
    return result[0];
  }
  
  // Initialize the database with sample data
  async initializeDatabase(): Promise<void> {
    console.log("Initializing database with sample products...");
    
    // Check if products already exist
    const existingProducts = await db.select().from(products);
    
    // Only insert sample products if there are none
    if (existingProducts.length === 0) {
      console.log("No products found, inserting sample data...");
      
      // Tile products
      const tileProducts: InsertProduct[] = [
        {
          name: "Modern Hexagon Collection",
          description: "Porcelain geometric tiles for modern spaces",
          category: "tile",
          imageUrl: "https://images.unsplash.com/photo-1575652487037-abef22446c4b?auto=format&fit=crop&w=600&h=400",
          price: "24.99",
          unit: "sqm",
          isFeatured: true
        },
        {
          name: "Marble Effect Series",
          description: "Elegant ceramic tiles with marble finish",
          category: "tile",
          imageUrl: "https://images.unsplash.com/photo-1610768260300-a60e7f12699b?auto=format&fit=crop&w=600&h=400",
          price: "32.50",
          unit: "sqm",
          isFeatured: true
        },
        {
          name: "Natural Wood Effect",
          description: "Durable porcelain with authentic wood look",
          category: "tile",
          imageUrl: "https://images.unsplash.com/photo-1628602813485-4e8b09442e98?auto=format&fit=crop&w=600&h=400",
          price: "28.75",
          unit: "sqm",
          isFeatured: true
        },
        {
          name: "Urban Concrete",
          description: "Industrial style concrete effect tiles",
          category: "tile",
          imageUrl: "https://images.unsplash.com/photo-1557245526-5b47d9515a8a?auto=format&fit=crop&w=600&h=400",
          price: "21.99",
          unit: "sqm",
          isFeatured: false
        },
        {
          name: "Moroccan Pattern",
          description: "Colorful patterned tiles for feature walls",
          category: "tile",
          imageUrl: "https://images.unsplash.com/photo-1546301590-4a9e8b537fcf?auto=format&fit=crop&w=600&h=400",
          price: "36.25",
          unit: "sqm",
          isFeatured: false
        },
        {
          name: "Metro Subway Tiles",
          description: "Classic rectangular tiles for walls",
          category: "tile",
          imageUrl: "https://images.unsplash.com/photo-1534117218761-b4c712128381?auto=format&fit=crop&w=600&h=400",
          price: "18.50",
          unit: "sqm",
          isFeatured: false
        }
      ];
      
      // Sanitary products
      const sanitaryProducts: InsertProduct[] = [
        {
          name: "Wall-Hung Toilet Suite",
          description: "Space-saving design with concealed cistern",
          category: "sanitary",
          imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426nbf0a?auto=format&fit=crop&w=600&h=400",
          price: "649.00",
          unit: "unit",
          isFeatured: true
        },
        {
          name: "Freestanding Bathtub",
          description: "Modern oval design with overflow",
          category: "sanitary",
          imageUrl: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&w=600&h=400",
          price: "1199.00",
          unit: "unit",
          isFeatured: true
        },
        {
          name: "Wall-Mounted Vanity",
          description: "Minimalist design with integrated sink",
          category: "sanitary",
          imageUrl: "https://images.unsplash.com/photo-1584622781564-d34bd8a9076c?auto=format&fit=crop&w=600&h=400",
          price: "849.00",
          unit: "unit",
          isFeatured: true
        },
        {
          name: "Rain Shower Head",
          description: "Ceiling mounted rainfall shower experience",
          category: "sanitary",
          imageUrl: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=600&h=400",
          price: "249.00",
          unit: "unit",
          isFeatured: false
        },
        {
          name: "Modern Basin Mixer",
          description: "Single lever chrome tap for basins",
          category: "sanitary",
          imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426nbf0a?auto=format&fit=crop&w=600&h=400",
          price: "189.00",
          unit: "unit",
          isFeatured: false
        },
        {
          name: "Glass Shower Screen",
          description: "Frameless glass panel for walk-in showers",
          category: "sanitary",
          imageUrl: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=600&h=400",
          price: "379.00",
          unit: "unit",
          isFeatured: false
        }
      ];
      
      // Insert all products
      await db.insert(products).values([...tileProducts, ...sanitaryProducts]);
      
      console.log("Sample products inserted successfully!");
    } else {
      console.log(`Found ${existingProducts.length} existing products, skipping sample data insertion.`);
    }
  }
}

// Create and export the appropriate storage instance
// Use environment variable to determine which storage to use
export const storage = process.env.DATABASE_URL ? new DbStorage() : new MemStorage();
