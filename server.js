const express = require("express");
const cors = require("cors");
const ytdl = require("@distube/ytdl-core");

const app = express();
app.use(express.json());

app.use(cors({
  origin: "https://xeno-jarvis.github.io",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.get("/", (req, res) => {
  res.send("YouTube Video Downloader Backend is running!");
});

app.post("/download", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || !ytdl.validateURL(url)) {
      return res.status(400).json({ success: false, message: "Invalid YouTube URL." });
    }

    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title;
    const format = ytdl.chooseFormat(info.formats, { quality: "highest" });

    res.json({
      success: true,
      title,
      downloadUrl: format.url
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ success: false, message: "Failed to process video." });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

