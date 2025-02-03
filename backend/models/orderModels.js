import mongoose from'mongoose';

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true, default: [] },  // Ensure default empty array
    address: { type: Object, required: true, default: {} },  // Ensure default empty object
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, default: false },
    status: { type: String, default: "Pending" },  // Add default status
    date: { type: Date, default: Date.now }  // Ensure default date
});


const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);
export default orderModel;