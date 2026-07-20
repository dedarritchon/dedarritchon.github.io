import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { AppContext } from './../App/AppContext';
import { useAnchorScroll } from './../hooks/useLocomotive';

const Bar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ $scrolled }) => ($scrolled ? '0.75rem 1.5rem' : '1.25rem 1.5rem')};
  max-width: 1120px;
  margin: 0 auto;
  transition: padding 0.25s ease;

  @media (max-width: 768px) {
    padding: 0.9rem 1.25rem;
  }
`;

const BarInner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  height: ${({ $scrolled }) => ($scrolled ? '64px' : '80px')};
  background: ${({ $scrolled }) => ($scrolled ? 'rgba(10, 14, 39, 0.75)' : 'transparent')};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(14px)' : 'none')};
  -webkit-backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(14px)' : 'none')};
  border-bottom: 1px solid ${({ $scrolled, theme }) => ($scrolled ? theme.border : 'transparent')};
  transition: all 0.25s ease;
`;

const Brand = styled.a`
  color: ${({ theme }) => theme.primaryTextColor};
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: 0.5px;
  text-decoration: none;
  cursor: pointer;

  span {
    color: ${({ theme }) => theme.accent};
  }
`;

const Links = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.75rem;

  @media (max-width: 820px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.primaryTextColor};
  }
`;

const Cta = styled.a`
  background: ${({ theme }) => theme.cta};
  color: #ffffff;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.6rem 1.15rem;
  border-radius: 10px;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.ctaHover};
    transform: translateY(-1px);
  }
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

// Prominent, always-visible language switch so first-time visitors can
// immediately swap between Spanish and English.
const LangSwitch = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.accent};
  box-shadow: 0 0 0 3px ${({ theme }) => `${theme.accent}22`};
`;

const Globe = styled.svg`
  width: 16px;
  height: 16px;
  margin-left: 0.35rem;
  color: ${({ theme }) => theme.accent};
  flex: 0 0 auto;
`;

const LangButton = styled.button`
  appearance: none;
  border: none;
  cursor: pointer;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  transition: background 0.2s ease, color 0.2s ease;
  color: ${({ $active, theme }) => ($active ? '#fff' : theme.secondaryTextColor)};
  background: ${({ $active, theme }) => ($active ? theme.cta : 'transparent')};

  &:hover {
    color: ${({ $active, theme }) => ($active ? '#fff' : theme.primaryTextColor)};
  }
`;

const MenuButton = styled.button`
  display: none;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.borderStrong};
  border-radius: 10px;
  padding: 0.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.primaryTextColor};

  @media (max-width: 820px) {
    display: inline-flex;
  }
`;

const MobileMenu = styled.div`
  display: none;

  @media (max-width: 820px) {
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    flex-direction: column;
    position: fixed;
    top: 64px;
    left: 1rem;
    right: 1rem;
    z-index: 100;
    background: rgba(10, 14, 39, 0.96);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 16px;
    padding: 1rem;
    gap: 0.25rem;
  }
`;

const MobileLink = styled.a`
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  padding: 0.75rem 0.5rem;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.surfaceHover};
    color: ${({ theme }) => theme.primaryTextColor};
  }
`;

const GlobeIcon = ({ theme }) => (
  <Globe theme={theme} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <circle cx='12' cy='12' r='10' />
    <path d='M2 12h20' />
    <path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' />
  </Globe>
);

export const Navbar = () => {
  const { theme, lang, setLang, t } = useContext(AppContext);
  const anchorScroll = useAnchorScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onNativeScroll = () => setScrolled(window.scrollY > 24);
    const onLocoScroll = (e) => setScrolled((e.detail && e.detail.y) > 24);
    onNativeScroll();
    window.addEventListener('scroll', onNativeScroll, { passive: true });
    window.addEventListener('locomotive-scroll', onLocoScroll);
    return () => {
      window.removeEventListener('scroll', onNativeScroll);
      window.removeEventListener('locomotive-scroll', onLocoScroll);
    };
  }, []);

  const handleNav = (e, href) => {
    anchorScroll(e, href);
    setOpen(false);
  };

  const langSwitch = (
    <LangSwitch theme={theme} role='group' aria-label={t.langSwitch.label}>
      <GlobeIcon theme={theme} />
      <LangButton
        theme={theme}
        $active={lang === 'es'}
        aria-pressed={lang === 'es'}
        onClick={() => setLang('es')}
      >
        ES
      </LangButton>
      <LangButton
        theme={theme}
        $active={lang === 'en'}
        aria-pressed={lang === 'en'}
        onClick={() => setLang('en')}
      >
        EN
      </LangButton>
    </LangSwitch>
  );

  return (
    <>
      <BarInner $scrolled={scrolled} theme={theme} />
      <Bar $scrolled={scrolled} theme={theme}>
        <Brand href='#inicio' theme={theme} onClick={(e) => handleNav(e, '#inicio')}>
          Daniel<span>.</span>Darritchon
        </Brand>
        <Links theme={theme}>
          {t.nav.links.map((l) => (
            <NavLink key={l.href} href={l.href} theme={theme} onClick={(e) => handleNav(e, l.href)}>
              {l.label}
            </NavLink>
          ))}
          <Cta href='#contacto' theme={theme} onClick={(e) => handleNav(e, '#contacto')}>{t.nav.cta}</Cta>
        </Links>
        <RightGroup>
          {langSwitch}
          <MenuButton theme={theme} aria-label={t.nav.openMenu} onClick={() => setOpen((o) => !o)}>
            <svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
              {open ? (
                <><line x1='18' y1='6' x2='6' y2='18' /><line x1='6' y1='6' x2='18' y2='18' /></>
              ) : (
                <><line x1='3' y1='6' x2='21' y2='6' /><line x1='3' y1='12' x2='21' y2='12' /><line x1='3' y1='18' x2='21' y2='18' /></>
              )}
            </svg>
          </MenuButton>
        </RightGroup>
      </Bar>
      <MobileMenu $open={open} theme={theme}>
        {t.nav.links.map((l) => (
          <MobileLink key={l.href} href={l.href} theme={theme} onClick={(e) => handleNav(e, l.href)}>
            {l.label}
          </MobileLink>
        ))}
        <MobileLink href='#contacto' theme={theme} onClick={(e) => handleNav(e, '#contacto')}>
          {t.nav.cta}
        </MobileLink>
      </MobileMenu>
    </>
  );
};
