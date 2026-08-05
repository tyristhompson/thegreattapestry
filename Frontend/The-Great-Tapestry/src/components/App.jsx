import { Routes, Route, useNavigate} from 'react-router';
import { useEffect, useState } from 'react';
import './App.css';
import { AuthContext } from '../contexts/authContext';
import HomePage from './Home/Homepage';
import Login from './Login/Login';
import Register from './Register/Register';
import Profile from './Profile/Profile';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authUser, setAuthUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    /* if(authUser) {
      async () => {
      const response = await axios.get("http://localhost:3000/user/me");
      setAuthUser(response.data.user);
      navigate("/profile");
    }
    } */
   if(loggedIn) navigate("/profile");
  }, [loggedIn]);
  

  return (
    <>
      <AuthContext.Provider value={{authUser, setAuthUser, loggedIn, setLoggedIn}}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App;

