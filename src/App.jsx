import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Results from './components/results/Results';

export const App = () => {
  return (
    <div>
      <Header />
      <Results />
      <Footer />
    </div>
  );
};

export default App;
