import React, { useContext } from 'react';
import styled from 'styled-components';

import { AppContext } from './../App/AppContext';
import { useAnchorScroll } from './../hooks/useLocomotive';
import { Section, Eyebrow, SectionTitle, SectionIntro, Card, PrimaryButton, Orb } from './shared';
import { Reveal } from './Reveal';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
`;

const IconWrap = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: ${({ theme }) => `${theme.accent}1F`};
  color: ${({ theme }) => theme.accent};
  margin-bottom: 1.1rem;
`;

const CardTitle = styled.h3`
  color: ${({ theme }) => theme.primaryTextColor};
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.6rem 0;
`;

const CardText = styled.p`
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 0.98rem;
  line-height: 1.65;
  margin: 0;
`;

const Cta = styled.div`
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
`;

const iconProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const CodeIcon = () => (
  <svg {...iconProps}><polyline points='16 18 22 12 16 6' /><polyline points='8 6 2 12 8 18' /></svg>
);
const PlugIcon = () => (
  <svg {...iconProps}><path d='M12 22v-5' /><path d='M9 8V2' /><path d='M15 8V2' /><path d='M18 8v4a6 6 0 0 1-12 0V8z' /></svg>
);
const CloudIcon = () => (
  <svg {...iconProps}><path d='M17.5 19a4.5 4.5 0 0 0 0-9h-1.8A7 7 0 1 0 4 15.3' /><path d='M12 12v9' /><path d='m8 17 4-4 4 4' /></svg>
);
const CompassIcon = () => (
  <svg {...iconProps}><circle cx='12' cy='12' r='10' /><polygon points='16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76' /></svg>
);

const SERVICE_ICONS = [CodeIcon, PlugIcon, CloudIcon, CompassIcon];

// Delays y distancias desordenadas para que las cards floten en distinto orden.
const CARD_REVEAL = [
  { delay: 320, distance: 40 },
  { delay: 90, distance: 32 },
  { delay: 480, distance: 36 },
  { delay: 210, distance: 44 },
];

export const Services = () => {
  const { theme, t } = useContext(AppContext);
  const onAnchorClick = useAnchorScroll();
  const s = t.services;
  const services = s.items.map((item, i) => ({ ...item, Icon: SERVICE_ICONS[i] }));

  return (
    <Section id='servicios'>
      <Orb
        data-scroll
        data-scroll-speed='-4'
        color='#2563EB'
        opacity={0.3}
        style={{ width: '420px', height: '420px', top: '10%', right: '-120px' }}
      />
      <Reveal>
        <Eyebrow theme={theme}>{s.eyebrow}</Eyebrow>
        <SectionTitle theme={theme}>{s.title}</SectionTitle>
        <SectionIntro theme={theme}>{s.intro}</SectionIntro>
      </Reveal>
      <Grid>
        {services.map((item, i) => {
          const reveal = CARD_REVEAL[i % CARD_REVEAL.length];
          return (
            <Reveal
              key={item.title}
              from='up'
              delay={reveal.delay}
              distance={reveal.distance}
            >
              <Card theme={theme}>
                <IconWrap theme={theme}>{item.Icon ? <item.Icon /> : null}</IconWrap>
                <CardTitle theme={theme}>{item.title}</CardTitle>
                <CardText theme={theme}>{item.text}</CardText>
              </Card>
            </Reveal>
          );
        })}
      </Grid>
      <Cta>
        <PrimaryButton href='#contacto' theme={theme} onClick={onAnchorClick}>{s.cta}</PrimaryButton>
      </Cta>
    </Section>
  );
};
