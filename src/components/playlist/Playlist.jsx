import React from "react";
import Tracklist from "../tracklist/Tracklist";
import "./playlist.css";

export const Playlist = ({handleNameChange, onRemove, onSave, playlistTracks}) => {

  return (
    <div className='playlist'>
      <input className='playlistName' defaultValue={"New Playlist"} onChange={handleNameChange} />
      <Tracklist tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
      <button className='savePlaylistBtn' onClick={onSave}>
        SAVE PLAYLIST
      </button>
    </div>
  );
};

export default Playlist;
