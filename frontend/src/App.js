import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signin from './pages/SignIn';
import Register from './pages/Register';
import Event from './pages/Event';

import { AuthProvider } from './components/auth';
import { Navbar } from './components/Navbar';
import { Profile } from './components/Profile';
import { RequireAuth } from './components/RequireAuth';
import './App.css';

export default function App() {

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
