require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Video = require('./models/Video');
var cors = require('cors')

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

var corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
}
app.use(cors(corsOptions))

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// JSON body parser
app.use(express.json());

// Basic health check
app.get('/', (req, res) => {
  res.send('Video Stream Server is running!');
});

// Get all videos
app.get('/api/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

// IMPORTANT: Define specific routes before parameterized routes
// HTTP stream endpoint (MUST COME BEFORE THE GENERIC VIDEO BY ID ROUTE)
app.get('/api/stream/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const filePath = path.join(__dirname, 'video', video.filename);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`File does not exist: ${filePath}`);
      return res.status(404).json({ error: 'Video file not found' });
    }

    const stat = fs.statSync(filePath);
    
    // Handle range requests (important for seeking in video)
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
      const chunksize = (end - start) + 1;
      
      // Log streaming information for debugging
      console.log(`Streaming ${video.filename} with range: ${start}-${end}/${stat.size}`);
      
      const fileStream = fs.createReadStream(filePath, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      });
      fileStream.pipe(res);
    } else {
      // No range requested, send the whole file
      // Log streaming information for debugging
      console.log(`Streaming entire file: ${video.filename}, size: ${stat.size}`);
      
      res.writeHead(200, {
        'Content-Length': stat.size,
        'Content-Type': 'video/mp4',
        'Accept-Ranges': 'bytes'
      });
      fs.createReadStream(filePath).pipe(res);
    }
  } catch (err) {
    console.error('Stream error:', err);
    res.status(500).json({ error: 'Failed to stream video' });
  }
});

// Get a single video by ID (this now comes AFTER the streaming route)
app.get('/api/videos/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.json(video);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch video' });
  }
});

// Add a new video
app.post('/api/videos', async (req, res) => {
  const { title, description, filename } = req.body;
  if (!title || !filename) {
    return res.status(400).json({ error: 'Title and filename are required' });
  }
  try {
    const newVideo = new Video({ title, description, filename });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save video' });
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});