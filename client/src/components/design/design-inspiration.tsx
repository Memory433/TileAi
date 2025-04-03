import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function DesignInspiration() {
  const designItems = [
    {
      id: 1,
      title: "Minimalist Bathroom",
      description: "Clean lines with large format tiles",
      imageUrl: "https://images.unsplash.com/photo-1645327900047-1657eb361dc4?auto=format&fit=crop&w=800&h=600",
    },
    {
      id: 2,
      title: "Contemporary Kitchen",
      description: "Geometric backsplash with modern fixtures",
      imageUrl: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=800&h=600",
    },
    {
      id: 3,
      title: "Industrial Style Shower",
      description: "Concrete effect tiles with black fixtures",
      imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426nbf0a?auto=format&fit=crop&w=800&h=600",
    },
    {
      id: 4,
      title: "Luxurious Master Bath",
      description: "Marble effect tiles with gold accents",
      imageUrl: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&w=800&h=600",
    }
  ];

  return (
    <section className="mb-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Design Inspiration</h2>
        <p className="text-muted-foreground">Modern interior ideas for your next project</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {designItems.map((item) => (
          <motion.div
            key={item.id}
            className="bg-card rounded-xl overflow-hidden h-80"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative h-full">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-white font-medium mb-1">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
