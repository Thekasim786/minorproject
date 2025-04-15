import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useTheme } from "@mui/material/styles";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    console.log("Login Data:", formData);
  };

  return (
    <Box
      position="relative"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1350&q=80")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 🌑 Dark overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        bgcolor="rgba(0,0,0,0.5)"
        zIndex={1}
      />

      {/* 🎞️ Login box with animation */}
      <Paper
        elevation={6}
        sx={{
          p: 6,
          width: isMobile ? "90%" : 700,
          zIndex: 2,
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: 4,
          animation: "fadeIn 1s ease-in-out",
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <Avatar sx={{ bgcolor: "#1976d2", mb: 2, width: 70, height: 70 }}>
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
          <Typography variant="h4" component="h1">
            Login
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            fullWidth
            margin="normal"
            size="medium"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            fullWidth
            margin="normal"
            size="medium"
            value={formData.password}
            onChange={handleChange}
          />

          {error && (
            <Typography variant="body2" color="error" align="center" mt={1}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 4, py: 1.4, fontSize: "1rem", borderRadius: 2 }}
          >
            Login
          </Button>
        </form>
      </Paper>

      {/* 🎞️ Animation keyframe */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </Box>
  );
};

export default Login;
