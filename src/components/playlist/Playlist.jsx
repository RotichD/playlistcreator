import React from "react";

import Tracklist from "../tracklist/Tracklist";

import "./playlist.css";

export const Playlist = ({
  onNameChange,
  onRemove,
  onSave,
  playlistTracks,
  playlistName,
}) => {
  const handleInputChange = (event) => {
    onNameChange(event.target.value);
  };

  return (
    <div className='playlist'>
      {playlistTracks.length > 0 && (
        <input
          className='playlist-name'
          onChange={handleInputChange}
          placeholder='Enter Playlist Name'
          value={playlistName}
        />
      )}
      <h2 className='playlist-title'>New Playlist⬇</h2>
      {playlistTracks.length == 0 && (
        <p className='instructions'>
          Search for songs and click "+" to add them to the playlist below.
          Click "SAVE PLAYLIST" to save the playlist to your Spotify Account
        </p>
      )}
      <Tracklist isRemoval={true} onRemove={onRemove} tracks={playlistTracks} />
      {playlistTracks.length == 0 && (
        <p className='instructions'>Tracks you add will appear here</p>
      )}
      <button className='save-playlist-button' onClick={onSave}>
        SAVE PLAYLIST
      </button>
    </div>
  );
};

export default Playlist;
