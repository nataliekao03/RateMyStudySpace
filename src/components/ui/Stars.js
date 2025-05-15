// components/StarRating.jsx
import { Star, StarHalf } from "lucide-react";

export default function Stars({ rating, max = 5 }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.25 && rating % 1 < 0.75; // tweak range for better control
  const emptyStars = max - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className="w-5 h-5 fill-yellow-500 stroke-yellow-500" />
      ))}

      {/* Half star */}
      {hasHalf && <StarHalf className="w-5 h-5 fill-yellow-500 stroke-yellow-500" />}

      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 stroke-gray-300" />
      ))}

      {/* <span className="text-sm text-gray-600 ml-1">{rating.toFixed(1)}</span> */}
    </div>
  );
}
