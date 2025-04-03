import TileCalculator from "@/components/calculator/tile-calculator";

export default function Calculator() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Tile Calculator</h1>
        <p className="text-muted-foreground">
          Calculate exactly how many tiles you'll need for your project
        </p>
      </div>
      
      <div className="bg-card rounded-xl p-6">
        <TileCalculator fullPage />
      </div>
    </div>
  );
}
