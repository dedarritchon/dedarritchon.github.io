import React, { useContext, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { AppContext } from './../App/AppContext';
import { Section, Eyebrow, SectionTitle, SectionIntro, Orb } from './shared';
import { Reveal } from './Reveal';
import { HorizontalScroll } from './HorizontalScroll';
import { ProjectModal } from './ProjectModal';
import { projects, workExperience, pick } from './../data/projects';

const CardItem = styled.div`
  flex: 0 0 auto;
  width: 380px;
  scroll-snap-align: center;

  @media (max-width: 900px) {
    width: min(82vw, 340px);
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
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

const CurrentBadge = styled.span`
  color: ${({ theme }) => theme.accent};
  background: ${({ theme }) => `${theme.accent}1F`};
  border: 1px solid ${({ theme }) => `${theme.accent}55`};
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
`;

const Gantt = styled.div`
  margin: 1.5rem 0 2.75rem;
`;

const GanttRow = styled.div`
  display: grid;
  grid-template-columns: 190px 1fr;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 0.35rem;
    margin-bottom: 1.1rem;
  }
`;

const GanttLabel = styled.div`
  text-align: right;
  line-height: 1.25;

  @media (max-width: 640px) {
    text-align: left;
  }

  strong {
    display: block;
    color: ${({ theme }) => theme.primaryTextColor};
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.92rem;
    font-weight: 600;
  }

  span {
    color: ${({ theme }) => theme.tertiaryTextColor};
    font-size: 0.78rem;
  }
`;

const GanttTrack = styled.div`
  position: relative;
  height: 34px;
  border-radius: 999px;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  overflow: hidden;
`;

const GanttBar = styled.div`
  position: absolute;
  top: 4px;
  bottom: 4px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  padding: 0 0.7rem;
  font-size: 0.72rem;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  background: ${({ theme, $current }) =>
    $current ? theme.accent : `${theme.accent}99`};
  box-shadow: 0 4px 14px ${({ theme }) => `${theme.accent}44`};

  ${({ $current, theme }) =>
    $current &&
    `
    &::after {
      content: '';
      position: absolute;
      right: 8px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 0 0 3px ${theme.accent}66;
    }
  `}
`;

const GanttAxis = styled.div`
  display: grid;
  grid-template-columns: 190px 1fr;
  gap: 1rem;
  margin-top: 0.25rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const GanttYears = styled.div`
  grid-column: 2;
  position: relative;
  height: 1.2rem;

  @media (max-width: 640px) {
    grid-column: 1;
  }
`;

const GanttYear = styled.span`
  position: absolute;
  transform: translateX(-50%);
  color: ${({ theme }) => theme.tertiaryTextColor};
  font-size: 0.72rem;

  &:first-child {
    transform: translateX(0);
  }

  &:last-child {
    transform: translateX(-100%);
  }
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

const nudge = keyframes`
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
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

const ScrollIcon = () => (
  <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <line x1='5' y1='12' x2='19' y2='12' /><polyline points='12 5 19 12 12 19' />
  </svg>
);

export const Projects = () => {
  const { theme, lang, t } = useContext(AppContext);
  const [selected, setSelected] = useState(null);
  const p = t.projects;
  const ex = t.experience;

  const currentYear = new Date().getFullYear();
  const timed = workExperience.filter((w) => typeof w.start === 'number');
  const minYear = Math.min(...timed.map((w) => w.start));
  const maxYear = Math.max(...timed.map((w) => w.end ?? currentYear));
  const span = Math.max(maxYear - minYear, 1);
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);

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
          <Eyebrow theme={theme}>{p.eyebrow}</Eyebrow>
          <SectionTitle theme={theme}>{p.title}</SectionTitle>
          <SectionIntro theme={theme}>{p.intro}</SectionIntro>
          <ScrollHint theme={theme}>
            <ScrollIcon /> {p.scrollHint || 'Desplázate para recorrer los proyectos'}
          </ScrollHint>
        </Reveal>
      </Section>

      <HorizontalScroll>
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
      </HorizontalScroll>

      <Section id='experiencia'>
        <Reveal>
          <Eyebrow theme={theme}>{ex.eyebrow}</Eyebrow>
          <SectionTitle theme={theme}>{ex.title}</SectionTitle>
          <SectionIntro theme={theme}>{ex.intro}</SectionIntro>
        </Reveal>
        <Reveal>
          <Gantt>
            {timed.map((work) => {
              const end = work.end ?? currentYear;
              const left = ((work.start - minYear) / span) * 100;
              const width = Math.max(((end - work.start) / span) * 100, 6);
              return (
                <GanttRow key={`gantt-${work.company}`}>
                  <GanttLabel theme={theme}>
                    <strong>{work.company}</strong>
                    <span>{pick(work.title, lang)}</span>
                  </GanttLabel>
                  <GanttTrack theme={theme}>
                    <GanttBar
                      theme={theme}
                      $current={!work.end}
                      style={{ left: `${left}%`, width: `${width}%` }}
                    >
                      {pick(work.duration, lang)}
                    </GanttBar>
                  </GanttTrack>
                </GanttRow>
              );
            })}
            <GanttAxis>
              <GanttYears>
                {years.map((y) => (
                  <GanttYear
                    key={y}
                    theme={theme}
                    style={{ left: `${((y - minYear) / span) * 100}%` }}
                  >
                    {y}
                  </GanttYear>
                ))}
              </GanttYears>
            </GanttAxis>
          </Gantt>
        </Reveal>
        <Timeline theme={theme}>
          {workExperience.map((work, i) => (
            <Reveal key={work.company} from='right' delay={i * 100}>
              <WorkItem theme={theme}>
                <WorkHeader>
                  <WorkTitle theme={theme}>{pick(work.title, lang)}</WorkTitle>
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
                  <WorkDuration theme={theme}>
                    {work.current && <CurrentBadge theme={theme}>{ex.current}</CurrentBadge>}
                    {pick(work.duration, lang)}
                  </WorkDuration>
                </WorkHeader>
                <WorkDescription theme={theme}>{pick(work.description, lang)}</WorkDescription>
              </WorkItem>
            </Reveal>
          ))}
        </Timeline>
      </Section>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </>
  );
};
