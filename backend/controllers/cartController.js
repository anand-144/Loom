// add Product to user Cart

import userModel from "../models/userModel.js"

const addToCart = async (req, res) => {
   try{

    const {userId, itemId, size} = req.body

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    if (cartData[itemId]) {
        if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
            
        }
        else{
            cartData[itemId][size] = 1;
        }
    }else{
        cartData[itemId] = {}
        cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, {cartData})
    res.json({success : true, message : "Item Added to Cart"})

   }catch (error){
    console.error(error);
    res.json({success : false, message : error.message})
   } 
}


// Update Product to user Cart

const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;
        
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        if (!cartData[itemId]) {
            return res.json({ success: false, message: "Item not found in cart" });
        }

        if (quantity > 0) {
            cartData[itemId][size] = quantity;
        } else {
            delete cartData[itemId][size];
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Cart Updated", cartData });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message }); 
    }
};



// get Product to user Cart

const getUserCart = async (req, res) => {

    try {

        const  {userId } = req.body

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        res.json({ success : true, cartData })
        
    } catch (error) {
        console.error(error);
        res.json({success : false, message : error.message}) 
    }

}

export { addToCart, updateCart, getUserCart } 