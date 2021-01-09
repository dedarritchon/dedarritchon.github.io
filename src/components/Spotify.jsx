import React, { Component } from 'react';

class Spotify extends Component {
    render() {
        return (
            <div className="spotify-container">
                <h3 className="spotify-text" aria-label="Now Listening on Spotify">Now Listening on Spotify</h3>
                <img src="https://dedarritchon.vercel.app/api/spotify" alt="Listening on Spotify" />
            </div>
        )
    }
}

export default Spotify;
