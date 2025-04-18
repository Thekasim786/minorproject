import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Divider, 
  Avatar, 
  TextField, 
  Button,
  IconButton,
  Stack,
  Paper,
  Grid,
  CircularProgress
} from '@mui/material';

// Import icons
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import SendIcon from '@mui/icons-material/Send';

// Mock data for a single video
const videoData = {
  id: '1',
  title: 'How to Build a React App in 10 Minutes',
  videoUrl: 'https://www.example.com/video.mp4', // This would be a real video URL in production
  likes: 1245,
  dislikes: 32,
  views: 45632,
  publishedAt: '2025-03-15T14:48:00Z',
};

// Mock comments data
const commentsData = [
  {
    id: '1',
    username: 'ReactDeveloper',
    avatar: '/api/placeholder/40/40',
    content: 'This tutorial saved me hours of work! Thank you so much for explaining everything so clearly.',
    timestamp: '2025-04-14T18:30:00Z',
    likes: 45
  },
  {
    id: '2',
    username: 'CodeMaster',
    avatar: '/api/placeholder/40/40',
    content: 'Great video! I have a question though - what about handling API errors in the setup you showed?',
    timestamp: '2025-04-15T09:15:00Z',
    likes: 23
  },
  {
    id: '3',
    username: 'WebDesigner2025',
    avatar: '/api/placeholder/40/40',
    content: 'The approach you showed at 2:45 is brilliant. I never thought of structuring components that way.',
    timestamp: '2025-04-15T14:22:00Z',
    likes: 19
  },
  {
    id: '4',
    username: 'NewbieCoder',
    avatar: '/api/placeholder/40/40',
    content: 'As a beginner, this was very easy to follow. Could you make a follow-up video on adding authentication?',
    timestamp: '2025-04-16T11:05:00Z',
    likes: 12
  },
];

// Format date to relative time (like "2 days ago")
const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  
  if (diffDays > 0) {
    return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  } else if (diffHours > 0) {
    return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
  } else {
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    return diffMinutes === 1 ? '1 minute ago' : `${diffMinutes} minutes ago`;
  }
};

// Format number with K, M abbreviations
const formatCount = (count) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

const VideoPlayerPage = () => {
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    // Simulate API fetch for video and comments
    const fetchVideoData = () => {
      setTimeout(() => {
        setVideo(videoData);
        setComments(commentsData);
        setLoading(false);
      }, 1000);
    };

    fetchVideoData();
  }, []);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
      setDisliked(false);
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
    } else {
      setDisliked(true);
      setLiked(false);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    
    if (commentText.trim() === '') return;
    
    const newComment = {
      id: `new-${Date.now()}`,
      username: 'CurrentUser',
      avatar: '/api/placeholder/40/40',
      content: commentText,
      timestamp: new Date().toISOString(),
      likes: 0
    };
    
    setComments([newComment, ...comments]);
    setCommentText('');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh', pb: 6 }}>
      <Container maxWidth="xl" sx={{ pt: 2 }}>
        {/* Video Player */}
        <Box sx={{ position: 'relative', width: '100%', paddingTop: '56.25%', backgroundColor: '#000', mb: 2 }}>
          {/* Using placeholder since we can't actually play videos */}
          <Box 
            component="img"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
            src="/api/placeholder/1280/720"
            alt="Video player"
          />
        </Box>
        
        {/* Video Title */}
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
          {video.title}
        </Typography>
        
        {/* Video Stats and Reactions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {formatCount(video.views)} views • {formatRelativeTime(video.publishedAt)}
          </Typography>
          
          <Stack direction="row" spacing={1}>
            <Paper elevation={0} sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1, borderRadius: 4 }}>
              <IconButton onClick={handleLike} color={liked ? "primary" : "default"}>
                {liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
              </IconButton>
              <Typography variant="body2">{formatCount(video.likes)}</Typography>
              
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              
              <IconButton onClick={handleDislike} color={disliked ? "primary" : "default"}>
                {disliked ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
              </IconButton>
            </Paper>
            
            <Paper elevation={0} sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1, borderRadius: 4 }}>
              <IconButton>
                <EmojiEmotionsOutlinedIcon />
              </IconButton>
              <Typography variant="body2">React</Typography>
            </Paper>
          </Stack>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        {/* Comments Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
            Comments ({comments.length})
          </Typography>
          
          {/* Add Comment Form */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 4 }}>
            <Avatar src="/api/placeholder/40/40" sx={{ mr: 2 }} />
            <Box component="form" onSubmit={handleCommentSubmit} sx={{ flexGrow: 1 }}>
              <TextField 
                fullWidth
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                variant="standard"
                sx={{ mb: 1 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <Button 
                  variant="text" 
                  sx={{ mr: 1 }}
                  onClick={() => setCommentText('')}
                >
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  endIcon={<SendIcon />}
                  disabled={commentText.trim() === ''}
                  type="submit"
                >
                  Comment
                </Button>
              </Box>
            </Box>
          </Box>
          
          {/* Comments List */}
          <Stack spacing={3}>
            {comments.map((comment) => (
              <Box key={comment.id} sx={{ display: 'flex' }}>
                <Avatar src={comment.avatar} sx={{ mr: 2 }} />
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mr: 1 }}>
                      {comment.username}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatRelativeTime(comment.timestamp)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {comment.content}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton size="small">
                      <ThumbUpOutlinedIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="caption" sx={{ mr: 2 }}>
                      {comment.likes > 0 ? formatCount(comment.likes) : ''}
                    </Typography>
                    <IconButton size="small">
                      <ThumbDownOutlinedIcon fontSize="small" />
                    </IconButton>
                    <Button variant="text" size="small" sx={{ ml: 2 }}>
                      Reply
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default VideoPlayerPage;