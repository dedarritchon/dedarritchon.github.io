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
    filter: grayscale(50%) contrast(120%);
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
          <img src='https://via.placeholder.com/150x150/1a1a1a/00ff00?text=DD' alt='Daniel Darritchon' />
        </ProfileImage>
        <ProfileInfo>
          <Name theme={theme}>Daniel Darritchon</Name>
          <Title theme={theme}>Software Engineer & Code Hacker</Title>
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
