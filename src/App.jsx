import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import Playlist from "./components/playlist/Playlist";
import Results from "./components/results/Results";
import Searchbar from "./components/searchbar/Searchbar";
import Footer from "./components/footer/Footer";

import Spotify from "./util/Spotify";
import "./App.css";

export const App = () => {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  useEffect(() => {
    Spotify.checkAccessToken().then((response) => {
      if (response === true) {
        console.log(response, "1");
        setIsLoggedIn(true);
      } else {
        console.log("something went wrong");
        console.log(response, "2");
      }
    });
  }, []);

  const onLogin = () => {
    Spotify.getAccessToken();
  };

  const savePlaylist = () => {
    console.log(playlistTracks);
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris)
      .then((response) => {
        //Good Response
        if (response.status < 400) {
          console.log("good status");
          toast.success(`Playlist saved`, {
            autoClose: 2000,
            closeOnClick: true,
            draggable: true,
            position: "bottom-right",
            hideProgressBar: false,
            pauseOnHover: true,
            progress: undefined,
          });
        } else {
          toast.error("Problem saving playlist", {
            autoClose: 5000,
            closeOnClick: true,
            draggable: true,
            hideProgressBar: false,
            pauseOnHover: true,
            position: "bottom-center",
            progress: undefined,
          });
        }
      })
      .then(() => {
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
    <div className='page-container'>
      <div className='content-wrapper'>
        <Header />
        {isLoggedIn ? (
          <div>
            <Searchbar onSearch={search} />
            <Results onAdd={addTrack} searchResults={searchResults} />
            <Playlist
              playlistName={playlistName}
              playlistTracks={playlistTracks}
              onNameChange={updatePlaylistName}
              onRemove={removeTrack}
              onSave={savePlaylist}
            />
            <ToastContainer
              autoClose={2000}
              closeOnClick
              draggable
              hideProgressBar={false}
              newestOnTop={false}
              pauseOnFocusLoss
              pauseOnHover
              position='bottom-center'
              rtl={false}
            />
          </div>
        ) : (
          <Hero onLogin={onLogin} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
