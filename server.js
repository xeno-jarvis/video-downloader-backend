import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/download", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "No URL provided" });

  // Placeholder response — replace later with actual logic
  const fakeDownloadUrl = `https://example.com/download?video=${encodeURIComponent(url)}`;

  res.json({ downloadUrl: fakeDownloadUrl });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
