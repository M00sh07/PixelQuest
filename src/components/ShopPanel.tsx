import React from "react";
import { Coins, Sparkles, Package, Crown, X } from "lucide-react";
import { PixelButton } from "./PixelButton";

interface ShopItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: string;
  stock?: number;
  maxOwned?: number;
  owned?: number;
  currentStock?: number;
  ownedCount?: number;
}

interface ShopPanelProps {
  coins: number;
  items: ShopItem[];
  onPurchase: (itemId: string) => { success: boolean; message: string };
  onClose: () => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  booster: <Sparkles className="w-4 h-4" />,
  boost: <Sparkles className="w-4 h-4" />,
  cosmetic: <Crown className="w-4 h-4" />,
  upgrade: <Package className="w-4 h-4" />,
  consumable: <Coins className="w-4 h-4" />,
  companion: <Crown className="w-4 h-4" />,
};

const categoryColors: Record<string, string> = {
  booster: "text-quest-epic border-quest-epic",
  boost: "text-quest-epic border-quest-epic",
  companion: "text-quest-legendary border-quest-legendary",
  cosmetic: "text-quest-gold border-quest-gold",
  upgrade: "text-accent border-accent",
  consumable: "text-quest-mana border-quest-mana",
};

export const ShopPanel: React.FC<ShopPanelProps> = ({
  coins,
  items,
  onPurchase,
  onClose,
}) => {
  const handlePurchase = (itemId: string) => {
    onPurchase(itemId);
  };

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ShopItem[]>);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card pixel-border p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-quest-gold flex items-center justify-center pixel-border-gold">
              <Coins className="w-5 h-5 text-dungeon-dark" />
            </div>
            <div>
              <h2 className="text-sm text-primary pixel-text-shadow">Shop</h2>
              <p className="text-[10px] text-muted-foreground uppercase">
                {coins} coins available
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div key={category}>
              <div className={`flex items-center gap-2 mb-3 ${categoryColors[category]}`}>
                {categoryIcons[category]}
                <h3 className="text-xs uppercase tracking-wider">{category}s</h3>
              </div>
              
              <div className="space-y-2">
                {categoryItems.map((item) => {
                  const canAfford = coins >= item.cost;
                  const inStock = item.stock === undefined || item.stock > 0;
                  const notMaxOwned = item.maxOwned === undefined || (item.owned || 0) < item.maxOwned;
                  const canBuy = canAfford && inStock && notMaxOwned;

                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 border-2 border-border bg-muted/30"
                    >
                      <div className={`w-8 h-8 flex items-center justify-center border-2 ${categoryColors[item.category]}`}>
                        {categoryIcons[item.category]}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-[10px] text-foreground">{item.name}</h4>
                        <p className="text-[8px] text-muted-foreground">{item.description}</p>
                        {item.stock !== undefined && (
                          <p className="text-[8px] text-muted-foreground">Stock: {item.stock}</p>
                        )}
                        {item.owned !== undefined && (
                          <p className="text-[8px] text-muted-foreground">Owned: {item.owned}{item.maxOwned ? `/${item.maxOwned}` : ''}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-quest-gold flex items-center gap-1">
                          <Coins className="w-3 h-3" />
                          {item.cost}
                        </span>
                        <PixelButton
                          size="sm"
                          variant={canBuy ? "default" : "ghost"}
                          onClick={() => handlePurchase(item.id)}
                          disabled={!canBuy}
                        >
                          {!inStock ? "Sold" : !notMaxOwned ? "Max" : !canAfford ? "Need" : "Buy"}
                        </PixelButton>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};