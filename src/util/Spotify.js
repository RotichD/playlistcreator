const clientId = "24170ad8635c403ca51105cdee4abb72";
const redirectUri = "http://localhost:8080/";
let accessToken;

export const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    //Check for an Access Token that matches
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    //Check for expiration time in url
    const expirationMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expirationMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expirationMatch[1]);

      //clear access Token after expiration time
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public,user-library-read,user-library-modify&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  async search(term) {
    const accessToken = Spotify.getAccessToken();
    return await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
        console.log(jsonResponse);
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
          explicit: track.explicit,
          image: track.album.images[0].url,
          length: track.duration_ms,
        }));
      });
  },

  async isSaved(trackId) {
    const accessToken = Spotify.getAccessToken();
    return await fetch(
      `https://api.spotify.com/v1/me/tracks/contains?ids=${trackId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((response) => {
      return response.json();
    });
  },

  async saveTrack(trackId) {
    const accessToken = Spotify.getAccessToken();
    try {
      return await fetch(
        `https://api.spotify.com/v1/me/tracks?ids=${trackId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ).then((response) => {
        if (response.ok) {
          return true;
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  },

  async removeTrack(trackId) {
    const accessToken = Spotify.getAccessToken();
    try {
      return await fetch(
        `https://api.spotify.com/v1/me/tracks?ids=${trackId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ).then((response) => {
        if (response.ok) {
          return true;
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  },
};

export default Spotify;
