import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../page/Home";
import MoviesList from "../page/MoviesList";
import PersonList from "../page/PersonList";
import Login from "../page/Login";
import MovieDetails from "../page/MovieDetails";

const RoutePage = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movieslist" element={<MoviesList />} />
      <Route path="/personlist" element={<PersonList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/moviedetails/:id" element={<MovieDetails />} />
    </Routes>
  );
};

export default RoutePage;
