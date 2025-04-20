// VideoCard.jsx
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  // Function to generate a video thumbnail (could be updated to use actual thumbnails)
  const getThumbnail = () => {
    return video.thumbnail || '/api/placeholder/320/180';
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.03)',
          cursor: 'pointer',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        },
        borderRadius: '8px',
        overflow: 'hidden',
      }}
      onClick={() => navigate(`/video/${video._id}`)}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="180"
          image={getThumbnail()}
          alt={video.title}
          sx={{ objectFit: 'cover' }}
        />
        {/* Optional play button overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.1)',
            opacity: 0,
            transition: 'opacity 0.2s',
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          <Box
            sx={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: 0,
                height: 0,
                borderTop: '10px solid transparent',
                borderBottom: '10px solid transparent',
                borderLeft: '15px solid white',
                marginLeft: '5px',
              }}
            />
          </Box>
        </Box>
      </Box>
      <CardContent sx={{ flexGrow: 1, pb: 2 }}>
        <Typography 
          variant="subtitle1" 
          component="h3" 
          noWrap
          sx={{ 
            fontWeight: '500',
            color: '#212121',
          }}
        >
          {video.title}
        </Typography>
        {video.description && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mt: 1,
            }}
          >
            {video.description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoCard;