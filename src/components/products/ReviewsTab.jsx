
"use client";

import { useState } from "react";

const dummyReviews = [
  {
    id: 1,
    name: "Md. Rashedul Islam",
    city: "Dhaka",
    date: "2025-01-15",
    rating: 5,
    title: "Excellent Quality!",
    body: "The wallpaper installation was done professionally. The quality is amazing and it completely transformed our bedroom.",
    helpful: 42,
  },
  {
    id: 2,
    name: "Sarah Rahman",
    city: "Chittagong",
    date: "2024-12-20",
    rating: 5,
    title: "Highly Recommended",
    body: "Best epoxy floor in town! The team was very professional and finished the job on time. Lifetime guarantee is a big plus.",
    helpful: 35,
  },
  {
    id: 3,
    name: "Karim Hossain",
    city: "Sylhet",
    date: "2024-11-10",
    rating: 4,
    title: "Great Service",
    body: "Very happy with the ceiling paper. The design is beautiful and the installation team was very courteous.",
    helpful: 28,
  },
  {
    id: 4,
    name: "Fatima Akter",
    city: "Khulna",
    date: "2024-10-05",
    rating: 5,
    title: "Worth Every Penny",
    body: "Yes, it's a bit pricey but totally worth it! The 3D wallpaper looks stunning in our living room.",
    helpful: 22,
  },
  {
    id: 5,
    name: "Ahmed Ali",
    city: "Rajshahi",
    date: "2024-09-18",
    rating: 4,
    title: "Good Experience",
    body: "Site visit was free and they gave honest advice. The epoxy floor in our kitchen is perfect!",
    helpful: 18,
  },
  {
    id: 6,
    name: "Nusrat Jahan",
    city: "Barisal",
    date: "2024-08-25",
    rating: 5,
    title: "Amazing Work!",
    body: "We got both wallpaper and epoxy floor done. The quality exceeded our expectations. Highly recommend RS Decor!",
    helpful: 31,
  },
];

export default function ReviewsTab() {
  const [sortBy, setSortBy] = useState("recent");
  const [showAll, setShowAll] = useState(false);
  const [helpfulVotes, setHelpfulVotes] = useState({});

  const toggleHelpful = (id) => {
    setHelpfulVotes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const displayedReviews = showAll ? dummyReviews : dummyReviews.slice(0, 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Rating Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl p-6 border border-light-muted sticky top-6">
          <div className="text-center mb-6">
            <div className="text-6xl font-heading font-bold text-primary">4.8</div>
            <div className="text-amber-400 text-2xl my-2">
              {"★".repeat(5)}
            </div>
            <p className="text-dark-muted">Based on 124 reviews</p>
          </div>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((star) => {
              const percentages = { 5: 65, 4: 20, 3: 10, 2: 3, 1: 2 };
              const percent = percentages[star];
              return (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-sm text-dark-muted w-8">{star}★</span>
                  <div className="flex-1 h-2 bg-light-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="text-sm text-dark-muted w-8">{percent}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-heading font-bold text-dark">Customer Reviews</h3>
          <div className="flex gap-2">
            {["recent", "highest", "helpful"].map((sort) => (
              <button
                key={sort}
                onClick={() => setSortBy(sort)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  sortBy === sort
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-dark-muted hover:bg-gray-200"
                }`}
              >
                {sort === "recent" && "Most Recent"}
                {sort === "highest" && "Highest Rated"}
                {sort === "helpful" && "Most Helpful"}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {displayedReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 border border-light-muted"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-dark">{review.name}</p>
                    <p className="text-sm text-dark-muted">
                      {review.city} • {review.date}
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                  Verified Purchase
                </span>
              </div>
              <div className="text-amber-400 mb-2">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
              <h4 className="font-semibold text-dark mb-2">{review.title}</h4>
              <p className="text-dark-muted mb-4">{review.body}</p>
              <button
                onClick={() => toggleHelpful(review.id)}
                className="flex items-center gap-2 text-sm text-dark-muted hover:text-primary transition-colors"
              >
                <span>👍</span>
                <span>Helpful ({review.helpful + (helpfulVotes[review.id] || 0)})</span>
              </button>
            </div>
          ))}
        </div>

        {!showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="w-full mt-6 py-3 rounded-xl border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            Load More Reviews
          </button>
        )}
      </div>
    </div>
  );
}
