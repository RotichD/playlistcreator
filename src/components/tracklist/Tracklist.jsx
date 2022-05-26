import React from "react";

import Track from "../track/Track";

import "./tracklist.css";

export const Tracklist = ({ isRemoval, onAdd, onRemove, tracks }) => {
  return (
    <div className='tracklist'>
      {tracks.map((track) => {
        return (
          <Track
            isRemoval={isRemoval}
            key={track.id}
            onAdd={onAdd}
            onRemove={onRemove}
            track={track}
          />
        );
      })}
    </div>
  );
};

export default Tracklist;
