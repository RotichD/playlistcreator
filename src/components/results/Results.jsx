import React from "react";
import "./results.css";
import Tracklist from "../tracklist/Tracklist";

export const Results = ({onAdd, searchResults}) => {
  return (
    <>
      {searchResults.length > 0 && <h2>Results</h2>}
      <div className="resultsContainer">
        <Tracklist tracks={searchResults} onAdd={onAdd} isRemoval={false} />
      </div>
    </>
  );
};

export default Results;
