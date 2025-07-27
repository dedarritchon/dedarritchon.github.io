import React, { useState } from 'react';

import { ThemeProvider } from './AppContext';
import { Matrix, TabNavigation, Profile, Projects, Console } from './../components';
import './app.scss';

const App = () => {
  const [activeTab, setActiveTab] = useState('console');

  return (
    <ThemeProvider>
      <div className='app'>
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <Console active={activeTab === 'console'} tabId='console' setActiveTab={setActiveTab} />
        <Profile active={activeTab === 'profile'} tabId='profile' />
        <Projects active={activeTab === 'projects'} tabId='projects' />
        <Matrix />
      </div>
    </ThemeProvider>
  );
};

export default App;
