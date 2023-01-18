import React from 'react';

import { ThemeProvider } from './AppContext';
import { Content, Buttons, Matrix, Spotify } from './../components';
import './app.scss';

console.log("I'm stuck in the matrix, please send help!!! 😰")

const App = () => {

  return (
    <ThemeProvider>
      <div className='app'>
        <Content />
        <Buttons />
        <Spotify />
        <Matrix />
      </div>
    </ThemeProvider>
  );
};

export default App;
