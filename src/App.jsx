import { getSubdomain } from '../helper';
import './App.css'
import Home from './components/Home';
import Login from './components/Login'
import Profile from './components/Profile'
import SignUp from './components/SignUp'
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
