import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

export const addProduct = async (req, res) => {
  try {
    const { name, subDescription, description, material, care, price, category, subCategory, sizes, bestseller } = req.body;

    if (!name || !subDescription || !description || !material || !care || !price || !category || !subCategory) {
      return res.status(400).json({ success: false, message: "Required fields are missing" });
    }
    
    console.log("Uploaded files:", req.files);

    const images = ['image1', 'image2', 'image3', 'image4' ,'image5']
      .map((key) => req.files[key]?.[0])
      .filter((file) => file?.path);

    if (images.length === 0) {
      return res.status(400).json({ success: false, message: "No image files uploaded" });
    }

    let imagesUrl = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, { resource_type: 'image' });
        return result.secure_url;
      })
    );

    let parsedSizes = [];
    try {
      parsedSizes = Array.isArray(sizes) ? sizes : JSON.parse(sizes || "[]");
    } catch (error) {
      return res.status(400).json({ success: false, message: "Invalid sizes format" });
    }

    const productData = {
      name,
      description,
      subDescription,
      material,
      care,
      price: Number(price),
      category,
      subCategory,
      bestseller: bestseller === "true" || bestseller === true,
      sizes: parsedSizes,
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product added successfully!",
      product,
    });
  } catch (error) {
    console.error("Error in addProduct:", error);
    if (!res.headersSent) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

// Function for updating a product
export const updateProduct = async (req, res) => {
  try {
    const { id, name, subDescription, description, material, care, price, category, subCategory, bestseller, sizes } = req.body;

    if (!id || !name || !subDescription || !description || !material || !care || !price || !category || !subCategory) {
      return res.status(400).json({ success: false, message: "Required fields are missing" });
    }

    let parsedSizes = [];
    try {
      parsedSizes = Array.isArray(sizes) ? sizes : JSON.parse(sizes || "[]");
    } catch (error) {
      return res.status(400).json({ success: false, message: "Invalid sizes format" });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        name,
        subDescription,
        description,
        material,
        care,
        price: Number(price),
        category,
        subCategory,
        bestseller: bestseller === "true" || bestseller === true,
        sizes: parsedSizes,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error in updateProduct:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Function for listing products
export const listProduct = async (req, res) => {
  try {
      const products = await productModel.find({});
      res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for removing a product
export const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for fetching a single product
export const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default { listProduct, addProduct, removeProduct, singleProduct, updateProduct };
