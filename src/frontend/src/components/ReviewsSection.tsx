import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send, Star } from "lucide-react";
import { useState } from "react";
import type { Review } from "../backend.d";
import { useGetAllReviews, useSubmitReview } from "../hooks/useQueries";

const FALLBACK_REVIEWS: Review[] = [
  {
    id: 1n,
    reviewerName: "Rajesh Kumar",
    serviceName: "Electrician & Motor Repair",
    comment:
      "Excellent service! The electrician fixed our motor within an hour. Very professional and honest pricing.",
    rating: 5n,
    timestamp: 0n,
  },
  {
    id: 2n,
    reviewerName: "Priya Sharma",
    serviceName: "Home Cleaners",
    comment:
      "The team did an amazing job with deep cleaning. Our house looks spotless. Highly recommended!",
    rating: 5n,
    timestamp: 0n,
  },
  {
    id: 3n,
    reviewerName: "Amit Singh",
    serviceName: "Plumber",
    comment:
      "Quick response, fixed the pipe leak same day. Will definitely book again.",
    rating: 4n,
    timestamp: 0n,
  },
  {
    id: 4n,
    reviewerName: "Sunita Devi",
    serviceName: "Painter",
    comment:
      "Beautiful work on our entire home. The painter was skilled, clean, and very courteous.",
    rating: 5n,
    timestamp: 0n,
  },
  {
    id: 5n,
    reviewerName: "Vikram Rao",
    serviceName: "AC Service",
    comment:
      "AC was not cooling properly. After service, it works like new. Good technician.",
    rating: 4n,
    timestamp: 0n,
  },
];

const STAR_INDICES = [0, 1, 2, 3, 4];
const STAR_VALUES = [1, 2, 3, 4, 5];

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={STAR_INDICES[i]}
          size={16}
          className={i < rating ? "star-filled fill-current" : "star-empty"}
        />
      ))}
    </div>
  );
}

function InteractiveStars({
  value,
  onChange,
}: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {STAR_VALUES.map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          className="p-0.5 focus:outline-none"
          data-ocid="reviews.radio"
        >
          <Star
            size={24}
            className={
              i <= (hovered || value)
                ? "star-filled fill-current"
                : "star-empty"
            }
          />
        </button>
      ))}
    </div>
  );
}

export function ReviewsSection() {
  const { data: reviews, isLoading } = useGetAllReviews();
  const submitReview = useSubmitReview();

  const [rName, setRName] = useState("");
  const [rRating, setRRating] = useState(5);
  const [rComment, setRComment] = useState("");
  const [rService, setRService] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const displayReviews =
    reviews && reviews.length > 0 ? reviews : FALLBACK_REVIEWS;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitReview.mutateAsync({
      reviewerName: rName,
      rating: BigInt(rRating),
      comment: rComment,
      serviceName: rService,
    });
    setSubmitted(true);
    setRName("");
    setRRating(5);
    setRComment("");
    setRService("");
  };

  return (
    <section
      className="py-8 px-4 max-w-4xl mx-auto"
      data-ocid="reviews.section"
    >
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl font-bold text-midnight mb-2">
          Customer Reviews
        </h2>
        <p className="text-gray-500">What our customers say about us</p>
        <div className="w-16 h-1 bg-gold mx-auto mt-3 rounded-full" />
      </div>

      {isLoading ? (
        <div
          className="flex justify-center py-12"
          data-ocid="reviews.loading_state"
        >
          <Loader2 className="animate-spin text-gold" size={32} />
        </div>
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10"
          data-ocid="reviews.list"
        >
          {displayReviews.map((review, i) => (
            <div
              key={String(review.id)}
              className="bg-white rounded-2xl p-5 shadow-card border border-gray-100"
              data-ocid={`reviews.item.${i + 1}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-midnight">
                    {review.reviewerName}
                  </p>
                  <p className="text-xs text-gold font-medium">
                    {review.serviceName}
                  </p>
                </div>
                <StarRating rating={Number(review.rating)} />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="bg-midnight rounded-2xl p-6 shadow-gold">
        <h3 className="font-display text-gold font-bold text-xl mb-5">
          Share Your Experience
        </h3>
        {submitted ? (
          <div className="text-center py-4" data-ocid="reviews.success_state">
            <p className="text-gold font-semibold text-lg">
              Thank you for your review! 🌟
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="text-white/60 text-sm mt-2 underline"
            >
              Add another review
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-white/80 text-sm">Your Name</Label>
                <Input
                  value={rName}
                  onChange={(e) => setRName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="bg-midnight-light border-white/20 text-white placeholder:text-white/30 focus:border-gold"
                  data-ocid="reviews.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-white/80 text-sm">Service Name</Label>
                <Input
                  value={rService}
                  onChange={(e) => setRService(e.target.value)}
                  placeholder="e.g. Plumber"
                  required
                  className="bg-midnight-light border-white/20 text-white placeholder:text-white/30 focus:border-gold"
                  data-ocid="reviews.input"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-white/80 text-sm">Rating</Label>
              <InteractiveStars value={rRating} onChange={setRRating} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-white/80 text-sm">Your Review</Label>
              <Textarea
                value={rComment}
                onChange={(e) => setRComment(e.target.value)}
                placeholder="Share your experience..."
                required
                rows={3}
                className="bg-midnight-light border-white/20 text-white placeholder:text-white/30 focus:border-gold resize-none"
                data-ocid="reviews.textarea"
              />
            </div>
            <button
              type="submit"
              disabled={submitReview.isPending}
              className="btn-gold px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 disabled:opacity-70"
              data-ocid="reviews.submit_button"
            >
              {submitReview.isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
              Submit Review
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
