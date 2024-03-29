import React from 'react';
import './stylesheets/_index.scss';
import ThemeToggle from './components/Toggle'
import Content from './components/Content'
import Buttons from './components/Buttons';
import Particle from './components/Particles';
import Footer from './components/Footer';
import Spotify from './components/Spotify';

function App() {
    return (
        <div className="App">
            <ThemeToggle />
            <Content />
            <Buttons />
            <Particle />
            <Footer />
            <Spotify />
        </div>
    );
}

export default App;
