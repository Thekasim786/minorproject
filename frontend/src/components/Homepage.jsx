import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
} from '@mui/material';
import VideoCard from './VideoCard'; // Import VideoCard component
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom'; // Import useLocation to get query params

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract search query from URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search')?.toLowerCase() || ''; // Default to empty string if no query

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('http://localhost:5500/api/videos');
        if (!res.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await res.json();
        setVideos(data);
        filterVideos(data, searchQuery); // Filter videos based on search query
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError(err.message || 'Failed to load videos');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [searchQuery]); // Fetch and filter videos whenever searchQuery changes

  const filterVideos = (videos, query) => {
    if (query) {
      const filtered = videos.filter(
        (video) =>
          video.title.toLowerCase().includes(query) || // Match by title
          video.description.toLowerCase().includes(query) // Match by description
      );
      setFilteredVideos(filtered);
    } else {
      setFilteredVideos(videos); // Show all videos if no query
    }
  };

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
          ) : filteredVideos.length > 0 ? (
            <Grid container spacing={3}>
              {filteredVideos.map((video) => (
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
