import React from "react";

import "./footer.css";

export const Footer = () => {
  return (
    <footer>
      <p className='purpose'>
        For Creating and Adding Songs to Spotify Playlists
      </p>
      <p className='github'>
        Project by{" "}
        <a href='https://github.com/RotichD' target='blank'>
          Dylan Rotich
        </a>
      </p>
    </footer>
  );
};

export default Footer;
