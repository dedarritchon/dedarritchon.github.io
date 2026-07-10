import React, { useContext } from 'react';
import styled from 'styled-components';

import { AppContext } from './../App/AppContext';
import { Section, Eyebrow, SectionTitle, SectionIntro, Orb } from './shared';
import { Reveal } from './Reveal';

// Valoraciones de clientes. Reemplaza estos datos de ejemplo por reseñas reales.
const TESTIMONIALS = [
  {
    quote:
      'Daniel entendió nuestro problema desde el primer día y entregó una solución sólida y a tiempo. Su capacidad técnica y su comunicación clara marcaron la diferencia en el proyecto.',
    name: 'Dr. Carlos Uc',
    role: 'Médico Pediatra',
    avatar: '',
  },
  {
    quote:
      'Trabajar con Daniel fue muy fácil. Automatizó procesos que antes nos tomaban horas y el resultado superó nuestras expectativas. Sin duda volveríamos a contar con él.',
    name: 'Aldo Novion',
    role: 'Fundador, Accountability.cl',
    avatar: '',
  },
];

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const Quote = styled.blockquote`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 1.75rem;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.borderStrong};
    box-shadow: 0 16px 40px ${({ theme }) => theme.shadowColor};
  }
`;

const QuoteMark = styled.span`
  color: ${({ theme }) => theme.accent};
  font-family: 'Space Grotesk', sans-serif;
  font-size: 3rem;
  line-height: 0.5;
  height: 1.5rem;
`;

const Stars = styled.div`
  display: flex;
  gap: 0.15rem;
  color: #f5b301;
  margin-bottom: 0.9rem;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 1rem;
  line-height: 1.7;
  margin: 0 0 1.5rem 0;
  flex: 1;
`;

const Person = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
`;

const Avatar = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  overflow: hidden;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.accent};
  background: ${({ theme }) => `${theme.accent}1F`};
  border: 1px solid ${({ theme }) => theme.border};
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Name = styled.span`
  color: ${({ theme }) => theme.primaryTextColor};
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  display: block;
`;

const Role = styled.span`
  color: ${({ theme }) => theme.tertiaryTextColor};
  font-size: 0.88rem;
`;

const StarIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12 2l2.9 6.26L21.5 9.27l-4.75 4.64L17.9 21 12 17.5 6.1 21l1.15-7.09L2.5 9.27l6.6-1.01L12 2z' />
  </svg>
);

const initials = (name) =>
  name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const Testimonials = () => {
  const { theme } = useContext(AppContext);

  return (
    <Section id='valoraciones'>
      <Orb
        data-scroll
        data-scroll-speed='-3.5'
        color='#6366F1'
        opacity={0.3}
        style={{ width: '400px', height: '400px', bottom: '-60px', right: '-120px' }}
      />
      <Reveal>
        <Eyebrow theme={theme}>Testimonios</Eyebrow>
        <SectionTitle theme={theme}>Lo que dicen mis clientes</SectionTitle>
        <SectionIntro theme={theme}>
          Valoraciones de personas y equipos con los que he trabajado.
        </SectionIntro>
      </Reveal>
      <Grid>
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={i} from='up' delay={i * 90}>
            <Quote theme={theme}>
              <QuoteMark theme={theme}>&ldquo;</QuoteMark>
              <Stars aria-label='5 de 5 estrellas'>
                {Array.from({ length: 5 }).map((_, s) => (
                  <StarIcon key={s} />
                ))}
              </Stars>
              <Text theme={theme}>{t.quote}</Text>
              <Person>
                <Avatar theme={theme}>
                  {t.avatar ? <img src={t.avatar} alt={t.name} /> : initials(t.name)}
                </Avatar>
                <div>
                  <Name theme={theme}>{t.name}</Name>
                  <Role theme={theme}>{t.role}</Role>
                </div>
              </Person>
            </Quote>
          </Reveal>
        ))}
      </Grid>
    </Section>
  );
};

export default Testimonials;
