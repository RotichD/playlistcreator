import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./track.css";
import formatTime from "../../util/Length";
import Spotify from "../../util/Spotify";

export const Track = ({ track, onAdd, onRemove, isRemoval }) => {
  const [like, setLike] = useState(false);

  const addTrack = () => {
    onAdd(track);
  };

  const removeTrack = () => {
    onRemove(track);
    console.log("Removing Track", track);
  };

  const unsaveTrack = () => {
    console.log("Unsaving Track: " + track.id);
    Spotify.removeTrack(track.id).then((response) => {
      if (response.status === 200) {
        console.log("Succesfully unsaved track: " + track.id);
        setLike(false);
        toast.success(`Removed ${track.name} from "liked songs"`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Error: problem un-saving track", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  const saveTrack = () => {
    console.log("Saving Track: " + track.id);
    Spotify.saveTrack(track.id).then((response) => {
      if (response.status === 200) {
        console.log("Successfully saved track: " + track.id);
        setLike(true);
        toast.success(`Added ${track.name} to "liked songs"`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Error: problem saving track", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  const renderAction = () => {
    if (!isRemoval) {
      return (
        <button className='add' onClick={addTrack}>
          +
        </button>
      );
    } else {
      return (
        <button className='remove' onClick={removeTrack}>
          -
        </button>
      );
    }
  };

  const renderExplicit = () => {
    return (
      <p className='explicit' title='explicit'>
        E
      </p>
    );
  };

  const renderClean = () => {
    return <p className='clean'>clean</p>;
  };

  const renderSaveButton = () => {
    if (like) {
      return (
        <button className='like' onClick={unsaveTrack}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fillRule='currentColor'
            className='bi bi-heart-fill'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
            />
          </svg>
        </button>
      );
    } else {
      return (
        <button className='like' onClick={saveTrack}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fillRule='currentColor'
            className='bi bi-heart'
            viewBox='0 0 16 16'
          >
            <path d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z' />
          </svg>
        </button>
      );
    }
  };

  useEffect(() => {
    Spotify.isSaved(track.id).then((json) => setLike(json[0]));
  }, []);

  return (
    <div className='track'>
      <div className='image'>
        <img src={track.image} alt='album cover' />
      </div>
      <div className='information'>
        <p className='title'>{track.name.length > 50 ? track.name.substring(0, 70) + '...' : track.name}</p>
        {track.explicit ? renderExplicit() : renderClean()}
        {renderSaveButton()}
        <p className='artist'>{track.artist}</p>
        <p className='trackTime'>{formatTime(track.length)}</p>
        {renderAction()}
      </div>
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
  );
};

export default Track;
