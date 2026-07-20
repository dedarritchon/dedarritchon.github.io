import React, { useContext, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { AppContext } from './../App/AppContext';
import { Section, Eyebrow, SectionTitle, SectionIntro, Orb } from './shared';
import { Reveal } from './Reveal';
import { HorizontalScroll } from './HorizontalScroll';
import { ProjectModal } from './ProjectModal';
import { projects, pick } from './../data/projects';

const CardItem = styled.div`
  flex: 0 0 auto;
  width: 440px;
  scroll-snap-align: center;

  @media (max-width: 900px) {
    width: min(88vw, 380px);
  }

  article:hover {
    transform: none;
  }
`;

const ProjectCard = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.borderStrong};
    box-shadow: 0 18px 44px ${({ theme }) => theme.shadowColor};
  }
`;

const Thumb = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${ProjectCard}:hover & img {
    transform: scale(1.04);
  }
`;

const GalleryBadge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: #fff;
  background: rgba(10, 14, 39, 0.65);
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 999px;
  padding: 0.25rem 0.7rem;
  font-size: 0.75rem;
  font-family: 'Space Grotesk', sans-serif;
  backdrop-filter: blur(6px);
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  color: ${({ theme }) => theme.primaryTextColor};
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.6rem 0;
`;

const ProjectSummary = styled.p`
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 0.95rem;
  line-height: 1.65;
  margin: 0 0 1.25rem 0;
  flex: 1;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
`;

const TechTag = styled.span`
  color: ${({ theme }) => theme.tertiaryTextColor};
  background: ${({ theme }) => theme.surfaceHover};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 999px;
  padding: 0.3rem 0.75rem;
  font-size: 0.78rem;
`;

const ViewButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  align-self: flex-start;
  color: ${({ theme }) => theme.primaryTextColor};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.borderStrong};
  border-radius: 10px;
  padding: 0.55rem 1rem;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.surfaceHover};
    border-color: ${({ theme }) => theme.accent};
  }
`;

const StackIcon = () => (
  <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <rect x='3' y='3' width='7' height='7' /><rect x='14' y='3' width='7' height='7' />
    <rect x='14' y='14' width='7' height='7' /><rect x='3' y='14' width='7' height='7' />
  </svg>
);

const nudge = keyframes`
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
`;

const Header = styled(Section)`
  padding-top: 3.5rem;
  padding-bottom: 0.5rem;

  @media (max-width: 768px) {
    padding-top: 2.75rem;
    padding-bottom: 0.35rem;
  }
`;

const Intro = styled(SectionIntro)`
  margin-bottom: 0.6rem;
`;

const ScrollHint = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.tertiaryTextColor};
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  letter-spacing: 0.3px;

  svg {
    color: ${({ theme }) => theme.accent};
    animation: ${nudge} 1.6s ease-in-out infinite;
  }
`;

const Carousel = styled(HorizontalScroll)`
  margin-top: 0.75rem;
  margin-bottom: -3.5rem;

  @media (max-width: 768px) {
    margin-top: 0.5rem;
    margin-bottom: -2rem;
  }
`;

const ScrollIcon = () => (
  <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <line x1='5' y1='12' x2='19' y2='12' /><polyline points='12 5 19 12 12 19' />
  </svg>
);

export const Projects = () => {
  const { theme, lang, t } = useContext(AppContext);
  const [selected, setSelected] = useState(null);
  const p = t.projects;

  return (
    <>
      <Header id='proyectos'>
        <Orb
          data-scroll
          data-scroll-speed='3.5'
          color='#3B82F6'
          opacity={0.28}
          style={{ width: '380px', height: '380px', top: '-40px', left: '-140px' }}
        />
        <Reveal>
          <Eyebrow theme={theme}>{p.eyebrow}</Eyebrow>
          <SectionTitle theme={theme}>{p.title}</SectionTitle>
          <Intro theme={theme}>{p.intro}</Intro>
          <ScrollHint theme={theme}>
            <ScrollIcon /> {p.scrollHint || 'Desplázate para recorrer los proyectos'}
          </ScrollHint>
        </Reveal>
      </Header>

      <Carousel>
        {projects.map((project) => (
          <CardItem key={project.id}>
            <ProjectCard theme={theme} onClick={() => setSelected(project)}>
              <Thumb theme={theme}>
                <img src={project.cover} alt={project.title} />
                <GalleryBadge theme={theme}>
                  <StackIcon /> {project.gallery.length} {project.gallery.length === 1 ? p.imageSingular : p.imagePlural}
                </GalleryBadge>
              </Thumb>
              <Body>
                <ProjectTitle theme={theme}>{project.title}</ProjectTitle>
                <ProjectSummary theme={theme}>{pick(project.summary, lang)}</ProjectSummary>
                <TechStack>
                  {project.tech.slice(0, 4).map((tech) => (
                    <TechTag key={tech} theme={theme}>{tech}</TechTag>
                  ))}
                </TechStack>
                <ViewButton theme={theme} onClick={(e) => { e.stopPropagation(); setSelected(project); }}>
                  {p.viewProject}
                </ViewButton>
              </Body>
            </ProjectCard>
          </CardItem>
        ))}
      </Carousel>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </>
  );
};
