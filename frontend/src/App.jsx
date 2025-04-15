import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ✅ this line was missing
import NavbarLogout from './components/NavbarLogout';
// import Homepage from './components/omepage';
import SignupPage from './components/SignupPage'
// import Login from './Login'
import Homepage from './components/homepage';
import Login from './components/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
