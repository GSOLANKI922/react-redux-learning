import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../page/Home";
import MoviesList from "../page/MoviesList";
import PersonList from "../page/PersonList";
import Login from "../page/Login";
import MovieDetails from "../page/MovieDetails";
import PriverRoute from "./PriverRoute";
import ErroePage from "../page/ErroePage";

const RoutePage = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PriverRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/movieslist" element={<MoviesList />} />
        <Route path="/personlist" element={<PersonList />} />
        <Route path="/moviedetails/:idm" element={<MovieDetails />} />
        <Route path="*" element={<ErroePage/>}/>
      </Route>
    </Routes>
  );
};

export default RoutePage;
