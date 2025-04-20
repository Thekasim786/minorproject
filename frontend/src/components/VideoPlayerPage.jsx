// VideoPlayerPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

const VideoPlayerPage = () => {
  const { id } = useParams();  // Video ID from URL
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/videos/${id}`);
        setVideo(res.data);
      } catch (err) {
        console.error('Failed to fetch video:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh', pb: 6 }}>
      <Container maxWidth="xl" sx={{ pt: 2 }}>
        <Box sx={{ position: 'relative', width: '100%', paddingTop: '56.25%', backgroundColor: '#000', mb: 2 }}>
          <video
            controls
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            src={`http://localhost:5000/api/videos/stream/${video.filename}`}
          />
        </Box>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          {video.title}
        </Typography>
      </Container>
    </Box>
  );
};

export default VideoPlayerPage;
