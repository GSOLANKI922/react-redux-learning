import React from "react";
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import CreateLink from "./component/CreateLink";
import LinkList from "./component/LinkList";
import Header from "./component/Header";
import Login from "./component/Login";
import Search from "./component/Search";

const App = () => {
  return (
    <div className="center w85">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate replace to="/new/1" />} />
          <Route path="/create" element={<CreateLink />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/top" element={<LinkList />} />
          <Route path="/new/:page" element={<LinkList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
