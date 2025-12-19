import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import WeatherComponent from "./WeatherComponent";
import Search from "./components/pages/Search";
import List from "./components/pages/List";
import Category from "./components/pages/Category";
import Detail from "./components/pages/Detail";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/list" element={<List />} />
        <Route path="/category" element={<Category />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/WeatherComponent" element={<WeatherComponent />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
