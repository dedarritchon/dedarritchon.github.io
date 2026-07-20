import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';

import { AppContext } from './../App/AppContext';
import { Section, Eyebrow, SectionTitle, SectionIntro, Orb } from './shared';
import { Reveal } from './Reveal';

// Valoraciones de clientes. Los textos (quote/role) viven en `data/i18n.js`.
const TESTIMONIALS = [
  { name: 'Dr. Carlos Uc', avatar: '/images/avatars/dr-carlos-uc-pediatra.png' },
  { name: 'Aldo Novion', avatar: '/images/avatars/accountability-logo.jpg' },
  { name: 'Camilo López', avatar: '/images/avatars/adereso-logo.png' },
  { name: 'José Ossa', avatar: '/images/avatars/front-logo.png' },
];

const seeded = (seed) => {
  let s = seed % 2147483647;
  if (s <= 0) {s += 2147483646;}
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

const buildStars = (count, seed, { minSize, maxSize, minOp, maxOp, sparkleChance = 0 }) => {
  const rand = seeded(seed);
  return Array.from({ length: count }, (_, i) => ({
    id: `${seed}-${i}`,
    top: `${rand() * 100}%`,
    left: `${rand() * 100}%`,
    size: minSize + rand() * (maxSize - minSize),
    opacity: minOp + rand() * (maxOp - minOp),
    delay: rand() * 5,
    duration: 2.2 + rand() * 3.4,
    sparkle: rand() < sparkleChance,
  }));
};

const FAR_STARS = buildStars(36, 11, { minSize: 2, maxSize: 3.5, minOp: 0.3, maxOp: 0.6 });
const MID_STARS = buildStars(24, 29, { minSize: 3, maxSize: 5.5, minOp: 0.4, maxOp: 0.7, sparkleChance: 0.3 });
const NEAR_STARS = buildStars(16, 47, { minSize: 4, maxSize: 8, minOp: 0.45, maxOp: 0.75, sparkleChance: 0.5 });

const twinkle = keyframes`
  0%, 100% { opacity: var(--star-op, 0.8); transform: scale(1); }
  50% { opacity: calc(var(--star-op, 0.8) * 0.45); transform: scale(0.78); }
`;

const drift = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -10px, 0); }
`;

const TestimonialsSection = styled(Section)`
  overflow: visible;
`;

const StarField = styled.div`
  position: absolute;
  inset: -7rem -5rem;
  z-index: 0;
  pointer-events: none;
  overflow: visible;

  @media (max-width: 768px) {
    inset: -4rem -2rem;
  }
`;

const StarLayer = styled.div`
  position: absolute;
  inset: 0;
  will-change: transform;
`;

const StarDot = styled.span`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  --star-op: ${({ $opacity }) => $opacity};
  opacity: var(--star-op);
  background: radial-gradient(circle, #f8fafc 0%, #c7d2fe 50%, transparent 75%);
  box-shadow: 0 0 ${({ $size }) => $size * 2.2}px rgba(199, 210, 254, 0.4);
  mix-blend-mode: screen;
  animation: ${twinkle} ${({ $duration }) => $duration}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;

  ${({ $sparkle, $size }) =>
    $sparkle &&
    `
    background: #f8fafc;
    box-shadow:
      0 0 ${$size * 2.4}px rgba(226, 232, 240, 0.5),
      0 0 ${$size * 4}px rgba(165, 180, 252, 0.28);
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(248, 250, 252, 0.85),
        transparent
      );
      transform: translate(-50%, -50%);
    }
    &::before {
      width: ${$size * 5.5}px;
      height: 1.5px;
    }
    &::after {
      width: 1.5px;
      height: ${$size * 5.5}px;
      background: linear-gradient(
        180deg,
        transparent,
        rgba(248, 250, 252, 0.85),
        transparent
      );
    }
  `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const NearStar = styled(StarDot)`
  filter: drop-shadow(0 0 8px rgba(165, 180, 252, 0.45));
  animation:
    ${twinkle} ${({ $duration }) => $duration}s ease-in-out infinite,
    ${drift} ${({ $duration }) => 5 + $duration}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s, ${({ $delay }) => $delay * 0.4}s;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
`;

const ForegroundStars = styled(StarField)`
  z-index: 2;
  inset: -5rem -3rem;

  @media (max-width: 768px) {
    inset: -3rem -1.5rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const Quote = styled.blockquote`
  position: relative;
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

const renderStars = (stars, Component = StarDot) =>
  stars.map((star) => (
    <Component
      key={star.id}
      $top={star.top}
      $left={star.left}
      $size={star.size}
      $opacity={star.opacity}
      $delay={star.delay}
      $duration={star.duration}
      $sparkle={star.sparkle}
    />
  ));

export const Testimonials = () => {
  const { theme, t } = useContext(AppContext);
  const tt = t.testimonials;

  return (
    <TestimonialsSection id='valoraciones'>
      <Orb
        data-scroll
        data-scroll-speed='-3.5'
        color='#6366F1'
        opacity={0.3}
        style={{ width: '400px', height: '400px', bottom: '-60px', right: '-120px' }}
      />

      <StarField aria-hidden='true'>
        <StarLayer data-scroll data-scroll-speed='-1.8'>
          {renderStars(FAR_STARS)}
        </StarLayer>
        <StarLayer data-scroll data-scroll-speed='-0.6'>
          {renderStars(MID_STARS)}
        </StarLayer>
      </StarField>

      <Content>
        <Reveal>
          <Eyebrow theme={theme}>{tt.eyebrow}</Eyebrow>
          <SectionTitle theme={theme}>{tt.title}</SectionTitle>
          <SectionIntro theme={theme}>{tt.intro}</SectionIntro>
        </Reveal>
        <Grid>
          {TESTIMONIALS.map((person, i) => (
            <Reveal key={i} from='up' delay={i * 90}>
              <Quote theme={theme}>
                <QuoteMark theme={theme}>&ldquo;</QuoteMark>
                <Stars aria-label={tt.starsLabel}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <StarIcon key={s} />
                  ))}
                </Stars>
                <Text theme={theme}>{tt.quotes[person.name]}</Text>
                <Person>
                  <Avatar theme={theme}>
                    {person.avatar ? <img src={person.avatar} alt={person.name} /> : initials(person.name)}
                  </Avatar>
                  <div>
                    <Name theme={theme}>{person.name}</Name>
                    <Role theme={theme}>{tt.roles[person.name]}</Role>
                  </div>
                </Person>
              </Quote>
            </Reveal>
          ))}
        </Grid>
      </Content>

      <ForegroundStars aria-hidden='true'>
        <StarLayer data-scroll data-scroll-speed='1.4'>
          {renderStars(NEAR_STARS, NearStar)}
        </StarLayer>
      </ForegroundStars>
    </TestimonialsSection>
  );
};

export default Testimonials;
