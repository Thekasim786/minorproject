// VideoCard.jsx
import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

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
        },
      }}
      onClick={() => navigate(`/video/${video._id}`)}  // Navigate to /video/:id
    >
      <CardMedia
        component="img"
        height="180"
        image={video.thumbnail || '/api/placeholder/320/180'}
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
};

export default VideoCard;
