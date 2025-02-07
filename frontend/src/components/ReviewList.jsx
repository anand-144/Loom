import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewList = ({ reviews }) => {
  return (
    <div className="space-y-6">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="p-4 bg-gray-50 rounded shadow">
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-xl ${
                    i < review.rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            {/* Display reviewer's name */}
            <p className="text-gray-900 font-semibold">{review.name}</p>
            <p className="text-gray-700">{review.text}</p>
            <p className="text-xs text-gray-500 mt-2">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">
          No reviews yet. Be the first to review this product!
        </p>
      )}
    </div>
  );
};

export default ReviewList;
