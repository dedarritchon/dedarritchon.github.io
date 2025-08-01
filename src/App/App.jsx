import React, { useState } from 'react';

import { ThemeProvider } from './AppContext';
import { TabNavigation, Profile, Projects, Console } from './../components';
import { Matrix } from './../components/Matrix';
import './app.scss';

const App = () => {
  const [activeTab, setActiveTab] = useState('terminal');

  return (
    <ThemeProvider>
      <div className='app'>
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <Console active={activeTab === 'terminal'} tabId='terminal' setActiveTab={setActiveTab} />
        <Profile active={activeTab === 'profile'} tabId='profile' />
        <Projects active={activeTab === 'projects'} tabId='projects' />
        <Matrix />
      </div>
    </ThemeProvider>
  );
};

export default App;
