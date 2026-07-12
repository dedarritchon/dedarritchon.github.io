import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { AppContext } from './../App/AppContext';
import { Section, Eyebrow, SectionTitle, SectionIntro, Orb } from './shared';
import { Reveal } from './Reveal';
import { ProjectModal } from './ProjectModal';
import { projects, workExperience } from './../data/projects';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.75rem;
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

const Timeline = styled.div`
  position: relative;
  margin-top: 1rem;
  padding-left: 1.75rem;
  border-left: 2px solid ${({ theme }) => theme.border};
`;

const WorkItem = styled.div`
  position: relative;
  padding-bottom: 2rem;

  &:last-child {
    padding-bottom: 0;
  }

  &::before {
    content: '';
    position: absolute;
    left: calc(-1.75rem - 6px);
    top: 4px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 4px ${({ theme }) => `${theme.accent}33`};
  }
`;

const WorkHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem 0.75rem;
  margin-bottom: 0.4rem;
`;

const WorkTitle = styled.h3`
  color: ${({ theme }) => theme.primaryTextColor};
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0;
`;

const WorkCompany = styled.span`
  color: ${({ theme }) => theme.accent};
  font-size: 1rem;
  font-weight: 600;

  a {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s ease;
  }

  a:hover {
    border-bottom-color: currentColor;
  }
`;

const WorkDuration = styled.span`
  color: ${({ theme }) => theme.tertiaryTextColor};
  font-size: 0.85rem;
  margin-left: auto;
`;

const WorkDescription = styled.p`
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 0.95rem;
  line-height: 1.65;
  margin: 0;
`;

const StackIcon = () => (
  <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <rect x='3' y='3' width='7' height='7' /><rect x='14' y='3' width='7' height='7' />
    <rect x='14' y='14' width='7' height='7' /><rect x='3' y='14' width='7' height='7' />
  </svg>
);

export const Projects = () => {
  const { theme } = useContext(AppContext);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <Section id='proyectos'>
        <Orb
          data-scroll
          data-scroll-speed='3.5'
          color='#3B82F6'
          opacity={0.28}
          style={{ width: '380px', height: '380px', top: '-40px', left: '-140px' }}
        />
        <Reveal>
          <Eyebrow theme={theme}>Portafolio</Eyebrow>
          <SectionTitle theme={theme}>Proyectos destacados</SectionTitle>
          <SectionIntro theme={theme}>
            Una selección de productos reales que he construido. Haz clic en un
            proyecto para ver su galería de imágenes y más detalles.
          </SectionIntro>
        </Reveal>
        <Grid>
          {projects.map((project, i) => (
            <Reveal key={project.id} from='up' delay={i * 80}>
              <ProjectCard theme={theme} onClick={() => setSelected(project)}>
                <Thumb theme={theme}>
                  <img src={project.cover} alt={`Captura de ${project.title}`} />
                  <GalleryBadge theme={theme}>
                    <StackIcon /> {project.gallery.length} {project.gallery.length === 1 ? 'imagen' : 'imágenes'}
                  </GalleryBadge>
                </Thumb>
                <Body>
                  <ProjectTitle theme={theme}>{project.title}</ProjectTitle>
                  <ProjectSummary theme={theme}>{project.summary}</ProjectSummary>
                  <TechStack>
                    {project.tech.slice(0, 4).map((tech) => (
                      <TechTag key={tech} theme={theme}>{tech}</TechTag>
                    ))}
                  </TechStack>
                  <ViewButton theme={theme} onClick={(e) => { e.stopPropagation(); setSelected(project); }}>
                    Ver proyecto
                  </ViewButton>
                </Body>
              </ProjectCard>
            </Reveal>
          ))}
        </Grid>
      </Section>

      <Section id='experiencia'>
        <Reveal>
          <Eyebrow theme={theme}>Trayectoria</Eyebrow>
          <SectionTitle theme={theme}>Experiencia profesional</SectionTitle>
        </Reveal>
        <Timeline theme={theme}>
          {workExperience.map((work, i) => (
            <Reveal key={work.company} from='right' delay={i * 100}>
              <WorkItem theme={theme}>
                <WorkHeader>
                  <WorkTitle theme={theme}>{work.title}</WorkTitle>
                  <WorkCompany theme={theme}>
                    {'· '}
                    {work.link ? (
                      <a href={work.link} target='_blank' rel='noreferrer'>
                        {work.company}
                      </a>
                    ) : (
                      work.company
                    )}
                  </WorkCompany>
                  <WorkDuration theme={theme}>{work.duration}</WorkDuration>
                </WorkHeader>
                <WorkDescription theme={theme}>{work.description}</WorkDescription>
              </WorkItem>
            </Reveal>
          ))}
        </Timeline>
      </Section>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </>
  );
};
