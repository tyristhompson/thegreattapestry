import { Routes, Route } from 'react-router';
import './App.css';
import HomePage from './Home/Homepage';
import Login from './Login/Login';
import Register from './Register/Register';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
