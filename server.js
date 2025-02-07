const express = require("express");
const stripe = require("stripe")(
  "sk_test_51Qprp7ISID8BNbLeOt7ghMQLYirRYucA2l5FAyq2qwAKIbYrIaOLACgB6eWfiHtRfhq6l6mpilQzk26LgNIBDzwD00pEy1doXd"
); // Replace with your Stripe secret key
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// User schema and model
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  otp: String, // Add OTP field
  otpExpires: Date, // Add OTP expiration field
});

const User = mongoose.model("User", userSchema);

// Order schema and model
const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      name: String,
      description: String,
      price: Number,
      image: String,
    },
  ],
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.freesmtpservers.com",
  port: 25,
  secure: false, // true for 465, false for other ports
  auth: {
    user: null, // No authentication
    pass: null, // No authentication
  },
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
});

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the E-Commerce API");
});

// Register route
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      userId: newUser._id,
    });
  } catch (err) {
    res.status(500).json({ message: "Error saving user data", err });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (user) {
      const otp = generateOTP();
      user.otp = otp;
      user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
      await user.save();

      // Send OTP email
      const mailOptions = {
        from: "genai@admin.com", // Replace with your actual email
        to: user.email,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending OTP email:", error);
          return res
            .status(500)
            .json({ message: "Error sending OTP email", error });
        } else {
          console.log("OTP email sent:", info.response);
          return res.status(200).json({ message: "OTP sent to email" });
        }
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error logging in", err });
  }
});

// Create order route
app.post("/api/orders", async (req, res) => {
  const { userId, products, totalAmount } = req.body;

  try {
    // Generate unique order number
    const orderNumber = "ORD" + Date.now();

    const newOrder = new Order({
      orderNumber,
      userId,
      products,
      totalAmount,
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order created successfully",
      orderNumber: orderNumber,
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating order", err });
  }
});

// Get user orders route
app.get("/api/orders/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", err });
  }
});

// Create payment intent route
app.post("/api/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amount in cents
      currency: "usd",
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify OTP route
app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email, otp });
    if (user && user.otpExpires > Date.now()) {
      user.otp = null;
      user.otpExpires = null;
      await user.save();
      res.status(200).json({ userId: user._id });
    } else {
      res.status(400).json({ message: "Invalid or expired OTP" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error verifying OTP", err });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
