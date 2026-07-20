import React from 'react';

import { ThemeProvider } from './AppContext';
import { SmoothScrollProvider } from './../hooks/useLocomotive';
import { Navbar, Hero, Profile, Services, Projects, Experience, Testimonials, Contact, Footer, InteractiveBackground } from './../components';
import './app.scss';

const App = () => {
  return (
    <ThemeProvider>
      <div className='app'>
        <InteractiveBackground />
        <SmoothScrollProvider header={<Navbar />}>
          <main>
            <Hero />
            <Profile />
            <Services />
            <Projects />
            <Experience />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </SmoothScrollProvider>
      </div>
    </ThemeProvider>
  );
};

export default App;
