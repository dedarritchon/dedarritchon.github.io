import React, { useContext, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import { AppContext } from './../App/AppContext';
import { Section, Eyebrow, SectionTitle } from './shared';
import { Reveal } from './Reveal';
import { useLocomotive } from './../hooks/useLocomotive';
import { PROFILE_TECH, FLOATING_TECH } from './../data/technologies';

const float = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) rotate(var(--rotate, 0deg)); }
  50% { transform: translate3d(0, -14px, 0) rotate(calc(var(--rotate, 0deg) + 4deg)); }
`;

const TechBackdrop = styled.div`
  position: absolute;
  inset: -3rem -2.5rem;
  z-index: 0;
  pointer-events: none;
  overflow: visible;

  @media (max-width: 900px) {
    inset: -2rem -1.5rem;
  }
`;

const FloatWrap = styled.div`
  position: absolute;
  will-change: transform;

  ${({ $top }) => $top && `top: ${$top};`}
  ${({ $left }) => $left && `left: ${$left};`}
  ${({ $right }) => $right && `right: ${$right};`}
  ${({ $bottom }) => $bottom && `bottom: ${$bottom};`}
`;

const FloatIcon = styled.img`
  display: block;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  object-fit: contain;
  opacity: ${({ $opacity }) => $opacity ?? 0.38};
  filter: drop-shadow(0 8px 24px rgba(37, 99, 235, 0.15));
  animation: ${float} ${({ $duration }) => $duration ?? 7}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay ?? 0}s;
  --rotate: ${({ $rotate }) => $rotate ?? 0}deg;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.35fr 1fr;
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
  position: relative;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 1.75rem;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 20px 50px ${({ theme }) => theme.shadowColor};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 100% 0%, rgba(37, 99, 235, 0.08), transparent 55%);
    pointer-events: none;
  }
`;

const PanelTitle = styled.h3`
  position: relative;
  color: ${({ theme }) => theme.primaryTextColor};
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.05rem;
  font-weight: 600;
  margin: 0 0 1.25rem 0;
`;

const SkillsGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SkillBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  color: ${({ theme }) => theme.secondaryTextColor};
  background: ${({ theme }) => theme.surfaceHover};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 0.55rem 0.7rem;
  font-size: 0.8rem;
  line-height: 1.3;
  transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease, background 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.primaryTextColor};
    border-color: ${({ theme }) => theme.accent};
    background: ${({ theme }) => theme.surface};
    transform: translateY(-2px);
  }

  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
    flex-shrink: 0;
  }
`;

export const Profile = () => {
  const { theme, t, lang } = useContext(AppContext);
  const { update } = useLocomotive();
  const p = t.profile;

  useEffect(() => {
    if (!update) {return undefined;}
    const timer = setTimeout(update, 400);
    return () => clearTimeout(timer);
  }, [update]);

  return (
    <Section id='sobre-mi'>
      <TechBackdrop aria-hidden='true'>
        {FLOATING_TECH.map((tech) => (
          <FloatWrap
            key={`float-${tech.alt}`}
            $top={tech.top}
            $left={tech.left}
            $right={tech.right}
            $bottom={tech.bottom}
            data-scroll
            data-scroll-speed={String(tech.speed)}
          >
            <FloatIcon
              src={tech.src}
              alt=''
              $size={tech.size}
              $rotate={tech.rotate}
              $delay={`${tech.delay}s`}
              $duration={6 + (tech.delay % 3)}
            />
          </FloatWrap>
        ))}
      </TechBackdrop>

      <Content>
        <Reveal>
          <Eyebrow theme={theme}>{p.eyebrow}</Eyebrow>
          <SectionTitle theme={theme}>{p.title}</SectionTitle>
        </Reveal>
        <Reveal delay={80}>
          <Grid>
            <div data-scroll data-scroll-speed='0.6'>
              {p.bio.map((paragraph, i) => (
                <Bio key={i} theme={theme}>{paragraph}</Bio>
              ))}
            </div>
            <SkillsPanel theme={theme} data-scroll data-scroll-speed='1.1'>
              <PanelTitle theme={theme}>{p.panelTitle}</PanelTitle>
              <SkillsGrid>
                {PROFILE_TECH.map((tech) => (
                  <SkillBadge key={tech.label[lang]} theme={theme}>
                    {tech.src && <img src={tech.src} alt='' />}
                    <span>{tech.label[lang]}</span>
                  </SkillBadge>
                ))}
              </SkillsGrid>
            </SkillsPanel>
          </Grid>
        </Reveal>
      </Content>
    </Section>
  );
};
