import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../page/Home";
import MoviesList from "../page/MoviesList";
import PersonList from "../page/PersonList";
import Login from "../page/Login";
import MovieDetails from "../page/MovieDetails";
import ErrorPage from "../page/ErrorPage";
import PrivetRoute from "./PrivetRoute";
import RegisterUser from "../page/RegisterUser";

const RoutePage = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/SingUp" element={<RegisterUser />} />
      <Route path="/" element={<PrivetRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/movieslist" element={<MoviesList />} />
        <Route path="/personlist" element={<PersonList />} />
        <Route path="/movieDetails/:idm" element={<MovieDetails />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default RoutePage;
