import React, { Component } from 'react';

import { AppContext } from './../App/AppContext';
import { GitHub, LinkedIn, Resume, Email } from './../icons';
import styled from 'styled-components';

const Container = styled.div`
  a,
  a:active,
  a:hover {
    outline: 0;
  }

  .button-container {
    display: inline-block;
    height: 6rem;
    width: 6rem;
    margin: 0 1.75rem;
  }

  .button {
    transition: color 0.5s linear;
    height: 6rem;
    width: 6rem;
    color: ${({ theme }) => theme.primaryTextColor};
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    text-decoration: none;
    position: relative;
    z-index: 1;
    border-radius: 25%;
  }

  .icon {
    height: 4.5rem;
    width: 4.5rem;
    padding: 1rem;
  }

  .icon_title {
    font-size: 1.25rem;
  }

  .button:hover {
    background-color: ${({ theme }) => theme.shadowColor};
    box-shadow: 0 0 0.75rem 0.75rem rgba(128, 128, 128, 0.25);
  }

  .button:active {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }

  .button-container .icon_title {
    display: none;
  }

  .button-container:hover .icon_title {
    display: initial;
  }

  .button-container:hover .icon {
    display: none;
  }

  @media only screen and (max-device-width: 820px) and (-webkit-min-device-pixel-ratio: 2) {
    .button-container {
      height: 5rem;
      width: 5rem;
      margin: 0 0.8rem;
    }

    .button {
      height: 5rem;
      width: 5rem;
    }

    .icon {
      height: 4rem;
      width: 4rem;
      padding: 0.5rem;
    }

    .icon_title {
      font-size: 1rem;
    }
  }
`;

export const Buttons = () => {
  const { theme } = useContext(AppContext);

  const DATA = [
    {
        href: "https://github.com/dedarritchon",
        aria: "Visit my GitHub profile to learn more about the projects I have created and contributed to",
        icon: <GitHub />,
        label: "Github",
    },
    {
        href: "https://www.linkedin.com/in/dedarritchon/",
        aria: "Visit my LinkedIn profile to learn more about my education and work experience",
        icon: <LinkedIn />,
        label: "LinkedIn",
    },
    {
        href: "https://drive.google.com/file/d/1ASG5JTR_lZI1b3scN3kKAgulgOTe4uNh/view?usp=sharing",
        aria: "Visit Google Drive to view and download a copy of my resume",
        icon: <Resume />,
        label: "Resume",
    },
    {
        href: "mailto:dedarritchon@uc.cl",
        aria: "Open a pre-addressed email prompt to me that you can fill out",
        icon: <Email />,
        label: "Email",
    }
  ];

  return (
    <Container theme={theme}>
      {DATA.map(({ href, aria, icon, label }, i) => (
        <span className='button-container' key={i}>
          <a className='button' href={href} target='_self' aria-label={aria} rel='noopener noreferrer'>
            <div className='icon'>{icon}</div>
            <span className='icon_title' data-v2={label}>{label}</span>
          </a>
        </span>
      ))}
    </Container>
  );
};
