import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ✅ this line was missing
import NavbarLogout from './components/NavbarLogout';

import SignupPage from './components/SignupPage'
import LandingPage from './components/LandingPage';

import Login from './components/login';
import HomePage from './components/Homepage';
import VideoPlayerPage from './components/VideoPlayerPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/video/:id" element={<VideoPlayerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
