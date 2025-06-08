import React from "react";
import './App.css';
import MovieList from './components/MovieList';
import SerieList from './components/SerieList';
import Details from './components/Details';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

const App = () =>{
  return (
  <div>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<MovieList />} />
      <Route path="/series" element={< SerieList />} />
      <Route path="/movie/:id" element={<Details />} /> 
      <Route path="/series/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
