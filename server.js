import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

// Allow your frontend domain
app.use(cors({
  origin: "https://xeno-jarvis.github.io",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// Simple test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Download route for frontend
app.post("/download", (req, res) => {
  res.json({ success: true, message: "Backend connected!" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
