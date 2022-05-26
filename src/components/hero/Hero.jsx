import React from 'react';
import './hero.css';

export const Hero = ({onLogin}) => {
    return (
        <div className='hero'>
            <img className='hero-image' src='/images/undraw_imagination_re_i0xi.svg'/>
            <p className='login-instructions'>Click the Login button below to connect your Spotify Account</p>
            <button className='login-button' onClick={onLogin}>
                Login
            </button>
        </div>
    )
}

export default Hero;