import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  IconButton,
  Divider,
  Paper,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

const VideoPlayerPage = () => {
  const { id } = useParams();  // Video ID from URL
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoError, setVideoError] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`http://localhost:5500/api/videos/${id}`);
        setVideo(res.data);
      } catch (err) {
        console.error('Failed to fetch video:', err);
        setError(err.response?.data?.error || 'Failed to fetch video details');
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  const handleBack = () => {
    navigate('/');
  };

  const handleVideoError = (e) => {
    console.error('Video error:', e);
    setVideoError(true);
  };

  const handleVideoPlay = () => {
    console.log('Video playing');
    setVideoError(false);
  };

  // Retry loading the video by resetting the source
  const retryVideoLoad = () => {
    if (videoRef.current) {
      const videoElement = videoRef.current;
      videoElement.src = `http://localhost:5500/api/stream/${id}?t=${new Date().getTime()}`;
      videoElement.load();
      setVideoError(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" flexDirection="column">
        <Typography variant="h6" color="error" gutterBottom>
          {error}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please try again later or contact support.
        </Typography>
        <IconButton 
          color="primary" 
          onClick={handleBack}
          sx={{ mt: 2 }}
        >
          <ArrowBackIcon /> Back to Home
        </IconButton>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh', pb: 6 }}>
      <Container maxWidth="xl" sx={{ pt: 2 }}>
        <IconButton 
          color="primary" 
          onClick={handleBack}
          sx={{ mb: 2 }}
        >
          <ArrowBackIcon /> Back
        </IconButton>
        
        <Paper elevation={3} sx={{ borderRadius: '8px', overflow: 'hidden', mb: 3 }}>
          {videoError && (
            <Alert 
              severity="error" 
              sx={{ mb: 0 }}
              action={
                <IconButton color="inherit" size="small" onClick={retryVideoLoad}>
                  Retry
                </IconButton>
              }
            >
              Failed to load video. Please check that the video file exists on the server.
            </Alert>
          )}
          <Box sx={{ position: 'relative', width: '100%', paddingTop: '56.25%', backgroundColor: '#000' }}>
            <video
              ref={videoRef}
              controls
              autoPlay
              onError={handleVideoError}
              onPlay={handleVideoPlay}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              src={`http://localhost:5500/api/stream/${id}`}
              poster={video.thumbnail || null}
            />
          </Box>
        </Paper>
        
        <Typography variant="h5" fontWeight="bold" mb={2}>
          {video.title}
        </Typography>
        
        <Divider sx={{ mb: 2 }} />
        
        {video.description && (
          <Typography variant="body1" color="text.secondary" paragraph>
            {video.description}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default VideoPlayerPage;