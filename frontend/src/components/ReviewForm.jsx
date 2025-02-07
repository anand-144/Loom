import React, { useState, useContext } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { ShopContext } from "../context/ShopContext";

const ReviewForm = ({ productId, onReviewSubmitted }) => {
  const { backendUrl } = useContext(ShopContext);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get user from localStorage and properly check authentication
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token && !!user;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !reviewText.trim() || !isLoggedIn) return;

    setIsSubmitting(true);
    try {
      await axios.post(
        `${backendUrl}/api/review`,
        {
          productId,
          rating,
          text: reviewText.trim(),
          name: user.name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onReviewSubmitted();
      setRating(0);
      setReviewText("");
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-white p-4 rounded shadow mb-8 text-center">
        <p className="text-gray-600 mb-2">Please log in to write a review</p>
        <a 
          href="/login" 
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Log in here
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-8">
      <h3 className="text-xl font-semibold mb-2 text-center">Write a Review</h3>
      <div className="flex justify-center items-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`cursor-pointer text-2xl ${
              star <= (hover || rating) ? "text-yellow-500" : "text-gray-300"
            }`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          />
        ))}
      </div>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        className="w-full p-2 border rounded mb-4 resize-none"
        placeholder="Share your experience..."
        rows={4}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="mx-auto block w-fit py-2 px-4 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded transition-colors duration-200"
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;