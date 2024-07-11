require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const Stripe = require('stripe');

// Import routes
const ownerRoutes = require('./routes/ownerRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Connect Database
connectDB();

// Middleware
app.use(cors({
  origin: 'https://frontend-marketplace.netlify.app',
}));
app.use(bodyParser.json());

// Routes
app.use('/api/equipment', equipmentRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/owners', ownerRoutes);

// Stripe Payment Intent Route
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body; // The amount should be in cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = app;
