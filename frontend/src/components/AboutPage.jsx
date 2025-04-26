import React from 'react';
import NavbarLogout from './NavbarLogout';
import { Container, Typography, Box } from '@mui/material';

export default function AboutPage() {
  return (
    <>
      <NavbarLogout />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Box textAlign="center">
          <Typography variant="h3" gutterBottom>
            About Our Platform
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome to our AI-powered video streaming platform. Our mission is to deliver high-quality video content
            with adaptive streaming, personalized recommendations, and a smooth user experience. Whether you're here
            to learn, entertain, or be inspired — we’ve got you covered!
          </Typography>
        </Box>
      </Container>
    </>
  );
}
