import React, { useContext } from 'react';
import styled from 'styled-components';

import { AppContext } from './../App/AppContext';
import { GitHub, LinkedIn, Resume, Email } from './../icons';

const Wrapper = styled.footer.attrs({ 'data-scroll-section': '' })`
  border-top: 1px solid ${({ theme }) => theme.border};
  margin-top: 2rem;
`;

const Inner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copy = styled.p`
  color: ${({ theme }) => theme.tertiaryTextColor};
  font-size: 0.9rem;
  margin: 0;
`;

const Socials = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.secondaryTextColor};
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    color: ${({ theme }) => theme.primaryTextColor};
    border-color: ${({ theme }) => theme.accent};
    background: ${({ theme }) => theme.surfaceHover};
  }
`;

const SOCIALS = [
  { href: 'https://github.com/dedarritchon', label: 'GitHub', icon: <GitHub /> },
  { href: 'https://www.linkedin.com/in/dedarritchon/', label: 'LinkedIn', icon: <LinkedIn /> },
  { href: 'https://drive.google.com/file/d/1ASG5JTR_lZI1b3scN3kKAgulgOTe4uNh/view?usp=sharing', label: 'Currículum', icon: <Resume /> },
  { href: 'mailto:dedarritchon@uc.cl', label: 'Email', icon: <Email /> },
];

export const Footer = () => {
  const { theme } = useContext(AppContext);
  const year = new Date().getFullYear();

  return (
    <Wrapper theme={theme}>
      <Inner>
        <Copy theme={theme}>© {year} Daniel Darritchon · Ingeniero de Software &amp; Consultor</Copy>
        <Socials>
          {SOCIALS.map(({ href, label, icon }) => (
            <SocialLink
              key={label}
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={label}
              theme={theme}
            >
              {icon}
            </SocialLink>
          ))}
        </Socials>
      </Inner>
    </Wrapper>
  );
};
