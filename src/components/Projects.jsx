import React, { useContext, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { AppContext } from './../App/AppContext';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px ${({ theme }) => theme.primaryTextColor}40;
  }
  50% {
    box-shadow: 0 0 20px ${({ theme }) => theme.primaryTextColor}, 0 0 30px ${({ theme }) => theme.primaryTextColor}60;
  }
`;

const typing = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const blink = keyframes`
  0%, 50% {
    border-color: transparent;
  }
  51%, 100% {
    border-color: ${({ theme }) => theme.primaryTextColor};
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const ProjectsContainer = styled.div`
  display: ${({ active }) => active ? 'block' : 'none'};
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 10;
  background: rgba(0, 0, 0, 0.75);
  border-radius: 15px;
  backdrop-filter: blur(15px);
  border: 1px solid ${({ theme }) => theme.primaryTextColor}30;
  animation: ${fadeInUp} 0.8s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, 
      ${({ theme }) => theme.primaryTextColor}20, 
      ${({ theme }) => theme.secondaryTextColor}20, 
      ${({ theme }) => theme.primaryTextColor}20);
    border-radius: 16px;
    z-index: -1;
    animation: ${rotate} 20s linear infinite;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ProjectCard = styled.div`
  background: ${({ theme }) => theme.shadowColor};
  border: 2px solid ${({ theme }) => theme.primaryTextColor};
  border-radius: 15px;
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.6s ease-out ${({ index }) => index * 0.1}s both;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, 
      ${({ theme }) => theme.primaryTextColor}, 
      ${({ theme }) => theme.secondaryTextColor}, 
      ${({ theme }) => theme.primaryTextColor});
    background-size: 200% 100%;
    animation: ${slideInLeft} 2s ease-out, ${glow} 3s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      ${({ theme }) => theme.primaryTextColor}10, 
      transparent);
    transition: left 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 
      0 12px 24px ${({ theme }) => theme.primaryTextColor}30,
      0 0 20px ${({ theme }) => theme.primaryTextColor}15;
    border-color: ${({ theme }) => theme.secondaryTextColor};
  }
  
  &:hover::after {
    left: 100%;
  }
  
  &:hover::before {
    background-position: 200% 0;
    transition: background-position 0.6s ease;
  }
`;

const ProjectTitle = styled.h3`
  color: ${({ theme }) => theme.primaryTextColor};
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.secondaryTextColor};
    transition: width 0.6s ease;
  }
  
  ${ProjectCard}:hover &::after {
    width: 100%;
  }
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 1rem;
  line-height: 1.7;
  margin: 0 0 1.5rem 0;
  font-family: 'Courier New', monospace;
  transition: color 0.3s ease;
  
  ${ProjectCard}:hover & {
    color: ${({ theme }) => theme.primaryTextColor}90;
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 220px;
  background: ${({ theme }) => theme.shadowColor}50;
  border: 2px solid ${({ theme }) => theme.primaryTextColor}40;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      transparent 30%, 
      ${({ theme }) => theme.primaryTextColor}08 50%, 
      transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.5s ease;
    z-index: 2;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    transition: all 0.3s ease;
    filter: grayscale(20%);
  }
  
  ${ProjectCard}:hover & {
    border-color: ${({ theme }) => theme.secondaryTextColor};
    box-shadow: 0 8px 20px ${({ theme }) => theme.primaryTextColor}25;
    
    &::before {
      transform: translateX(100%);
    }
    
    img {
      transform: scale(1.02);
      filter: grayscale(0%);
    }
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background: ${({ theme }) => theme.primaryTextColor}15;
  color: ${({ theme }) => theme.primaryTextColor};
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-family: 'Courier New', monospace;
  border: 1px solid ${({ theme }) => theme.primaryTextColor}50;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      ${({ theme }) => theme.primaryTextColor}20, 
      transparent);
    transition: left 0.4s ease;
  }
  
  &:hover {
    background: ${({ theme }) => theme.primaryTextColor}25;
    border-color: ${({ theme }) => theme.secondaryTextColor};
    transform: translateY(-1px);
    box-shadow: 0 3px 10px ${({ theme }) => theme.primaryTextColor}30;
    
    &::before {
      left: 100%;
    }
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled.a`
  color: ${({ theme }) => theme.primaryTextColor};
  text-decoration: none;
  padding: 0.6rem 1.2rem;
  border: 2px solid ${({ theme }) => theme.primaryTextColor};
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  font-weight: bold;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
  display: ${({ hidden }) => hidden ? 'none' : 'inline-block'};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.primaryTextColor};
    transition: left 0.25s ease;
    z-index: -1;
  }
  
  &:hover {
    color: ${({ theme }) => theme.shadowColor};
    transform: translateY(-2px);
    box-shadow: 0 6px 15px ${({ theme }) => theme.primaryTextColor}40;
    
    &::before {
      left: 0;
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.primaryTextColor};
  font-size: 2.2rem;
  margin: 0 0 1.5rem 0;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-align: center;
  position: relative;
  animation: ${fadeInUp} 0.8s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, 
      ${({ theme }) => theme.primaryTextColor}, 
      ${({ theme }) => theme.secondaryTextColor}, 
      ${({ theme }) => theme.primaryTextColor});
    animation: ${typing} 2s ease-out 0.5s forwards;
  }
  
  &::after {
    content: '|';
    animation: ${blink} 1s infinite;
    margin-left: 5px;
  }
`;

const WorkSection = styled.div`
  margin-top: 4rem;
  animation: ${fadeInUp} 0.8s ease-out 0.3s both;
`;

const WorkCard = styled.div`
  background: ${({ theme }) => theme.shadowColor};
  border: 2px solid ${({ theme }) => theme.primaryTextColor};
  border-radius: 12px;
  padding: 1.8rem;
  margin-bottom: 1.8rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.6s ease-out ${({ index }) => index * 0.15}s both;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, 
      ${({ theme }) => theme.primaryTextColor}, 
      ${({ theme }) => theme.secondaryTextColor});
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 50%, 
      ${({ theme }) => theme.primaryTextColor}03 0%, 
      transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 
      0 10px 25px ${({ theme }) => theme.primaryTextColor}30,
      0 0 15px ${({ theme }) => theme.primaryTextColor}15;
    border-color: ${({ theme }) => theme.secondaryTextColor};
    
    &::before {
      transform: scaleX(1);
    }
    
    &::after {
      opacity: 1;
    }
  }
`;

const WorkTitle = styled.h3`
  color: ${({ theme }) => theme.primaryTextColor};
  font-size: 1.4rem;
  margin: 0 0 0.5rem 0;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  transition: color 0.3s ease;
  
  ${WorkCard}:hover & {
    color: ${({ theme }) => theme.secondaryTextColor};
  }
`;

const WorkCompany = styled.h4`
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
  font-family: 'Courier New', monospace;
  font-weight: normal;
  transition: color 0.3s ease;
  
  ${WorkCard}:hover & {
    color: ${({ theme }) => theme.primaryTextColor}90;
  }
`;

const WorkDuration = styled.span`
  color: ${({ theme }) => theme.primaryTextColor}80;
  font-size: 0.95rem;
  font-family: 'Courier New', monospace;
  display: block;
  margin-bottom: 1rem;
  font-weight: bold;
  transition: color 0.3s ease;
  
  ${WorkCard}:hover & {
    color: ${({ theme }) => theme.secondaryTextColor};
  }
`;

const WorkDescription = styled.p`
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 1rem;
  line-height: 1.7;
  margin: 0;
  font-family: 'Courier New', monospace;
  transition: color 0.3s ease;
  
  ${WorkCard}:hover & {
    color: ${({ theme }) => theme.primaryTextColor}90;
  }
`;

// Particle effect component
const ParticleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
`;

const Particle = styled.div`
  position: absolute;
  width: 2px;
  height: 2px;
  background: ${({ theme }) => theme.primaryTextColor};
  border-radius: 50%;
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay}s;
  opacity: 0.6;
  
  &:nth-child(odd) {
    animation-duration: 8s;
  }
  
  &:nth-child(even) {
    animation-duration: 4s;
  }
`;

export const Projects = ({ active, tabId }) => {
  const { theme } = useContext(AppContext);

  const projects = [
    {
      title: 'MiCrecimien.to',
      description: 'A pediatric growth monitoring platform that modernizes and digitizes pediatric consultations by replacing traditional paper-based growth charts with a digital solution. The platform improves the current system of growth curves (the classic notebook with paper graphs) by providing a modern, accessible digital interface for tracking children\'s development.',
      image: '/images/micrecimiento.png',
      tech: ['FastAPI', 'Python', 'Database', 'WhatsApp API', 'Sendgrid'],
      liveLink: 'https://micrecimien.to/show/example',
      //githubLink: 'https://github.com/dedarritchon/micrecimien-to'
    },
    {
      title: 'Agendamiento.accountability.cl',
      description: 'A comprehensive event scheduling platform that enables users to organize events, confirm attendees, send satisfaction surveys, and send reminders via WhatsApp and email. The platform streamlines event management and communication processes.',
      image: '/images/agendamiento.png',
      tech: ['Flask', 'Python', 'WhatsApp API', 'Sendgrid', 'Database'],
      liveLink: 'https://agendamiento.accountability.cl',
      //githubLink: 'https://github.com/dedarritchon/agendamiento-platform'
    },
    {
      title: 'Front Spotify Plugin',
      description: 'A browser extension that allows users to manage their Spotify music playback without needing to change tabs on Front. This plugin enhances productivity by providing music control directly within the Front interface. Approved by Spotify Developers.',
      image: '/images/spotify.png',
      tech: ['JavaScript', 'Browser Extension API', 'Spotify Web API', 'Front Integration'],
      liveLink: 'https://front.com/integrations?search=spotify&category=all',
      //githubLink: 'https://github.com/dedarritchon/front-spotify-plugin'
    },
    {
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with React and styled-components. Features dark/light theme switching, animated components, and a hackerish aesthetic.',
      image: '/images/portfolio.png',
      tech: ['React', 'Styled-Components', 'JavaScript', 'CSS3'],
      liveLink: 'https://dedarritchon.github.io',
      githubLink: 'https://github.com/dedarritchon/dedarritchon.github.io'
    }
  ];

  const workExperience = [
    {
      title: 'Senior Software Engineer',
      company: 'Front',
      duration: '1 year',
      description: 'Led development of innovative software solutions and integrations, including the Front Spotify Plugin that enhances user productivity by providing music control directly within the Front interface.'
    },
    {
      title: 'Software Engineer',
      company: 'Adereso',
      duration: '4 years',
      description: 'Developed and maintained various software applications, contributing to the company\'s digital transformation initiatives and technical infrastructure improvements.'
    }
  ];

  return (
    <ProjectsContainer active={active} theme={theme}>
      <SectionTitle theme={theme}>My Projects</SectionTitle>
      <ProjectsGrid>
        {projects.map((project, index) => (
          <ProjectCard key={index} theme={theme} index={index}>
            <ProjectImage theme={theme}>
              <img src={project.image} alt={project.title} />
            </ProjectImage>
            <ProjectTitle theme={theme}>{project.title}</ProjectTitle>
            <ProjectDescription theme={theme}>{project.description}</ProjectDescription>
            <TechStack>
              {project.tech.map((tech, techIndex) => (
                <TechTag key={techIndex} theme={theme}>{tech}</TechTag>
              ))}
            </TechStack>
            <ProjectLinks>
              <ProjectLink href={project.liveLink} target='_blank' rel='noopener noreferrer' theme={theme}>
                Live Demo
              </ProjectLink>
              <ProjectLink href={project.githubLink} target='_blank' rel='noopener noreferrer' theme={theme} hidden={!project.githubLink}>
                GitHub
              </ProjectLink>
            </ProjectLinks>
          </ProjectCard>
        ))}
      </ProjectsGrid>

      <WorkSection>
        <SectionTitle theme={theme}>Work Experience</SectionTitle>
        {workExperience.map((work, index) => (
          <WorkCard key={index} theme={theme} index={index}>
            <WorkTitle theme={theme}>{work.title}</WorkTitle>
            <WorkCompany theme={theme}>{work.company}</WorkCompany>
            <WorkDuration theme={theme}>{work.duration}</WorkDuration>
            <WorkDescription theme={theme}>{work.description}</WorkDescription>
          </WorkCard>
        ))}
      </WorkSection>
    </ProjectsContainer>
  );
};
