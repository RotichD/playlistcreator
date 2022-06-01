import React from "react";

import Tracklist from "../tracklist/Tracklist";

import "./results.css";

export const Results = ({ onAdd, searchResults }) => {
  return (
    <>
      <div className='results-container'>
        {searchResults.length > 0 && <h2>Results</h2>}
        <Tracklist tracks={searchResults} onAdd={onAdd} isRemoval={false} />
      </div>
    </>
  );
};

export default Results;
