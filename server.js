// Use CommonJS syntax so Render runs it correctly
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

// Enable CORS for your frontend domain
app.use(cors({
  origin: "https://xeno-jarvis.github.io",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Test route for frontend
app.post("/download", (req, res) => {
  res.json({ success: true, message: "Backend connected!" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
