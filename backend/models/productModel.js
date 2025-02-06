import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    subDescription: { type: String, required: true },
    material: { type: String, required: true },
    care: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: [String], required: true }, // Array of image URLs
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: [String], required: true }, // Use [String] or [mongoose.Schema.Types.Mixed] if needed
    bestseller: { type: Boolean, default: false },
    date: { type: Number, required: true },
}, { timestamps: true });

const productModel = mongoose.models.Product || mongoose.model("Product", productSchema);

export default productModel;
