import React, { useContext } from 'react';
import styled from 'styled-components';

import { AppContext } from './../App/AppContext';

const F = {
  Container: styled.div`
    color: white;
    font-size: 0.75rem;
    padding-right: ${({ isMobile }) => (isMobile ? '1.5rem' : '1rem')};
    z-index: 1;
    position: absolute;
    bottom: 0px;
    padding: 20px;
  `,
  Text: styled.p`
    transition: color 0.5s linear;
    color: ${({ theme }) => theme.tertiaryTextColor};
  `,
  Link: styled.a`
    transition: color 0.5s linear;
    text-decoration: none;
    color: ${({ theme }) => theme.secondaryTextColor};
  `,
};

export const Spotify = () => {
  const { theme, isMobile } = useContext(AppContext);

  return (
    <F.Container isMobile={isMobile}>
      <a href="https://open.spotify.com/user/22usjhj23c7c4s52lzjexdtmy">
        <img className="spotify-image" src="https://dedarritchon.vercel.app/api/spotify" target="_blank" alt="Listening on Spotify" />
      </a>
      <h2 className="spotify-text" aria-label="Now Listening on Spotify">Now Listening on Spotify ☝️</h2>
    </F.Container>
  );
};
