import React from "react";
import "./track.css";

export const Track = () => {
  return (
    <div className="track">
      <div className="image">
        <img
          src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228"
          alt="album cover"
        />
      </div>
      <div className="information">
        <p className="title">Touch The Sky</p>
        <p className="explicit">E</p>
        <p className="artist">Kanye West</p>
        <p className="trackTime">3:56</p>
      </div>
    </div>
  );
};

export default Track;
