import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import reviewRoutes from './routes/reviewRoutes.js';
import discountRouter from './routes/discountRoute.js';
import metricsRouter from './routes/metricsRoute.js';
import paymentBreakdownRouter from './routes/pBdownRoute.js'; // Import the new router

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB and Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// Mount routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/review', reviewRoutes);
app.use('/api/discount', discountRouter);
app.use('/api/metrics', metricsRouter);
app.use('/api/metrics/payment-breakdown', paymentBreakdownRouter); // Now defined

app.get('/', (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => {
  console.log("Server started on PORT: " + port);
});
