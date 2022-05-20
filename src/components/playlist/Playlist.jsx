import React from "react";
import Tracklist from "../tracklist/Tracklist";
import "./playlist.css";

export const Playlist = ({
  onNameChange,
  onRemove,
  onSave,
  playlistTracks,
}) => {
  const handleInputChange = (event) => {
    onNameChange(event.target.value);
  };

  return (
    <div className='playlist'>
      <input
        className='playlistName'
        defaultValue={"New Playlist"}
        onChange={handleInputChange}
      />
      <Tracklist tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
      <button className='savePlaylistBtn' onClick={onSave}>
        SAVE PLAYLIST
      </button>
    </div>
  );
};

export default Playlist;
