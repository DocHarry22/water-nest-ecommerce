import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showNumber = false,
  className,
}: StarRatingProps) {
  const sizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(
        <Star
          key={i}
          className={cn(sizes[size], "fill-yellow-400 text-yellow-400")}
        />
      );
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(
        <StarHalf
          key={i}
          className={cn(sizes[size], "fill-yellow-400 text-yellow-400")}
        />
      );
    } else {
      stars.push(
        <Star
          key={i}
          className={cn(sizes[size], "text-gray-300")}
        />
      );
    }
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {stars}
      {showNumber && (
        <span className="ml-1 text-sm text-gray-600">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
