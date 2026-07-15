import { Routes, Route } from 'react-router';
import './App.css';
import HomePage from './Home/Homepage';
import Login from './Login/Login';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
