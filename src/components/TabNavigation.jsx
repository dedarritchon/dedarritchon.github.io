import React, { useContext } from 'react';
import styled from 'styled-components';

import { AppContext } from './../App/AppContext';

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  gap: 1rem;
  z-index: 10;
  position: relative;
`;

const TabButton = styled.button`
  background: ${({ active, theme }) => active ? theme.shadowColor : 'transparent'};
  border: 2px solid ${({ theme }) => theme.primaryTextColor};
  color: ${({ theme }) => theme.primaryTextColor};
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-family: 'Courier New', monospace;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background: ${({ theme }) => theme.shadowColor};
    box-shadow: 0 0 20px ${({ theme }) => theme.primaryTextColor}40;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.primaryTextColor}20, transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  @media only screen and (max-device-width: 820px) and (-webkit-min-device-pixel-ratio: 2) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
`;

export const TabNavigation = ({ children, activeTab, setActiveTab }) => {
  const { theme } = useContext(AppContext);

  const tabs = [
    { id: 'console', label: 'Console' },
    { id: 'profile', label: 'Profile' },
    { id: 'projects', label: 'Projects' },
  ];

  return (
    <TabContainer theme={theme}>
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          active={activeTab === tab.id}
          theme={theme}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </TabButton>
      ))}
    </TabContainer>
  );
};
