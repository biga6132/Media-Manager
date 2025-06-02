import React from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import List from "./pages/List";
import Recommendation from "./pages/Recommendation"; // Import the Recommendation page

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="list" element={<List />} />
        <Route path="recommendations" element={<Recommendation />} />
      </Routes>
    </>
  );
}

export default App;
