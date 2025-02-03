import orderModel from '../models/orderModels.js';
import userModel from '../models/userModel.js';
import razorpay from 'razorpay'

// Placing Order using  COD Method

const razorpayInstance = new razorpay({
    key_id :  process.env.RAZORPAY_KEY_ID,
    key_secret  : process.env.RAZORPAY_KEY_SECRET,
})

const placeOrder  = async (req, res) => {
    try {
        const { userId , items , amount , address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
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


// Placing Order using  Razorpay Method

const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const options = {
            amount: amount * 100,  // Amount should be in paise
            currency: "INR",  // Fix: Explicitly set currency to INR
            receipt: newOrder._id.toString()
        };
        
        const order = await razorpayInstance.orders.create(options);
        res.json({ success: true, order });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const  verifyRazorpay = async (req,res) => {
    try {
        const {userId, razorpay_order_id } = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success: true, message: "Payment Successful"})
        } else {
            res.json ({success: false , message: "Payment Failed"})
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });  
    }
}


//All Orders data for admin panel

const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success:true, orders}); 
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//All Orders data for frontend

const  userOrders = async (req, res) => {

    try {
        const  {userId} = req.body;

        const orders = await orderModel.find({userId}).sort({_id:-1});
        res.json({success:true, orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})  
    }

}

//update order status

const updateOrderStatus = async (req, res) => {

    try {
        
        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({success:true,message:'Status Updated'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
    
}
export {placeOrder ,verifyRazorpay , placeOrderRazorpay, allOrders, userOrders, updateOrderStatus}