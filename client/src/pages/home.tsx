import { useQuery } from "@tanstack/react-query";
import ChatInterface from "@/components/chat/chat-interface";
import ProductGrid from "@/components/products/product-grid";
import TileCalculator from "@/components/calculator/tile-calculator";
import DesignInspiration from "@/components/design/design-inspiration";
import { useUser } from "@/hooks/use-user";

export default function Home() {
  const { user } = useUser();
  
  // Fetch featured tiles
  const { data: featuredTiles, isLoading: tilesLoading } = useQuery({
    queryKey: ['/api/products?category=tile&featured=true'],
  });
  
  // Fetch featured sanitary fixtures
  const { data: featuredSanitary, isLoading: sanitaryLoading } = useQuery({
    queryKey: ['/api/products?category=sanitary&featured=true'],
  });

  return (
    <div>
      {/* AI Chat Section */}
      <section className="mb-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">AI Assistant</h2>
          <p className="text-muted-foreground">Ask questions about tiles, get design tips, or recommendations</p>
        </div>
        
        <ChatInterface />
      </section>
      
      {/* Featured Tiles */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Featured Tiles</h2>
            <p className="text-muted-foreground">Our most popular collections</p>
          </div>
          
          <a href="#" className="text-primary hover:underline text-sm flex items-center">
            View all <span className="ml-1">→</span>
          </a>
        </div>
        
        <ProductGrid products={featuredTiles} isLoading={tilesLoading} />
      </section>
      
      {/* Sanitary Fixtures */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Sanitary Fixtures</h2>
            <p className="text-muted-foreground">Premium bathroom solutions</p>
          </div>
          
          <a href="#" className="text-primary hover:underline text-sm flex items-center">
            View all <span className="ml-1">→</span>
          </a>
        </div>
        
        <ProductGrid products={featuredSanitary} isLoading={sanitaryLoading} />
      </section>
      
      {/* Tile Calculator */}
      <TileCalculator />
      
      {/* Design Inspiration */}
      <DesignInspiration />
    </div>
  );
}
