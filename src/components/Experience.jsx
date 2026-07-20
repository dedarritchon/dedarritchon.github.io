import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';

import { AppContext } from './../App/AppContext';
import { Section, Eyebrow, SectionTitle, SectionIntro } from './shared';
import { Reveal } from './Reveal';
import { workExperience, pick } from './../data/projects';

const ExperienceSection = styled(Section)`
  padding-top: 1.75rem;

  @media (max-width: 768px) {
    padding-top: 1.25rem;
  }

  ${SectionIntro} {
    margin-bottom: 0;
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
  position: relative;
  margin: 1.5rem 0 2.75rem;
  padding-top: 3.25rem;
`;

const GanttLayout = styled.div`
  display: grid;
  grid-template-columns: 190px minmax(0, 1fr);
  gap: 0.75rem 1rem;
  align-items: center;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }
`;

const GanttLabel = styled.div`
  text-align: right;
  line-height: 1.25;

  @media (max-width: 640px) {
    text-align: left;
    margin-top: 0.55rem;
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

const TrackCell = styled.div`
  position: relative;
  min-width: 0;
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
`;

const AxisRow = styled.div`
  display: grid;
  grid-template-columns: 190px minmax(0, 1fr);
  gap: 1rem;
  margin-top: 0.35rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Axis = styled.div`
  position: relative;
  height: 1.35rem;
  grid-column: 2;

  @media (max-width: 640px) {
    grid-column: 1;
  }
`;

const GanttYear = styled.span`
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  color: ${({ theme }) => theme.tertiaryTextColor};
  font-size: 0.72rem;

  &:first-of-type {
    transform: translateX(0);
  }
`;

const TodayOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 1.7rem;
  left: calc(190px + 1rem);
  pointer-events: none;
  z-index: 2;

  @media (max-width: 640px) {
    left: 0;
  }
`;

const TodayLine = styled.div`
  position: absolute;
  top: 2.85rem;
  bottom: 0;
  width: 2px;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.accent};
  opacity: 0.9;
  box-shadow: 0 0 14px ${({ theme }) => `${theme.accent}88`};
`;

const TodayTooltip = styled.div`
  position: absolute;
  top: 0;
  z-index: 3;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  padding: 0.6rem 0.95rem;
  border-radius: 12px;
  color: #fff;
  background: ${({ theme }) => theme.accent};
  font-family: 'Space Grotesk', sans-serif;
  line-height: 1.15;
  white-space: nowrap;
  box-shadow: 0 12px 32px ${({ theme }) => `${theme.accent}55`};

  strong {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    opacity: 0.92;
  }

  span {
    font-size: 1rem;
    font-weight: 700;
  }

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -7px;
    transform: translateX(-50%);
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 7px solid ${({ theme }) => theme.accent};
  }
`;

const WorkDescription = styled.p`
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 0.95rem;
  line-height: 1.65;
  margin: 0;
`;

const yearStart = (year) => year;
const yearEnd = (year) => year + 1;
const toFraction = (date) =>
  date.getFullYear() + (date.getMonth() + date.getDate() / 31) / 12;

const formatShortDate = (date, lang) =>
  new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'es-CL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);

const formatBarRange = (work) => {
  if (work.end) {return `${work.start} – ${work.end}`;}
  return `${work.start} –`;
};

export const Experience = () => {
  const { theme, lang, t } = useContext(AppContext);
  const ex = t.experience;

  const { now, timed, min, span, years, todayPct, asOfLabel } = useMemo(() => {
    const nowDate = new Date();
    const nowFrac = toFraction(nowDate);
    const rows = workExperience.filter((w) => typeof w.start === 'number');
    const minY = Math.min(...rows.map((w) => yearStart(w.start)));
    const maxY = Math.max(nowFrac, ...rows.map((w) => (w.end ? yearEnd(w.end) : nowFrac)));
    const range = Math.max(maxY - minY, 1);
    // Keep year ticks clear of the today marker at the end.
    const yearTicks = Array.from(
      { length: Math.floor(nowFrac) - Math.floor(minY) },
      (_, i) => Math.floor(minY) + i,
    );

    return {
      now: nowDate,
      timed: rows,
      min: minY,
      span: range,
      years: yearTicks,
      todayPct: ((nowFrac - minY) / range) * 100,
      asOfLabel: formatShortDate(nowDate, lang),
    };
  }, [lang]);

  return (
    <ExperienceSection id='experiencia'>
      <Reveal>
        <Eyebrow theme={theme}>{ex.eyebrow}</Eyebrow>
        <SectionTitle theme={theme}>{ex.title}</SectionTitle>
        <SectionIntro theme={theme}>{ex.intro}</SectionIntro>
      </Reveal>
      <Reveal>
        <Gantt>
          <TodayOverlay>
            <TodayTooltip theme={theme} style={{ left: `${todayPct}%` }}>
              <strong>{ex.today}</strong>
              <span>{asOfLabel}</span>
            </TodayTooltip>
            <TodayLine theme={theme} style={{ left: `${todayPct}%` }} />
          </TodayOverlay>
          <GanttLayout>
            {timed.map((work) => {
              const start = yearStart(work.start);
              const end = work.end ? yearEnd(work.end) : toFraction(now);
              const left = ((start - min) / span) * 100;
              const width = Math.max(((end - start) / span) * 100, 6);
              return (
                <React.Fragment key={work.company}>
                  <GanttLabel theme={theme}>
                    <strong>{work.company}</strong>
                    <span>{pick(work.title, lang)}</span>
                  </GanttLabel>
                  <TrackCell>
                    <GanttTrack theme={theme}>
                      <GanttBar
                        theme={theme}
                        $current={!work.end}
                        style={{ left: `${left}%`, width: `${width}%` }}
                      >
                        {formatBarRange(work)}
                      </GanttBar>
                    </GanttTrack>
                  </TrackCell>
                </React.Fragment>
              );
            })}
          </GanttLayout>
          <AxisRow>
            <Axis>
              {years.map((y) => (
                <GanttYear
                  key={y}
                  theme={theme}
                  style={{ left: `${((y - min) / span) * 100}%` }}
                >
                  {y}
                </GanttYear>
              ))}
            </Axis>
          </AxisRow>
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
                  {work.end
                    ? pick(work.duration, lang)
                    : `${work.start} – ${asOfLabel}`}
                </WorkDuration>
              </WorkHeader>
              <WorkDescription theme={theme}>{pick(work.description, lang)}</WorkDescription>
            </WorkItem>
          </Reveal>
        ))}
      </Timeline>
    </ExperienceSection>
  );
};

export default Experience;
