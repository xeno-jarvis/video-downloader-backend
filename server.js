const express = require("express");
const cors = require("cors");
const axios = require("axios");

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

    if (!url) {
      return res.status(400).json({ success: false, message: "Invalid YouTube URL." });
    }

    // Extract video ID from URL
    const videoId = url.match(/(?:v=|\/|youtu\.be\/)([0-9A-Za-z_-]{11})/);
    if (!videoId) {
      return res.status(400).json({ success: false, message: "Invalid YouTube URL." });
    }

    // Call RapidAPI YouTube MP3 Audio Video Downloader
    const options = {
      method: 'GET',
      url: `https://youtube-mp3-audio-video-downloader.p.rapidapi.com/dl`,
      params: {
        id: videoId[1]
      },
      headers: {
        'x-rapidapi-key': '6ccc670b04msh4e5b51489b71a35p1dada6jsn5043167fb9ab',
        'x-rapidapi-host': 'youtube-mp3-audio-video-downloader.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    const data = response.data;

    if (data && data.title) {
      // Get the download link
      const downloadUrl = data.link || null;
      
      res.json({
        success: true,
        title: data.title,
        downloadUrl: downloadUrl
      });
    } else {
      res.status(500).json({ success: false, message: "Failed to process video." });
    }
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, message: "Failed to process video." });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
