import React from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import AddTodo from "./pages/AddTodo";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddTodo />} />
    </Routes>
  );
};

export default Router;
