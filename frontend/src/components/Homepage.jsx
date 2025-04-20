// HomePage.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
} from '@mui/material';
import VideoCard from './VideoCard'; // Import VideoCard component

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/videos');
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f9f9f9',
        pt: 4,
        pb: 6,
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 4,
            fontWeight: 'bold',
            color: '#212121',
          }}
        >
          Recommended Videos
        </Typography>

        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50vh',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {videos.map((video) => (
              <Grid item key={video._id} xs={12} sm={6} md={4} lg={3}>
                <VideoCard video={video} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default HomePage;
