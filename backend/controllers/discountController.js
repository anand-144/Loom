// backend/controllers/discountController.js
import Discount from "../models/discountModel.js";

// GET current discount settings
export const getDiscount = async (req, res) => {
  try {
    let discount = await Discount.findOne();
    if (!discount) {
      // If no discount document exists, create a default one
      discount = new Discount({ active: false, discountPercentage: 0 });
      await discount.save();
    }
    res.status(200).json({ success: true, discount });
  } catch (error) {
    console.error("Error fetching discount:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT update discount settings (admin-only)
export const updateDiscount = async (req, res) => {
  try {
    const { active, discountPercentage, startDate, endDate } = req.body;
    let discount = await Discount.findOne();
    if (!discount) {
      discount = new Discount({ active, discountPercentage, startDate, endDate });
    } else {
      discount.active = active;
      discount.discountPercentage = discountPercentage;
      discount.startDate = startDate;
      discount.endDate = endDate;
    }
    await discount.save();
    res.status(200).json({ success: true, discount });
  } catch (error) {
    console.error("Error updating discount:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
