// Function for adding a product
export const addProduct = async (req, res) => {
    res.status(200).json({ message: "Add Product API working" });
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