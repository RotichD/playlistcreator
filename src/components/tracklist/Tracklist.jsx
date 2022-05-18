import React from "react";
import Track from "../track/Track";
import './tracklist.css';

export const Tracklist = ({isRemoval, onAdd, onRemove, tracks}) => {
  return (
    <div className='tracklist'>
      {tracks.map((track) => {
        return (
          <Track
            track={track}
            key={track.id}
            onAdd={onAdd}
            onRemove={onRemove}
            isRemoval={isRemoval}
          />
        );
      })}
    </div>
  );
};

export default Tracklist;
