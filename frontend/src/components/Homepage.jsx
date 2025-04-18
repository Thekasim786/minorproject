import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent,
  CircularProgress
} from '@mui/material';
const dummyVideos = [
    {
      id: '1',
      title: 'How to Build a React App in 10 Minutes',
      thumbnail: '/api/placeholder/320/180',
    },
    {
      id: '2',
      title: 'The Best Coding Practices for 2025',
      thumbnail: '/api/placeholder/320/180',
    },
    {
      id: '3',
      title: 'Learn Material UI Complete Course',
      thumbnail: '/api/placeholder/320/180',
    },
    {
      id: '4',
      title: 'Advanced JavaScript Techniques Everyone Should Know',
      thumbnail: '/api/placeholder/320/180',
    },
    {
      id: '5',
      title: 'Building Responsive Layouts with CSS Grid',
      thumbnail: '/api/placeholder/320/180',
    },
    {
      id: '6',
      title: 'The Future of Web Development',
      thumbnail: '/api/placeholder/320/180',
    },
    {
      id: '7',
      title: 'React Hooks Explained in Detail',
      thumbnail: '/api/placeholder/320/180',
    },
    {
      id: '8',
      title: 'Building a Full Stack Application from Scratch',
      thumbnail: '/api/placeholder/320/180',
    },
    {
      id: '9',
      title: 'UI/UX Design Principles for Developers',
      thumbnail: '/api/placeholder/320/180',
    },
    {
      id: '10',
      title: 'Machine Learning Basics for Web Developers',
      thumbnail: '/api/placeholder/320/180',
    },
    {
      id: '11',
      title: 'How to Optimize Your React Applications',
      thumbnail: '/api/placeholder/320/180',
    },
    {
      id: '12',
      title: 'Building Accessible Web Applications',
      thumbnail: '/api/placeholder/320/180',
    },
  ];
  const VideoCard = ({ video }) => (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.03)',
          cursor: 'pointer',
        }
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={video.thumbnail}
        alt={video.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, pb: 2 }}>
        <Typography variant="subtitle1" component="h3" noWrap>
          {video.title}
        </Typography>
      </CardContent>
    </Card>
  );

export default function HomePage() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // Simulate API fetch
      const fetchVideos = () => {
        setTimeout(() => {
          setVideos(dummyVideos);
          setLoading(false);
        }, 1000);
      };
  
      fetchVideos();
    }, []);

    
  
    return (
      <Box 
        sx={{ 
          minHeight: '100vh',
          backgroundColor: '#f9f9f9',
          pt: 4,
          pb: 6
        }}
      >
        <Container maxWidth="xl">
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              mb: 4, 
              fontWeight: 'bold',
              color: '#212121'
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
                height: '50vh' 
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {videos.map((video) => (
                <Grid item key={video.id} xs={12} sm={6} md={4} lg={3}>
                  <VideoCard video={video} />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    );
  }