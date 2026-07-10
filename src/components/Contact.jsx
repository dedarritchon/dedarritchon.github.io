import React, { useContext } from 'react';
import styled from 'styled-components';

import { AppContext } from './../App/AppContext';
import { Section, Eyebrow, SectionTitle, SectionIntro } from './shared';

const EMAIL = 'dedarritchon@uc.cl';
const WHATSAPP_URL = 'https://wa.me/56976591924';

const Panel = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background-image: radial-gradient(600px 200px at 50% 0%, ${({ theme }) => `${theme.accent}1F`}, transparent 70%);

  @media (max-width: 600px) {
    padding: 1.75rem;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const ContactButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: ${({ theme, primary }) => (primary ? '#fff' : theme.primaryTextColor)};
  background: ${({ theme, primary }) => (primary ? theme.cta : 'transparent')};
  border: 1px solid ${({ theme, primary }) => (primary ? 'transparent' : theme.borderStrong)};
  border-radius: 12px;
  padding: 0.9rem 1.6rem;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: ${({ theme, primary }) => (primary ? `0 8px 24px ${theme.glow}` : 'none')};

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme, primary }) => (primary ? theme.ctaHover : theme.surfaceHover)};
    border-color: ${({ theme, primary }) => (primary ? 'transparent' : theme.accent)};
  }
`;

const iconProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const MailIcon = () => (
  <svg {...iconProps}><rect x='2' y='4' width='20' height='16' rx='2' /><path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' /></svg>
);

const WhatsAppIcon = () => (
  <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.548 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413' />
  </svg>
);

export const Contact = () => {
  const { theme } = useContext(AppContext);

  return (
    <Section id='contacto'>
      <Panel theme={theme}>
        <Eyebrow theme={theme}>Contacto</Eyebrow>
        <SectionTitle theme={theme}>¿Tienes un proyecto en mente?</SectionTitle>
        <SectionIntro theme={theme} style={{ margin: '0 auto 0' }}>
          Cuéntame qué necesitas y agendemos una conversación. Respondo dentro de 24 horas.
        </SectionIntro>
        <Actions>
          <ContactButton href={`mailto:${EMAIL}`} theme={theme} primary>
            <MailIcon /> Escríbeme
          </ContactButton>
          <ContactButton href={WHATSAPP_URL} target='_blank' rel='noopener noreferrer' theme={theme}>
            <WhatsAppIcon /> WhatsApp
          </ContactButton>
        </Actions>
      </Panel>
    </Section>
  );
};
