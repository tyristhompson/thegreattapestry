import { Routes, Route, useNavigate } from 'react-router';
import { useState } from 'react';
import './App.css';
import HomePage from './Home/Homepage';
import Login from './Login/Login';
import Register from './Register/Register';
import Profile from './Profile/Profile';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  function loginUser(user) {
    setUser(user);
    navigate("/profile");
  }

  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<Login loginUser={loginUser}/>} />
        <Route path="/register" element={<Register loginUser={loginUser}/>} />
        <Route path="/profile" element={<Profile user={user}/>} />
      </Routes>
    </>
  )
}

export default App
