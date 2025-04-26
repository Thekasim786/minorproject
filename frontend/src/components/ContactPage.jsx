import React from 'react';
import { Box, Typography, TextField, Button, Container } from '@mui/material';

export default function ContactPage() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="h6" align="center" sx={{ mb: 4 }}>
        Have questions? We're here to help!
      </Typography>

      <Box sx={{ maxWidth: 600, margin: '0 auto' }}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Message"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Send Message
        </Button>
      </Box>
    </Container>
  );
}
