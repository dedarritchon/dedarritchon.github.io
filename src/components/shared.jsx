import styled, { keyframes } from 'styled-components';

export const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Section = styled.section.attrs({ 'data-scroll-section': '' })`
  position: relative;
  isolation: isolate;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 5.5rem 1.5rem;
  scroll-margin-top: 90px;

  @media (max-width: 768px) {
    padding: 4rem 1.25rem;
  }
`;

// Orbe de gradiente para capas de parallax (se mueve con data-scroll-speed).
// Colócalo dentro de una Section (isolation: isolate) con:
//   <Orb data-scroll data-scroll-speed="3" style={{ ... }} />
export const Orb = styled.span`
  position: absolute;
  z-index: -1;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(70px);
  opacity: ${({ opacity }) => opacity ?? 0.5};
  background: radial-gradient(circle at 30% 30%, ${({ color, theme }) => color || theme.accent}, transparent 70%);
`;

export const Eyebrow = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.accent};
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
`;

export const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.primaryTextColor};
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.9rem, 4vw, 2.6rem);
  font-weight: 700;
  line-height: 1.1;
  margin: 0 0 1rem 0;
  letter-spacing: -0.5px;
`;

export const SectionIntro = styled.p`
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 620px;
  margin: 0 0 2.5rem 0;
`;

export const Card = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 1.75rem;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.borderStrong};
    background: ${({ theme }) => theme.surfaceHover};
    box-shadow: 0 16px 40px ${({ theme }) => theme.shadowColor};
  }
`;

export const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.cta};
  color: #ffffff;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 0.98rem;
  padding: 0.85rem 1.6rem;
  border-radius: 12px;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 8px 24px ${({ theme }) => theme.glow};

  &:hover {
    background: ${({ theme }) => theme.ctaHover};
    transform: translateY(-2px);
    box-shadow: 0 12px 32px ${({ theme }) => theme.glow};
  }
`;

export const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: ${({ theme }) => theme.primaryTextColor};
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 0.98rem;
  padding: 0.85rem 1.6rem;
  border-radius: 12px;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.borderStrong};
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.surfaceHover};
    border-color: ${({ theme }) => theme.accent};
    transform: translateY(-2px);
  }
`;
