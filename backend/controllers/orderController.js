import orderModel from '../models/orderModels.js';
import userModel from '../models/userModel.js';

// Placing Order using  COD Method

const placeOrder  = async (req, res) => {
    try {
        const { userId , items , amount , address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            PaymentMethod:"COD",
            payment:false,
            date:Date.now(),
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId,{cartData:{}});
        res.json({success:true, message:"Order Placed Successfully"})


    } catch (error) {
        console.log(error.message);
    }
}

// Placing Order using Ccavenue Method

const placeOrderCcavenue = async (req, res) => {

}

// Placing Order using  Razorpay Method

const placeOrderRazorpay = async (req, res) => {

}

//All Orders data for admin panel

const allOrders = async (req, res) => {

}

//All Orders data for frontend

const  userOrders = async (req, res) => {

}

//update order status

const updateOrderStatus = async (req, res) => {
    
}
export {placeOrder, placeOrderCcavenue, placeOrderRazorpay, allOrders, userOrders, updateOrderStatus}