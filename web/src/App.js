import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import Login from "./pages/Login";

import Signup from "./pages/Signup";

import Success from './components/Success';

import GoOAuth from './pages/GoOAuth';

import Waitlist from './pages/WaitList';

import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/success" element={<Success />} />
        <Route path="/oauth-google" element={<GoOAuth />} />
        <Route path="/waitlist" element={<Waitlist />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;