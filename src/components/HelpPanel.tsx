import React from "react";
import { 
  HelpCircle, X, Sword, Target, Zap, FolderKanban, 
  Trophy, Store, TreeDeciduous, BarChart3, Timer, 
  Heart, Coins, Star
} from "lucide-react";

interface HelpPanelProps {
  onClose: () => void;
}

const helpSections = [
  {
    icon: <Sword className="w-4 h-4" />,
    title: "Quests",
    description: "One-time tasks with XP rewards. Complete them to level up and earn coins. Choose rarity for bigger rewards!"
  },
  {
    icon: <Target className="w-4 h-4" />,
    title: "Tasks",
    description: "Enhanced tasks with priorities, energy types, and deadlines. Perfect for detailed productivity tracking."
  },
  {
    icon: <Zap className="w-4 h-4" />,
    title: "Habits",
    description: "Recurring activities that build streaks. Complete daily to maintain your streak multiplier and earn bonus rewards."
  },
  {
    icon: <FolderKanban className="w-4 h-4" />,
    title: "Projects",
    description: "Group related tasks into projects with milestones. Track progress on larger goals over time."
  },
  {
    icon: <Timer className="w-4 h-4" />,
    title: "Focus Timer",
    description: "Pomodoro-style timer for deep work sessions. Earn XP and coins for focused work time."
  },
  {
    icon: <Heart className="w-4 h-4" />,
    title: "Companion",
    description: "Your pixel pet companion! Keep them happy by completing tasks. They provide motivation and react to your progress."
  },
  {
    icon: <Coins className="w-4 h-4" />,
    title: "Coins",
    description: "Currency earned from completing tasks. Spend them in the shop for upgrades and customization."
  },
  {
    icon: <Store className="w-4 h-4" />,
    title: "Shop",
    description: "Purchase upgrades, boosters, and cosmetics with your hard-earned coins."
  },
  {
    icon: <TreeDeciduous className="w-4 h-4" />,
    title: "Skill Tree",
    description: "Unlock permanent upgrades and abilities. Spend skill points earned from leveling up."
  },
  {
    icon: <Trophy className="w-4 h-4" />,
    title: "Achievements",
    description: "Unlock badges by reaching milestones. Complete quests, maintain streaks, and more!"
  },
  {
    icon: <BarChart3 className="w-4 h-4" />,
    title: "Analytics",
    description: "View your productivity trends, energy balance, and weekly reports. Track burnout risk and optimize your workflow."
  },
  {
    icon: <Star className="w-4 h-4" />,
    title: "XP & Levels",
    description: "Earn XP from all activities. Level up to unlock skill points and show your progress!"
  }
];

export const HelpPanel: React.FC<HelpPanelProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card pixel-border p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-quest-mana flex items-center justify-center pixel-border">
              <HelpCircle className="w-5 h-5 text-dungeon-dark" />
            </div>
            <div>
              <h2 className="text-sm text-primary pixel-text-shadow">Help & Guide</h2>
              <p className="text-[10px] text-muted-foreground uppercase">
                Learn how to use Pixel Quest
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

        <div className="space-y-3">
          {helpSections.map((section, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 border-2 border-border bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="w-8 h-8 flex items-center justify-center bg-primary/20 border border-primary/30 text-primary shrink-0">
                {section.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xs text-foreground mb-1">{section.title}</h3>
                <p className="text-[9px] text-muted-foreground leading-relaxed">
                  {section.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-3 border-2 border-quest-gold/30 bg-quest-gold/10">
          <p className="text-[9px] text-quest-gold text-center">
            💡 Tip: Complete daily challenges for bonus rewards!
          </p>
        </div>
      </div>
    </div>
  );
};
