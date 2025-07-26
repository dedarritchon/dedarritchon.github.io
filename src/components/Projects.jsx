import React, { useContext } from 'react';
import styled from 'styled-components';

import { AppContext } from './../App/AppContext';

const ProjectsContainer = styled.div`
  display: ${({ active }) => active ? 'block' : 'none'};
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 10;
  background: rgba(0, 0, 0, 0.55);
  border-radius: 10px;
  backdrop-filter: blur(10px);
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
  border-radius: 10px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${({ theme }) => theme.primaryTextColor}, ${({ theme }) => theme.secondaryTextColor});
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px ${({ theme }) => theme.primaryTextColor}30;
    border-color: ${({ theme }) => theme.secondaryTextColor};
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.primaryTextColor}10, transparent);
    transition: left 0.6s;
  }
  
  &:hover::after {
    left: 100%;
  }
`;

const ProjectTitle = styled.h3`
  color: ${({ theme }) => theme.primaryTextColor};
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 1rem;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  font-family: 'Courier New', monospace;
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  background: ${({ theme }) => theme.shadowColor}50;
  border: 1px solid ${({ theme }) => theme.primaryTextColor}30;
  border-radius: 5px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Courier New', monospace;
  color: ${({ theme }) => theme.primaryTextColor};
  font-size: 0.9rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      ${({ theme }) => theme.primaryTextColor}10 2px,
      ${({ theme }) => theme.primaryTextColor}10 4px
    );
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background: ${({ theme }) => theme.primaryTextColor}20;
  color: ${({ theme }) => theme.primaryTextColor};
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-family: 'Courier New', monospace;
  border: 1px solid ${({ theme }) => theme.primaryTextColor}40;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled.a`
  color: ${({ theme }) => theme.primaryTextColor};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.primaryTextColor};
  border-radius: 5px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primaryTextColor};
    color: ${({ theme }) => theme.shadowColor};
    transform: translateY(-2px);
  }
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.primaryTextColor};
  font-size: 2rem;
  margin: 0 0 1rem 0;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  border-bottom: 2px solid ${({ theme }) => theme.primaryTextColor};
  padding-bottom: 1rem;
`;

export const Projects = ({ active, tabId }) => {
  const { theme } = useContext(AppContext);

  const projects = [
    {
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with React and styled-components. Features dark/light theme switching, animated components, and a hackerish aesthetic.',
      image: 'Portfolio',
      tech: ['React', 'Styled-Components', 'JavaScript', 'CSS3'],
      liveLink: '#',
      githubLink: 'https://github.com/dedarritchon/dedarritchon.github.io'
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with user authentication, product management, shopping cart, and payment integration using Stripe.',
      image: 'E-Commerce',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
      liveLink: '#',
      githubLink: 'https://github.com/dedarritchon/ecommerce-platform'
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      image: 'Task Manager',
      tech: ['React', 'Firebase', 'TypeScript', 'Tailwind CSS'],
      liveLink: '#',
      githubLink: 'https://github.com/dedarritchon/task-manager'
    },
    {
      title: 'Weather Dashboard',
      description: 'Real-time weather application with location-based forecasts, interactive maps, and detailed weather analytics.',
      image: 'Weather App',
      tech: ['JavaScript', 'OpenWeather API', 'Chart.js', 'HTML5'],
      liveLink: '#',
      githubLink: 'https://github.com/dedarritchon/weather-dashboard'
    },
    {
      title: 'Blog Platform',
      description: 'A modern blogging platform with markdown support, user authentication, comments system, and admin dashboard.',
      image: 'Blog Platform',
      tech: ['Next.js', 'PostgreSQL', 'Prisma', 'NextAuth'],
      liveLink: '#',
      githubLink: 'https://github.com/dedarritchon/blog-platform'
    },
    {
      title: 'Chat Application',
      description: 'Real-time chat application with private messaging, group chats, file sharing, and message encryption.',
      image: 'Chat App',
      tech: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
      liveLink: '#',
      githubLink: 'https://github.com/dedarritchon/chat-app'
    }
  ];

  return (
    <ProjectsContainer active={active} theme={theme}>
      <SectionTitle theme={theme}>My Projects</SectionTitle>
      <ProjectsGrid>
        {projects.map((project, index) => (
          <ProjectCard key={index} theme={theme}>
            <ProjectImage theme={theme}>
              {project.image}
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
              <ProjectLink href={project.githubLink} target='_blank' rel='noopener noreferrer' theme={theme}>
                GitHub
              </ProjectLink>
            </ProjectLinks>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsContainer>
  );
};
