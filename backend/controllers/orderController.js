import orderModel from '../models/orderModels.js';
import userModel from '../models/userModel.js';
import productModel from '../models/productModel.js'; // Import the product model to update stock
import razorpay from 'razorpay';

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Placing Order using COD Method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
            status: "Order Placed"
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Reduce stock for each ordered item
        if (items && items.length > 0) {
            for (const item of items) {
                // Assuming each item has a productId and quantity
                await productModel.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } });
            }
        }

        // Clear user's cart
        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        res.json({ success: true, message: "Order Placed Successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Initialize Razorpay Order
const placeOrderRazorpay = async (req, res) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: amount * 100,  // Amount in paise
            currency: "INR",
            receipt: Date.now().toString()
        };
        
        const order = await razorpayInstance.orders.create(options);
        res.json({ success: true, order });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const verifyRazorpay = async (req, res) => {
    try {
        const { userId, razorpay_order_id, items, amount, address } = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status === 'paid') {
            // Create order only after payment is verified
            const orderData = {
                userId,
                items,
                address,
                amount,
                paymentMethod: "Razorpay",
                payment: true,
                date: Date.now(),
                status: "Order Placed"
            };

            const newOrder = new orderModel(orderData);
            await newOrder.save();

            // Reduce stock for each ordered item
            if (items && items.length > 0) {
                for (const item of items) {
                    await productModel.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } });
                }
            }

            // Clear user's cart
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            
            res.json({ success: true, message: "Payment Successful" });
        } else {
            res.json({ success: false, message: "Payment Failed" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders }); 
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId }).sort({ _id: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status, trackingId, courier } = req.body;

        await orderModel.findByIdAndUpdate(orderId, {
            status,
            ...(trackingId && { trackingId }),
            ...(courier && { courier })
        });

        res.json({ success: true, message: 'Order updated successfully' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


export { placeOrder, verifyRazorpay, placeOrderRazorpay, allOrders, userOrders, updateOrderStatus };
