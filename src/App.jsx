import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Searchbar from "./components/searchbar/Searchbar";
import Results from "./components/results/Results";
import Footer from "./components/footer/Footer";

export const App = () => {
  return (
    <div>
      <Header />
      <Searchbar />
      <Results />
      <Footer />
    </div>
  );
};

export default App;
