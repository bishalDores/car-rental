"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value?: number;
  onChange?: (value: number) => void;
  size?: number;
  className?: string;
}

export function Rating({ value = 0, onChange, size = 24, className }: RatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={cn("flex gap-1", className)}>
      {stars.map((star) => {
        const filled = hovered !== null ? star <= hovered : star <= value;

        return (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onChange?.(star)}
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            className="focus:outline-none"
          >
            <Star size={size} className={cn("transition-colors", filled ? "fill-yellow-400 text-yellow-400" : "text-gray-300")} />
          </button>
        );
      })}
    </div>
  );
}
