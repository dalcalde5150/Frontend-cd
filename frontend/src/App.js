import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect } from 'react';

import Home from './pages/Home';
import Signin from './pages/SignIn';
import Register from './pages/Register';
import Event from './pages/Event';

import { AuthProvider, useAuth } from './contexts/auth';
import { Navbar } from './components/Navbar';
import { Profile } from './components/Profile';
import { RequireAuth } from './components/RequireAuth';
import './App.css';

axios.defaults.withCredentials = true;

export default function App() {

  useEffect(() => {
    useAuth.login();
  }, []);

  return (
    <AuthProvider>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/event" element={<RequireAuth><Event /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth> } />
      </Routes>
    </AuthProvider>
  );
}
