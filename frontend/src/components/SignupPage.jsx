import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,
  InputAdornment,
  IconButton,
  Divider,
  Snackbar,
  Alert,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
  CircularProgress
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Email, 
  Lock, 
  Person, 
  Google, 
  Facebook, 
  Twitter 
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'terms' ? checked : value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase and a number';
    }
    
    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Validate terms
    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call with timeout
      setTimeout(() => {
        setIsSubmitting(false);
        setSnackbar({
          open: true,
          message: 'Account created successfully!',
          severity: 'success',
        });
        
        // Reset form after successful submission
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          terms: false,
        });
      }, 1500);
    }
  };
  
  const handleSocialSignup = (provider) => {
    setSnackbar({
      open: true,
      message: `${provider} authentication coming soon!`,
      severity: 'info',
    });
  };
  
  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'background.default',
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={3}
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Grid container>
              {!isSmallScreen && (
                <Grid
                  item
                  md={5}
                  sx={{
                    backgroundImage: 'linear-gradient(315deg, #6e8efb 0%, #a777e3 100%)',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 5,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h4" component="h1" gutterBottom>
                    Welcome Back!
                  </Typography>
                  <Typography variant="body1" paragraph>
                    To keep connected with us please login with your personal info
                  </Typography>
                  <Button
                    variant="outlined"
                    color="inherit"
                    size="large"
                    sx={{
                      borderRadius: 8,
                      px: 4,
                      mt: 2,
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Sign In
                  </Button>
                </Grid>
              )}
              
              <Grid item xs={12} md={7}>
                <Box
                  sx={{
                    p: { xs: 3, md: 5 },
                  }}
                >
                  <Typography
                    variant="h4"
                    component="h1"
                    align="center"
                    gutterBottom
                    color="primary"
                  >
                    Create Account
                  </Typography>
                  
                  <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
                    <IconButton
                      sx={{
                        mx: 1,
                        backgroundColor: '#db4437',
                        color: 'white',
                        '&:hover': { backgroundColor: '#c23321' },
                      }}
                      onClick={() => handleSocialSignup('Google')}
                    >
                      <Google />
                    </IconButton>
                    <IconButton
                      sx={{
                        mx: 1,
                        backgroundColor: '#4267B2',
                        color: 'white',
                        '&:hover': { backgroundColor: '#365899' },
                      }}
                      onClick={() => handleSocialSignup('Facebook')}
                    >
                      <Facebook />
                    </IconButton>
                    <IconButton
                      sx={{
                        mx: 1,
                        backgroundColor: '#1DA1F2',
                        color: 'white',
                        '&:hover': { backgroundColor: '#0d95e8' },
                      }}
                      onClick={() => handleSocialSignup('Twitter')}
                    >
                      <Twitter />
                    </IconButton>
                  </Box>
                  
                  <Divider sx={{ my: 3 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ px: 1 }}
                    >
                      or use your email
                    </Typography>
                  </Divider>
                  
                  <Box component="form" noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="firstName"
                          required
                          fullWidth
                          label="First Name"
                          value={formData.firstName}
                          onChange={handleChange}
                          error={!!errors.firstName}
                          helperText={errors.firstName}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Person color="action" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="lastName"
                          required
                          fullWidth
                          label="Last Name"
                          value={formData.lastName}
                          onChange={handleChange}
                          error={!!errors.lastName}
                          helperText={errors.lastName}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Person color="action" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="email"
                          required
                          fullWidth
                          label="Email Address"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          error={!!errors.email}
                          helperText={errors.email}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Email color="action" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="password"
                          required
                          fullWidth
                          label="Password"
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={handleChange}
                          error={!!errors.password}
                          helperText={errors.password}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Lock color="action" />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={togglePasswordVisibility}
                                  edge="end"
                                >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="confirmPassword"
                          required
                          fullWidth
                          label="Confirm Password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          error={!!errors.confirmPassword}
                          helperText={errors.confirmPassword}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Lock color="action" />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle confirm password visibility"
                                  onClick={toggleConfirmPasswordVisibility}
                                  edge="end"
                                >
                                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="terms"
                              color="primary"
                              checked={formData.terms}
                              onChange={handleChange}
                            />
                          }
                          label="I agree to the Terms of Service and Privacy Policy"
                        />
                        {errors.terms && (
                          <Typography
                            variant="caption"
                            color="error"
                            display="block"
                            sx={{ mt: -1, ml: 2 }}
                          >
                            {errors.terms}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                    
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={isSubmitting}
                      sx={{
                        mt: 3,
                        mb: 2,
                        py: 1.5,
                        borderRadius: 8,
                        background: 'linear-gradient(45deg, #3f51b5 30%, #7986cb 90%)',
                      }}
                    >
                      {isSubmitting ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        'Sign Up'
                      )}
                    </Button>
                    
                    {isSmallScreen && (
                      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        Already have an account?{' '}
                        <Typography
                          component="span"
                          color="primary"
                          sx={{ textDecoration: 'none', cursor: 'pointer', fontWeight: 600 }}
                        >
                          Sign In
                        </Typography>
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
        
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={closeSnackbar}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}