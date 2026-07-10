import React, { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';

import { AppContext } from './../App/AppContext';
import { useLocomotive } from './../hooks/useLocomotive';
import { Carousel } from './Carousel';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: translateY(16px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(4, 6, 18, 0.7);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  animation: ${fadeIn} 0.2s ease-out;
`;

const Panel = styled.div`
  position: relative;
  width: 100%;
  max-width: 860px;
  max-height: 90vh;
  overflow-y: auto;
  background: ${({ theme }) => theme.backgroundElevated};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 20px;
  padding: 2rem;
  animation: ${scaleIn} 0.28s cubic-bezier(0.22, 1, 0.36, 1);

  @media (max-width: 600px) {
    padding: 1.25rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.primaryTextColor};
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.surfaceHover};
    border-color: ${({ theme }) => theme.accent};
  }
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.primaryTextColor};
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  margin: 1.5rem 0 0.75rem;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 1rem;
  line-height: 1.7;
  margin: 0 0 1.25rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  color: ${({ theme }) => theme.tertiaryTextColor};
  background: ${({ theme }) => theme.surfaceHover};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 999px;
  padding: 0.3rem 0.75rem;
  font-size: 0.78rem;
`;

const Links = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const LinkButton = styled.a`
  display: ${({ hidden }) => (hidden ? 'none' : 'inline-flex')};
  align-items: center;
  gap: 0.4rem;
  color: ${({ theme, primary }) => (primary ? '#fff' : theme.primaryTextColor)};
  background: ${({ theme, primary }) => (primary ? theme.cta : 'transparent')};
  border: 1px solid ${({ theme, primary }) => (primary ? 'transparent' : theme.borderStrong)};
  border-radius: 10px;
  padding: 0.6rem 1.15rem;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme, primary }) => (primary ? theme.ctaHover : theme.surfaceHover)};
    border-color: ${({ theme, primary }) => (primary ? 'transparent' : theme.accent)};
  }
`;

export const ProjectModal = ({ project, onClose }) => {
  const { theme } = useContext(AppContext);
  const { stop, start } = useLocomotive();

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    stop();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      start();
    };
  }, [onClose, stop, start]);

  if (!project) {return null;}

  return createPortal(
    <Overlay onClick={onClose}>
      <Panel theme={theme} role='dialog' aria-modal='true' aria-label={project.title} onClick={(e) => e.stopPropagation()}>
        <CloseButton theme={theme} aria-label='Cerrar' onClick={onClose}>
          <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
            <line x1='18' y1='6' x2='6' y2='18' />
            <line x1='6' y1='6' x2='18' y2='18' />
          </svg>
        </CloseButton>

        <Carousel images={project.gallery} />

        <Title theme={theme}>{project.title}</Title>
        <Description theme={theme}>{project.description}</Description>

        <TechStack>
          {project.tech.map((tech) => (
            <TechTag key={tech} theme={theme}>{tech}</TechTag>
          ))}
        </TechStack>

        <Links>
          <LinkButton href={project.liveLink} target='_blank' rel='noopener noreferrer' theme={theme} primary>
            Ver demo
          </LinkButton>
          <LinkButton
            href={project.githubLink}
            target='_blank'
            rel='noopener noreferrer'
            theme={theme}
            hidden={!project.githubLink}
          >
            GitHub
          </LinkButton>
        </Links>
      </Panel>
    </Overlay>,
    document.body
  );
};

export default ProjectModal;
