import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  
  const formatPrice = (price: string | number) => {
    return product.unit === 'sqm' 
      ? `$${price}/sqm` 
      : `$${price}`;
  };
  
  return (
    <>
      <motion.div 
        className="bg-card rounded-xl overflow-hidden shadow-md"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-48 object-cover"
          />
          {product.isFeatured && (
            <span className="absolute top-3 right-3 bg-black bg-opacity-60 text-white text-xs py-1 px-2 rounded">
              Trending
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium mb-1">{product.name}</h3>
          <p className="text-muted-foreground text-sm mb-3">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-primary font-bold">{formatPrice(product.price)}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowDetails(true)}
              className="hover:bg-accent"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
            </Button>
          </div>
        </div>
      </motion.div>
      
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {product.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-4">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-64 object-cover rounded-md"
            />
          </div>
          
          <div className="flex justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Price</p>
              <p className="text-primary font-bold">{formatPrice(product.price)}</p>
            </div>
            
            <Button onClick={() => setShowDetails(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
