import React from "react";
import './App.css';
import ContentListElements from './components/Content';
import Details from './components/Details';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

const App = () =>{
  return (
  <div>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<ContentListElements type="movie" />} />
      <Route path="/tv" element={< ContentListElements type="tv"/>} />
      <Route path="/movie/:id" element={<Details />} /> 
      <Route path="/tv/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
