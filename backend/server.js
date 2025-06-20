const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");

// Load environment variables from .env file
dotenv.config();

// Import your DB connection function
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware for Cross-Origin requests from your React app
const allowedOrigins = [
  "http://localhost:3000",
  "https://quickpost-tkun.onrender.com"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies (form submissions)
app.use(express.urlencoded({ extended: true }));

// HTTP request logger
app.use(morgan("dev"));

// Check required environment variables
if (!process.env.MONGO_URL || !process.env.SESSION_SECRET) {
  console.error(
    "❌ Missing required environment variables (MONGO_URL or SESSION_SECRET)"
  );
  process.exit(1);
}

// Session configuration with MongoDB store
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      ttl: 14 * 24 * 60 * 60, // 14 days expiration
    }),
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days in milliseconds
      secure: false, // Set to true if using HTTPS in production
    },
  })
);

// Import Routes
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

// Use Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

// Define PORT from env or default
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(
    `✅ Server running in ${process.env.DEV_MODE || "development"} mode on port ${PORT}`
      .bgCyan.white
  );
});
