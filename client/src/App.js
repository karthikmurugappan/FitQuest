import logo from './logo.svg';
import './App.css';
import NavBar from './components/header.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/homepage.js';
import SignUp  from './pages/signup.js';
import Profile from './pages/profile.js';
import Login from './pages/login.js';


function App() {
  return (
    <div>
      <Router>
      <NavBar />
      <h1>FitQuest</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
       
      </Routes>
      </Router>
    </div>
  );
}

export default App;
