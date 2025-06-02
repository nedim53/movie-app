import React from "react";
import './App.css';
import MovieList from './components/MovieList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

const App = () =>{
  return (
  <div>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<MovieList />} />
      <Route path="/series" element={<h1>Tv Shows</h1>} />
      </Routes>
    </BrowserRouter>
    <MovieList />
  </div>
  );
}

export default App;
