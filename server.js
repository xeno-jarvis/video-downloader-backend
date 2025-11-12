import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors({
  origin: "https://xeno-jarvis.github.io",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.post("/download", (req, res) => {
  // example test response
  res.json({ success: true, message: "Backend connected!" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
