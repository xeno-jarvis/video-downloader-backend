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
    const videoId = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    if (!videoId) {
      return res.status(400).json({ success: false, message: "Invalid YouTube URL." });
    }
    
    // Call RapidAPI YouTube Media Downloader
    const options = {
      method: 'GET',
      url: 'https://youtube-media-downloader.p.rapidapi.com/v2/video/details',
      params: {
        videoId: videoId[1],
        urlAccess: 'normal'
      },
      headers: {
        'x-rapidapi-key': '6ccc670b04msh4e5b51489b71a35p1dada6jsn5043167fb9ab',
        'x-rapidapi-host': 'youtube-media-downloader.p.rapidapi.com'
      }
    };
    
    const response = await axios.request(options);
    const data = response.data;
    
    if (data && data.title) {
      // Get the highest quality video URL
      const videoUrl = data.videos && data.videos.items && data.videos.items[0] && data.videos.items[0].url;
      
      res.json({
        success: true,
        title: data.title,
        downloadUrl: videoUrl || data.url
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
