import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import Header from "./components/header/Header";
import Searchbar from "./components/searchbar/Searchbar";
import Results from "./components/results/Results";
import Footer from "./components/footer/Footer";
import Playlist from "./components/playlist/Playlist";
import Spotify from "./util/Spotify";
import Hero from "./components/hero/Hero";

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
        console.log(response, '1')
        setIsLoggedIn(true);
      } else {
        console.log('something went wrong')
        console.log(response, '2')
      }
    })
  });

  const onLogin = () => {
    Spotify.getAccessToken()
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
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("Problem saving playlist", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
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
    <div className='pageContainer'>
      <div className='contentWrapper'>
        <Header />
        {isLoggedIn ? (
          <div>
            <Searchbar onSearch={search} />
            <Results searchResults={searchResults} onAdd={addTrack} />
            <Playlist
              playlistName={playlistName}
              playlistTracks={playlistTracks}
              onRemove={removeTrack}
              onNameChange={updatePlaylistName}
              onSave={savePlaylist}
            />
            <ToastContainer
              position='bottom-center'
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
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
