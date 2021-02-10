import React, { Component } from 'react';

class Spotify extends Component {
    render() {
        return (
            <div className="spotify-container">
                <h3 className="spotify-text" aria-label="Now Listening on Spotify">Now Listening on Spotify</h3>
                <p><a href="https://open.spotify.com/user/22usjhj23c7c4s52lzjexdtmy">
                <img className="spotify-image" src="https://dedarritchon.vercel.app/api/spotify" alt="Listening on Spotify" />
                </a></p>
            </div>
        )
    }
}

export default Spotify;
