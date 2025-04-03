import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useChat } from "@/hooks/use-chat";

interface TileCalculatorProps {
  fullPage?: boolean;
}

interface CalculationResult {
  totalArea: number;
  tilesNeeded: number;
  extraTiles: number;
  totalTiles: number;
}

export default function TileCalculator({ fullPage = false }: TileCalculatorProps) {
  const [roomType, setRoomType] = useState("bathroom");
  const [surfaceType, setSurfaceType] = useState("floor");
  const [width, setWidth] = useState(3);
  const [length, setLength] = useState(4);
  const [tileSize, setTileSize] = useState("600x600");
  const [results, setResults] = useState<CalculationResult>({
    totalArea: 12,
    tilesNeeded: 34,
    extraTiles: 4,
    totalTiles: 38,
  });
  
  const { getRecommendations } = useChat();
  
  // Update calculations when inputs change
  useEffect(() => {
    updateCalculation();
  }, [width, length, tileSize]);
  
  const updateCalculation = () => {
    let tileSizeM2;
    
    switch(tileSize) {
      case '300x300':
        tileSizeM2 = 0.3 * 0.3;
        break;
      case '300x600':
        tileSizeM2 = 0.3 * 0.6;
        break;
      case '600x600':
        tileSizeM2 = 0.6 * 0.6;
        break;
      case '900x900':
        tileSizeM2 = 0.9 * 0.9;
        break;
      default:
        tileSizeM2 = 0.6 * 0.6; // Default to 60x60
    }
    
    const totalArea = width * length;
    const tilesNeeded = Math.ceil(totalArea / tileSizeM2);
    const extraTiles = Math.ceil(tilesNeeded * 0.1); // 10% extra
    const totalTiles = tilesNeeded + extraTiles;
    
    setResults({
      totalArea,
      tilesNeeded,
      extraTiles,
      totalTiles,
    });
  };
  
  const handleRecommendations = () => {
    getRecommendations({
      roomType,
      surfaceType,
      area: results.totalArea,
    });
  };
  
  const resetCalculator = () => {
    setRoomType("bathroom");
    setSurfaceType("floor");
    setWidth(3);
    setLength(4);
    setTileSize("600x600");
    updateCalculation();
  };
  
  return (
    <section className={fullPage ? "" : "mb-10"}>
      {!fullPage && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Tile Calculator</h2>
          <p className="text-muted-foreground">Calculate how many tiles you'll need for your project</p>
        </div>
      )}
      
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="roomType">Room Type</Label>
                <Select value={roomType} onValueChange={setRoomType}>
                  <SelectTrigger id="roomType">
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bathroom">Bathroom</SelectItem>
                    <SelectItem value="kitchen">Kitchen</SelectItem>
                    <SelectItem value="livingRoom">Living Room</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="surfaceType">Surface Type</Label>
                <Select value={surfaceType} onValueChange={setSurfaceType}>
                  <SelectTrigger id="surfaceType">
                    <SelectValue placeholder="Select surface type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="floor">Floor</SelectItem>
                    <SelectItem value="wall">Wall</SelectItem>
                    <SelectItem value="both">Both Floor & Wall</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="areaWidth">Width (m)</Label>
                <Input 
                  id="areaWidth"
                  type="number" 
                  value={width}
                  onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                  min={0.1}
                  step={0.1}
                />
              </div>
              
              <div>
                <Label htmlFor="areaLength">Length (m)</Label>
                <Input 
                  id="areaLength"
                  type="number" 
                  value={length}
                  onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                  min={0.1}
                  step={0.1}
                />
              </div>
              
              <div>
                <Label htmlFor="tileSize">Tile Size</Label>
                <Select value={tileSize} onValueChange={setTileSize}>
                  <SelectTrigger id="tileSize">
                    <SelectValue placeholder="Select tile size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="300x300">30cm × 30cm</SelectItem>
                    <SelectItem value="300x600">30cm × 60cm</SelectItem>
                    <SelectItem value="600x600">60cm × 60cm</SelectItem>
                    <SelectItem value="900x900">90cm × 90cm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="bg-accent/20 rounded-lg p-5">
              <h3 className="text-xl font-medium mb-4">Results</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Area:</span>
                  <span className="font-medium">{results.totalArea.toFixed(1)} m²</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tiles Needed:</span>
                  <span className="font-medium">{results.tilesNeeded} tiles</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Extra for Cuts (10%):</span>
                  <span className="font-medium">{results.extraTiles} tiles</span>
                </div>
                
                <div className="flex justify-between pt-3 border-t border-border">
                  <span className="text-muted-foreground font-medium">Total Tiles:</span>
                  <span className="text-primary font-bold">{results.totalTiles} tiles</span>
                </div>
              </div>
              
              <div className="text-center">
                <Button 
                  className="w-full mb-3" 
                  onClick={handleRecommendations}
                >
                  Get AI Recommendations
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={resetCalculator}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
