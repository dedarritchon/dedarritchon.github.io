import React, { useContext } from 'react';
import styled from 'styled-components';

import { AppContext } from './../App/AppContext';
import { Buttons } from './Buttons';
import { Spotify } from './Spotify';

const ProfileContainer = styled.div`
  display: ${({ active }) => active ? 'block' : 'none'};
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: left;
  position: relative;
  z-index: 10;
  background: rgba(0, 0, 0, 0.55);
  border-radius: 10px;
  backdrop-filter: blur(10px);
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media only screen and (max-device-width: 820px) and (-webkit-min-device-pixel-ratio: 2) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border: 3px solid ${({ theme }) => theme.primaryTextColor};
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  background: ${({ theme }) => theme.shadowColor};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, ${({ theme }) => theme.primaryTextColor}20 50%, transparent 70%);
    animation: scan 2s linear infinite;
  }
  
  @keyframes scan {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const Name = styled.h1`
  color: ${({ theme }) => theme.primaryTextColor};
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
  font-family: 'Courier New', monospace;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.primaryTextColor};
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0 0 2rem 0;
  font-family: 'Courier New', monospace;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.primaryTextColor};
  font-size: 1.3rem;
  margin: 0 0 1rem 0;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 2px solid ${({ theme }) => theme.primaryTextColor};
  padding-bottom: 0.5rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const SkillItem = styled.div`
  background: ${({ theme }) => theme.shadowColor};
  border: 1px solid ${({ theme }) => theme.primaryTextColor};
  padding: 1rem;
  border-radius: 5px;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 0 15px ${({ theme }) => theme.primaryTextColor}40;
    transform: translateY(-2px);
  }
`;

const SkillName = styled.div`
  color: ${({ theme }) => theme.primaryTextColor};
  font-weight: bold;
  font-family: 'Courier New', monospace;
  margin-bottom: 0.5rem;
`;

const SkillLevel = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ level }) => level}%;
    background: linear-gradient(90deg, ${({ theme }) => theme.primaryTextColor}, ${({ theme }) => theme.secondaryTextColor});
    animation: fillBar 1s ease-out;
  }
  
  @keyframes fillBar {
    from { width: 0%; }
    to { width: ${({ level }) => level}%; }
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const SpotifyContainer = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

export const Profile = ({ active, tabId }) => {
  const { theme } = useContext(AppContext);

  const skills = [
    { name: 'JavaScript/TypeScript', level: 90 },
    { name: 'React/Next.js', level: 85 },
    { name: 'Node.js/Express', level: 80 },
    { name: 'Python/Django', level: 75 },
    { name: 'SQL/PostgreSQL', level: 85 },
    { name: 'Git/GitHub', level: 90 },
    { name: 'Docker/Kubernetes', level: 70 },
    { name: 'AWS/Cloud Services', level: 75 }
  ];

  return (
    <ProfileContainer active={active} theme={theme}>
      <ProfileHeader theme={theme}>
        <ProfileImage theme={theme}>
          <img src='data:image/jpeg;base64,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' alt='Daniel Darritchon' />
        </ProfileImage>
        <ProfileInfo>
          <Name theme={theme}>Daniel Darritchon</Name>
          <Title theme={theme}>Software Engineer</Title>
          <Description theme={theme}>
            Passionate about creating innovative solutions and pushing the boundaries of technology.
            I specialize in full-stack development with a focus on scalable, maintainable code.
            When I'm not coding, you'll find me exploring new technologies or contributing to open-source projects.
          </Description>
        </ProfileInfo>
      </ProfileHeader>

      <ButtonsContainer>
        <Buttons />
      </ButtonsContainer>

      <Section>
        <SectionTitle theme={theme}>Technical Skills</SectionTitle>
        <SkillsGrid>
          {skills.map((skill, index) => (
            <SkillItem key={index} theme={theme}>
              <SkillName theme={theme}>{skill.name}</SkillName>
              <SkillLevel level={skill.level} theme={theme} />
            </SkillItem>
          ))}
        </SkillsGrid>
      </Section>

      <Section>
        <SectionTitle theme={theme}>About Me</SectionTitle>
        <Description theme={theme}>
          I'm a software engineer with a passion for clean code and innovative solutions.
          My journey in tech started with curiosity and has evolved into a career focused on
          building robust, scalable applications. I believe in continuous learning and
          staying up-to-date with the latest technologies and best practices.
        </Description>
      </Section>

      <SpotifyContainer>
        <Spotify />
      </SpotifyContainer>
    </ProfileContainer>
  );
};
