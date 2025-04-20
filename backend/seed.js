require('dotenv').config();
const mongoose = require('mongoose');
const Video = require('./models/Video');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('✅ MongoDB connected');

  const videos = [
    {
      title: 'Sample Video 1',
      description: 'A demo streaming file.',
      filename: 'video1.mp4'
    },
    {
      title: 'Video 2',
      description: 'Another streaming demo.',
      filename: 'video2.mp4'
    },
    {
      title: 'Video 3',
      description: 'Another streaming demo.',
      filename: 'video3.mp4'
    },
    {
      title: 'Video 4',
      description: 'Another streaming demo.',
      filename: 'video4.mp4'
    }
  ];

  const insertedVideos = await Video.insertMany(videos);
  console.log('✅ Videos seeded with IDs:');
  insertedVideos.forEach(video => {
    console.log(`- ${video.title}: ${video._id}`);
  });

  mongoose.disconnect();
});
