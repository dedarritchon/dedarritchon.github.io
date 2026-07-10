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
  const { theme } = useContext(AppContext);

  const skills = [
    'JavaScript / TypeScript',
    'React',
    'Node.js / Express',
    'Python / Django',
    'FastAPI / Flask',
    'PostgreSQL / SQL',
    'Docker / Kubernetes',
    'GCP / AWS',
    'Integraciones & APIs',
    'Git / CI/CD',
  ];

  return (
    <Section id='sobre-mi'>
      <Reveal>
        <Eyebrow theme={theme}>Sobre mí</Eyebrow>
        <SectionTitle theme={theme}>Ingeniería con foco en resultados</SectionTitle>
      </Reveal>
      <Reveal delay={80}>
        <Grid>
          <div>
            <Bio theme={theme}>
              Soy Daniel Darritchon, ingeniero de software con más de cinco años
              construyendo aplicaciones web full-stack, integraciones y automatizaciones
              para empresas. Me especializo en transformar necesidades de negocio en
              productos escalables, mantenibles y confiables.
            </Bio>
            <Bio theme={theme}>
              He trabajado desde startups hasta plataformas en producción usadas a
              diario, cubriendo el ciclo completo: arquitectura, desarrollo, despliegue
              en la nube y mantenimiento. Creo en el código limpio, la comunicación clara
              y en entregar valor real, no solo funcionalidades.
            </Bio>
            <Bio theme={theme}>
              Hoy combino ese recorrido técnico con consultoría, ayudando a clientes a
              tomar mejores decisiones tecnológicas y a llevar sus ideas a la práctica.
            </Bio>
          </div>
          <SkillsPanel theme={theme}>
            <PanelTitle theme={theme}>Stack &amp; herramientas</PanelTitle>
            <Badges>
              {skills.map((skill) => (
                <Badge key={skill} theme={theme}>{skill}</Badge>
              ))}
            </Badges>
          </SkillsPanel>
        </Grid>
      </Reveal>
    </Section>
  );
};
