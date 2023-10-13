import './App.css';
import Navbar from './components/Navbar';
import './styles.css';
import React, { createContext, useReducer } from 'react';
import { BrowserRouter as Router,NavLink, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import  { Register,Login, Logout } from './pages/Auth';
import {initialState, reducer} from './reducer/useReducer'
const NotFound = () => {
    return (
        <div className="not-found">
            <h1>Sorry, page not found</h1>
            <NavLink to="/" className="home-button">
                Go to Homepage
            </NavLink>
        </div>
    );
};
export const userContext = createContext()
    
const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
        <userContext.Provider value={{state, dispatch}}>
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />

                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/register" element={<Register></Register>} />
                <Route path="/login" element={<Login></Login>} />
                <Route path="/logout" element={<Logout></Logout>} />

                <Route path="*" element={<NotFound />} />

            </Routes>
        </Router>
        </userContext.Provider>
        </>
    );
};

export default App;
