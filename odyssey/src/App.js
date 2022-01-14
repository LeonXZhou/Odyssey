<<<<<<< HEAD
import React from "react";
import "./App.css";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import DisplayTrips from "./components/DisplayTrips";
import AddTrip from "./components/AddTrip";

const App = () => {
  return (
    <div className="App">
      <Navigation />
      <Home></Home>
=======
import { Link } from 'react-router-dom';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <div>
      <BrowserRouter>
        <h1>always here</h1>
        <Link to='/'>home</Link>
        <br />
        <Link to='/planning'>planning</Link>
        <br />
        <Link to='/asdf'>asdf</Link>
        
        <Routes>
          <Route path="/" element={<h1>this is: home</h1>} />
          <Route path="/planning" element={<h1>this is: planning</h1>} />
          <Route path="/asdf" element={<h1>this is: asdf</h1>} />
        </Routes>
      </BrowserRouter>
>>>>>>> main
    </div>
  );
};

export default App;
