import React from 'react';
import NavbarLogout from './NavbarLogout';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Container,
} from '@mui/material';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DevicesIcon from '@mui/icons-material/Devices';

export default function LandingPage() {
  return (
    <>
      <NavbarLogout />

      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '90vh',
          backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Stream Your World
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, maxWidth: '700px' }}>
          Dive into a universe of movies, shows, and originals — all in stunning HD and on any device.
        </Typography>
        <Button variant="contained" color="secondary" size="large">
          Start Watching
        </Button>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Why Choose Us?
        </Typography>
        <Typography variant="body1" textAlign="center" mb={5} color="text.secondary">
          The ultimate entertainment experience at your fingertips.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3} sx={{ textAlign: 'center', py: 4 }}>
              <OndemandVideoIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  HD Streaming
                </Typography>
                <Typography variant="body2">
                  Enjoy buffer-free high-definition video with adaptive streaming.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3} sx={{ textAlign: 'center', py: 4 }}>
              <FavoriteIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Personalized Picks
                </Typography>
                <Typography variant="body2">
                  Smart AI curates content you’ll love based on your watch history.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3} sx={{ textAlign: 'center', py: 4 }}>
              <DevicesIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Watch Anywhere
                </Typography>
                <Typography variant="body2">
                  Stream across mobile, TV, and web with seamless synchronization.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* CTA */}
      <Box
        sx={{
          backgroundColor: '#1976d2',
          color: '#fff',
          textAlign: 'center',
          py: 6,
          px: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Unlimited Movies, Shows & More
        </Typography>
        <Typography variant="body1" mb={3}>
          Watch anywhere. Cancel anytime. Sign up and get your first month free.
        </Typography>
        <Button variant="contained" color="secondary" size="large">
          Get Started
        </Button>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: 3,
          textAlign: 'center',
          backgroundColor: '#f5f5f5',
          color: 'text.secondary',
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} StreamNow Inc. All rights reserved.
        </Typography>
      </Box>
    </>
  );
}
