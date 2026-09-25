"use client";

import type {
Destination,
Recommendation,
} from "@/lib/types";
import { RecommendationCard } from "./recommendcard";


type RecommendationListProps = {
recommendations: Recommendation[];
colors: string[];
onDestinationSelect?: (
destination: Destination,
recommendation: Recommendation
) => void;
};

export function RecommendationList({
recommendations,
colors,
onDestinationSelect,
}: RecommendationListProps) {
if (!recommendations.length) {
return (
<div className="rounded-[1.5rem] border border-neutral-200 bg-white/60 p-10 text-center">
<p className="font-medium">
No recommendations yet.
</p>

    <p className="mt-2 text-sm text-neutral-400">
      Try another post or change your prompt.
    </p>
  </div>
);

}

return (
<div className="space-y-3">
{recommendations.map(
(recommendation, index) => (
<RecommendationCard
key={recommendation.id}
recommendation={recommendation}
rank={index + 1}
colors={colors}
onDestinationSelect={(destination) =>
onDestinationSelect?.(
destination,
recommendation
)
}
/>
)
)}
</div>
);
}