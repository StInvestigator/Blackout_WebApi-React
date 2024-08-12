import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Schedule from './Components/Schedule';

function App() {
    const [loginData, setLoginData] = useState();

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/schedule" element={<Schedule />} />
            </Routes>
        </>
    );
}

export default App;