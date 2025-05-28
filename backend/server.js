const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const pool = require("./config/db");
const path = require("path");
// const authRoutes = require("./src/routes/authRoutes");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

const allowedOrigins = [
  "http://localhost:3000", // frontend
  "http://localhost:3001", // admin panel
  "http://localhost:5173", // (if you use Vite or other dev server)
  "https://effortless-smakager-24ba14.netlify.app/", // production frontend URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Middleware
// app.use(cors()); // allow all origins (not for production)
// app.use(cors({
//   origin: "http://localhost:3000", // Set this to your frontend URL
//   credentials: true, // Allow sending cookies or authentication headers
// }));
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test Database Connection
pool.getConnection()
  .then((conn) => {
    console.log("Connected to MySQL Database");
    conn.release();
  })
  .catch((err) => {
    console.error("Database Connection Failed:", err.message);
  });

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to Djewno API");
});

// Define Routes (To Be Implemented)
app.use("/api/products", require("./src/routes/productRoutes"));
app.use("/api/categories", require("./src/routes/categoryRoutes"));
app.use("/api/subcategories", require("./src/routes/subcategoryRoutes"));
app.use("/api/brands", require("./src/routes/brandRoutes"));
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/address", require("./src/routes/addressRoutes"));
// app.use("/api/products", require("./src/routes/searchRoutes"))
app.use("/api/reviews", require("./src/routes/reviewRoutes"));
app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api/orders", require("./src/routes/orderRoutes"));


// Start Server
// const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
