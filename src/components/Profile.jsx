import React, { useContext } from 'react';
import styled from 'styled-components';

import { AppContext } from './../App/AppContext';
import { Section, Eyebrow, SectionTitle } from './shared';
import { Reveal } from './Reveal';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Bio = styled.p`
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 1.05rem;
  line-height: 1.8;
  margin: 0 0 1.25rem 0;
`;

const SkillsPanel = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 1.75rem;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
`;

const PanelTitle = styled.h3`
  color: ${({ theme }) => theme.primaryTextColor};
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.05rem;
  font-weight: 600;
  margin: 0 0 1.1rem 0;
`;

const Badges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const Badge = styled.span`
  color: ${({ theme }) => theme.secondaryTextColor};
  background: ${({ theme }) => theme.surfaceHover};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 999px;
  padding: 0.45rem 0.9rem;
  font-size: 0.85rem;
  transition: color 0.2s ease, border-color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.primaryTextColor};
    border-color: ${({ theme }) => theme.accent};
  }
`;

export const Profile = () => {
  const { theme, t } = useContext(AppContext);
  const p = t.profile;

  return (
    <Section id='sobre-mi'>
      <Reveal>
        <Eyebrow theme={theme}>{p.eyebrow}</Eyebrow>
        <SectionTitle theme={theme}>{p.title}</SectionTitle>
      </Reveal>
      <Reveal delay={80}>
        <Grid>
          <div>
            {p.bio.map((paragraph, i) => (
              <Bio key={i} theme={theme}>{paragraph}</Bio>
            ))}
          </div>
          <SkillsPanel theme={theme}>
            <PanelTitle theme={theme}>{p.panelTitle}</PanelTitle>
            <Badges>
              {p.skills.map((skill) => (
                <Badge key={skill} theme={theme}>{skill}</Badge>
              ))}
            </Badges>
          </SkillsPanel>
        </Grid>
      </Reveal>
    </Section>
  );
};
