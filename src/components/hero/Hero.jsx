import React from "react";

import "./hero.css";

export const Hero = ({ onLogin }) => {
  return (
    <div className='hero'>
      <div className='image-wrapper'>
        <img
          className='hero-image'
          src='/images/undraw_imagination_re_i0xi.svg'
        />
      </div>
      <div className='instructions-wrapper'>
        <p className='login-instructions'>
          Click the Login button below to connect your Spotify Account
        </p>
        <div className='button-wrapper'>
          <button className='login-button' onClick={onLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
