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
      <h2 className='playlistTitle'>New Playlist⬇</h2>
      {playlistTracks.length == 0 && (
        <p className='instructions'>
          Search for songs and click "+" to add them to the playlist below.
          Click "SAVE PLAYLIST" to save the playlist to your Spotify Account
        </p>
      )}
      <input
        className='playlistName'
        defaultValue={"New Playlist"}
        onChange={handleInputChange}
      />
      <Tracklist tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
      {playlistTracks.length == 0 && (
        <p className='instructions'>Tracks you add will appear here</p>
      )}
      <button className='savePlaylistBtn' onClick={onSave}>
        SAVE PLAYLIST
      </button>
    </div>
  );
};

export default Playlist;
