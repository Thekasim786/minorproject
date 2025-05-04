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
import NavbarLogout from './NavbarLogout';
import Navbar from './Navbar';

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('http://localhost:5500/api/videos');
        if (!res.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError(err.message || 'Failed to load videos');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);
  

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h6" color="error" gutterBottom>
          {error}
        </Typography>
        <Typography variant="body1">
          Please try again later or contact support.
        </Typography>
      </Box>
    );
  }

  return (
    <>
    <Navbar />
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
        ) : videos.length > 0 ? (
          <Grid container spacing={3}>
            {videos.map((video) => (
              <Grid item key={video._id} xs={12} sm={6} md={4} lg={3}>
                <VideoCard video={video} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50vh',
            }}
          >
            <Typography variant="h6">No videos available</Typography>
          </Box>
        )}
      </Container>
    </Box>
    </>
  );
};

export default HomePage;