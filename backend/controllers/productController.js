export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category || !subCategory || !sizes || !bestseller) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Validate files
    const { image1, image2, image3, image4 } = req.files;
    if (!image1 || !image2 || !image3 || !image4) {
      return res.status(400).json({ success: false, message: "All images are required" });
    }

    console.log("Data received:", { name, description, price, category, subCategory, sizes, bestseller });
    console.log("Images received:", { image1, image2, image3, image4 });

    res.status(200).json({ success: true, message: "Product added successfully!" });
  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


  
  // Function for listing products
  export const listProduct = async (req, res) => {
    res.status(200).json({ message: "List Product API working" });
  };
  
  // Function for removing a product
  export const removeProduct = async (req, res) => {
    res.status(200).json({ message: "Remove Product API working" });
  };
  
  // Function for fetching a single product
  export const singleProduct = async (req, res) => {
    res.status(200).json({ message: "Single Product API working" });
  };
  


export default { listProduct, addProduct, removeProduct, singleProduct };