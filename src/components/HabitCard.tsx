import React from "react";
import { cn } from "@/lib/utils";
import { PixelButton } from "./PixelButton";
import { CheckCircle, XCircle, Flame, TrendingUp, Trash2 } from "lucide-react";
import { Habit, HabitStats } from "@/types/productivity";

interface HabitCardProps {
  habit: Habit & { completedToday: boolean };
  stats?: HabitStats | null;
  onComplete: (id: string, value?: number) => void;
  onMiss: (id: string) => void;
  onDelete: (id: string) => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  stats,
  onComplete,
  onMiss,
  onDelete,
}) => {
  const isPositive = habit.polarity === "positive";
  const successRate = stats?.successRate || 0;

  return (
    <div
      className={cn(
        "bg-card pixel-border p-4 transition-all",
        habit.completedToday && "opacity-70",
        isPositive ? "border-quest-xp" : "border-quest-health"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <span className={cn(
              "text-[10px] uppercase",
              isPositive ? "text-quest-xp" : "text-quest-health"
            )}>
              {isPositive ? "Build" : "Break"}
            </span>
            {habit.currentStreak > 0 && (
              <span className="flex items-center gap-1 text-[10px] text-quest-legendary">
                <Flame className="w-3 h-3" />
                {habit.currentStreak} streak
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xs mb-2">{habit.title}</h3>

          {/* Description */}
          {habit.description && (
            <p className="text-[10px] text-muted-foreground mb-2">
              {habit.description}
            </p>
          )}

          {/* Stats row */}
          <div className="flex items-center gap-4 text-[10px]">
            <span className="text-muted-foreground">
              Best: {habit.bestStreak}
            </span>
            <span className="text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {successRate.toFixed(0)}%
            </span>
            <span className="text-quest-gold">
              x{habit.momentumMultiplier.toFixed(1)} momentum
            </span>
          </div>

          {/* Rewards */}
          <div className="flex items-center gap-2 mt-2 text-[10px]">
            <span className="text-quest-xp">+{Math.round(habit.baseXP * habit.momentumMultiplier)} XP</span>
            <span className="text-quest-gold">+{Math.round(habit.baseCoins * habit.momentumMultiplier)} 🪙</span>
          </div>

          {/* Difficulty indicator */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[8px] text-muted-foreground uppercase">Difficulty:</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-2 h-2",
                    i < habit.difficultyLevel ? "bg-quest-rare" : "bg-muted"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          {!habit.completedToday ? (
            <>
              <PixelButton
                variant="xp"
                size="icon"
                onClick={() => onComplete(habit.id)}
                className="w-8 h-8"
                title={isPositive ? "Complete habit" : "Avoided"}
              >
                <CheckCircle className="w-4 h-4" />
              </PixelButton>
              {isPositive && (
                <PixelButton
                  variant="danger"
                  size="icon"
                  onClick={() => onMiss(habit.id)}
                  className="w-8 h-8"
                  title="Mark as missed"
                >
                  <XCircle className="w-4 h-4" />
                </PixelButton>
              )}
            </>
          ) : (
            <div className="w-8 h-8 flex items-center justify-center text-quest-xp">
              <CheckCircle className="w-5 h-5" />
            </div>
          )}
          <PixelButton
            variant="ghost"
            size="icon"
            onClick={() => onDelete(habit.id)}
            className="w-8 h-8"
            title="Delete habit"
          >
            <Trash2 className="w-4 h-4" />
          </PixelButton>
        </div>
      </div>
    </div>
  );
};