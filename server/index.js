import paymentRoutes from './routes/paymentRoutes.js';
app.use('/api/payment', paymentRoutes);
import orderRoutes from './routes/orderRoutes.js';
app.use('/api/orders', orderRoutes);
import cartRoutes from './routes/cartRoutes.js';
app.use('/api/cart', cartRoutes);
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());



import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

app.get('/', (req, res) => {
  res.send('API is running...');
});


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('MongoDB connected');
  });
}).catch((err) => {
  console.error('MongoDB connection error:', err.message);
});
