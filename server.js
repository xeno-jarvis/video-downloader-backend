const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'https://xeno-jarvis.github.io',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// Health check
app.get('/', (req, res) => {
    res.json({ status: 'YouTube Downloader Backend (yt-dlp) is running!' });
});

// Download endpoint
app.post('/download', async (req, res) => {
    const { url } = req.body;

    if (!url || !url.includes('youtube.com') && !url.includes('youtu.be')) {
        return res.status(400).json({ 
            success: false, 
            message: 'Invalid YouTube URL' 
        });
    }

    try {
        // Use yt-dlp to get video info and download URL
        const command = `python3 -m yt_dlp -f "best[ext=mp4]" --get-title --get-url "${url}"`;
        
        exec(command, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
            if (error) {
                console.error('yt-dlp error:', error);
                return res.status(500).json({ 
                    success: false, 
                    message: 'Failed to process video. Please try again.' 
                });
            }

            const lines = stdout.trim().split('\n');
            if (lines.length >= 2) {
                const title = lines[0];
                const downloadUrl = lines[1];

                res.json({
                    success: true,
                    title: title,
                    downloadUrl: downloadUrl
                });
            } else {
                res.status(500).json({ 
                    success: false, 
                    message: 'Could not extract video information' 
                });
            }
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error occurred' 
        });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`✅ yt-dlp backend ready`);
});

