import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

// Get all reviews for a specific product
router.get("/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get aggregated rating data for a specific product
router.get("/aggregated/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const result = await Review.aggregate([
      { $match: { productId } },
      {
        $group: {
          _id: "$productId",
          averageRating: { $avg: "$rating" },
          reviewCount: { $sum: 1 }
        }
      }
    ]);

    // If no reviews, return default values
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.json({ averageRating: 0, reviewCount: 0 });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Post a new review
router.post("/", async (req, res) => {
  const { productId, rating, text, name } = req.body;
  try {
    const newReview = new Review({ productId, rating, text, name });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
