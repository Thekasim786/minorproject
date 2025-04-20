require('dotenv').config();
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Video = require('./models/Video');
var cors = require('cors')

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 5000;
const CHUNK_SIZE = 64 * 1024; // 64KB
const CHUNK_INTERVAL = 100; // ms



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
  res.send('WebSocket Video Stream Server is running!');
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

// WebSocket streaming
wss.on('connection', async (ws, req) => {
  const urlParams = new URLSearchParams(req.url.replace('/?', ''));
  const videoId = urlParams.get('id');

  try {
    const video = await Video.findById(videoId);
    if (!video) return ws.close();

    const filePath = path.join(__dirname, 'video', video.filename);
    const stream = fs.createReadStream(filePath, { highWaterMark: CHUNK_SIZE });

    stream.on('data', (chunk) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(chunk);
      }
      stream.pause();
      setTimeout(() => stream.resume(), CHUNK_INTERVAL);
    });

    stream.on('end', () => ws.close());
    stream.on('error', (err) => {
      console.error('Stream error:', err);
      ws.close();
    });
  } catch (err) {
    console.error('WebSocket error:', err);
    ws.close();
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
