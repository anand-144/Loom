// backend/models/discountModel.js
import mongoose from "mongoose";

const discountSchema = new mongoose.Schema(
  {
    active: {
      type: Boolean,
      default: false,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    // Optionally add startDate and endDate for seasonal control
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Discount = mongoose.models.Discount || mongoose.model("Discount", discountSchema);
export default Discount;
