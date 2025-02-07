import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

const ProductReviews = ({ productId }) => {
  const { backendUrl } = useContext(ShopContext);
  const [reviews, setReviews] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/review/${productId}`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => console.error(err));
  }, [productId, backendUrl, refreshTrigger]);

  const handleReviewSubmitted = () => {
    // Trigger a refresh of the reviews list
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Customer Reviews</h2>
      <ReviewForm productId={productId} onReviewSubmitted={handleReviewSubmitted} />
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default ProductReviews;
