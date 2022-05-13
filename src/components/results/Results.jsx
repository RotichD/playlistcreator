import React from "react";
import "./results.css";
import Track from "../track/Track";

export const Results = () => {
  return (
    <>
      <h2>Results</h2>
      <div className="resultsContainer">
        <Track />
        <Track />
      </div>
    </>
  );
};

export default Results;
