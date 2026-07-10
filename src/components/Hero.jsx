import React, { useContext } from 'react';
import styled from 'styled-components';

import { AppContext } from './../App/AppContext';
import { PrimaryButton, SecondaryButton, Orb, fadeInUp } from './shared';

const Wrapper = styled.section.attrs({ 'data-scroll-section': '' })`
  position: relative;
  isolation: isolate;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 9rem 1.5rem 4rem;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: 3rem;
  scroll-margin-top: 90px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 8rem 1.25rem 3rem;
    text-align: center;
  }
`;

const Content = styled.div`
  animation: ${fadeInUp} 0.7s ease-out both;
`;

const Status = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.secondaryTextColor};
  border-radius: 999px;
  padding: 0.4rem 0.9rem;
  font-size: 0.85rem;
  margin-bottom: 1.5rem;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.25);
  }
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.primaryTextColor};
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.4rem, 6vw, 4rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -1.5px;
  margin: 0 0 1.25rem 0;

  span {
    background: linear-gradient(120deg, ${({ theme }) => theme.accent}, #60a5fa);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 1.15rem;
  line-height: 1.7;
  max-width: 560px;
  margin: 0 0 2rem 0;

  @media (max-width: 900px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 2.5rem;
  margin-top: 2.75rem;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatValue = styled.span`
  color: ${({ theme }) => theme.primaryTextColor};
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
`;

const StatLabel = styled.span`
  color: ${({ theme }) => theme.tertiaryTextColor};
  font-size: 0.85rem;
  margin-top: 0.15rem;
`;

const Visual = styled.div`
  display: flex;
  justify-content: center;
  animation: ${fadeInUp} 0.7s ease-out 0.15s both;
`;

const Portrait = styled.div`
  position: relative;
  width: 280px;
  height: 280px;

  @media (max-width: 900px) {
    width: 220px;
    height: 220px;
  }

  &::before {
    content: '';
    position: absolute;
    inset: -14px;
    border-radius: 28px;
    background: linear-gradient(135deg, ${({ theme }) => theme.accent}55, transparent 60%);
    filter: blur(8px);
  }

  img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 24px;
    border: 1px solid ${({ theme }) => theme.borderStrong};
  }
`;

export const Hero = () => {
  const { theme } = useContext(AppContext);

  return (
    <Wrapper id='inicio'>
      <Orb
        data-scroll
        data-scroll-speed='4'
        color='#3B82F6'
        opacity={0.4}
        style={{ width: '360px', height: '360px', top: '-60px', left: '-80px' }}
      />
      <Orb
        data-scroll
        data-scroll-speed='-3'
        color='#6366F1'
        opacity={0.35}
        style={{ width: '320px', height: '320px', bottom: '-40px', right: '-40px' }}
      />
      <Content data-scroll data-scroll-speed='1.2'>
        <Status theme={theme}>Disponible para nuevos proyectos</Status>
        <Title theme={theme}>
          Ingeniero de Software <span>&amp; Consultor</span>
        </Title>
        <Subtitle theme={theme}>
          Diseño y construyo software a medida, integraciones y automatizaciones que
          impulsan negocios. Te ayudo a llevar tu idea de un concepto a un producto
          escalable y confiable.
        </Subtitle>
        <Actions>
          <PrimaryButton href='#contacto' theme={theme}>Agendar consultoría</PrimaryButton>
          <SecondaryButton href='#proyectos' theme={theme}>Ver proyectos</SecondaryButton>
        </Actions>
        <Stats>
          <Stat>
            <StatValue theme={theme}>+6 años</StatValue>
            <StatLabel theme={theme}>de experiencia</StatLabel>
          </Stat>
          <Stat>
            <StatValue theme={theme}>Full-stack</StatValue>
            <StatLabel theme={theme}>web, APIs y cloud</StatLabel>
          </Stat>
          <Stat>
            <StatValue theme={theme}>Producto real</StatValue>
            <StatLabel theme={theme}>en producción</StatLabel>
          </Stat>
        </Stats>
      </Content>
      <Visual>
        <Portrait theme={theme} data-scroll data-scroll-speed='1.6'>
          <img src='/images/profile.png' alt='Retrato de Daniel Darritchon' />
        </Portrait>
      </Visual>
    </Wrapper>
  );
};
