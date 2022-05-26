import React, { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Searchbar from "./components/searchbar/Searchbar";
import Results from "./components/results/Results";
import Footer from "./components/footer/Footer";
import Playlist from "./components/playlist/Playlist";
import Spotify from "./util/Spotify";

export const App = () => {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('');

  const addTrack = (track) => {
    let tracks = playlistTracks;

    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }

    tracks.push(track);
    setPlaylistTracks([...playlistTracks]);
  };

  const removeTrack = (track) => {
    let tracks = playlistTracks;

    //save every track except for the one you want to remove
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);
    setPlaylistTracks(tracks);
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const savePlaylist = () => {
    console.log(playlistTracks);
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("");
      setPlaylistTracks([]);
    });
  };

  const search = (term) => {
    Spotify.search(term).then((searchResults) => {
      setSearchResults(searchResults);
    });
  };

  return (
    <div className='pageContainer'>
      <div className='contentWrapper'>
        <Header />
        <Searchbar onSearch={search} />
        <Results searchResults={searchResults} onAdd={addTrack} />
        <Playlist
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onRemove={removeTrack}
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;
