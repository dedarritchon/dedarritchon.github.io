import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { AppContext } from './../App/AppContext';
import { useAnchorScroll } from './../hooks/useLocomotive';
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

const electricFlow = keyframes`
  0% { stroke-dashoffset: 100; }
  100% { stroke-dashoffset: -20; }
`;

const hubPulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.25); opacity: 1; }
`;

const TRACE_MS = 320;
const SPARK_DEPTH_MAX = 1;
const INTRO_DELAY_MS = 700;
const INTRO_HOLD_MS = 1100;

const pathTiming = (depth, index) => {
  const enterDelay = depth * 0.028 + (index % 3) * 0.006;
  const leaveDelay = (4 - depth) * 0.024;
  return {
    enterDelay,
    leaveDelay,
    nodeDelay: enterDelay + 0.1,
    sparkDelay: enterDelay + 0.03,
  };
};

const PortraitScene = styled.div`
  position: relative;
  width: 280px;
  height: 280px;
  perspective: 900px;
  cursor: pointer;
  overflow: visible;

  @media (max-width: 900px) {
    width: 220px;
    height: 220px;
  }

  @media (prefers-reduced-motion: reduce) {
    cursor: default;
  }
`;

const ElectricField = styled.div`
  position: absolute;
  inset: -140px;
  z-index: 0;
  pointer-events: none;
  contain: layout style paint;
  transform: rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
  will-change: transform;

  svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }
`;

const ElectricAmbience = styled.div`
  position: absolute;
  inset: 10%;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.accent}55 0%,
    ${({ theme }) => theme.accent}22 40%,
    transparent 72%
  );
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 0.2s ease;
  filter: blur(8px);
`;

const CircuitTraces = styled.g`
  filter: url(#circuitGlow);
`;

const CircuitTrace = styled.path`
  fill: none;
  stroke: ${({ theme }) => theme.accent};
  stroke-width: ${({ $depth }) => 1.7 - $depth * 0.22};
  stroke-linecap: square;
  stroke-linejoin: miter;
  stroke-dasharray: 100;
  stroke-dashoffset: ${({ $active }) => ($active ? 0 : 100)};
  opacity: ${({ $active }) => ($active ? 0.9 : 0)};
  transition:
    stroke-dashoffset ${TRACE_MS}ms cubic-bezier(0.22, 1, 0.36, 1) ${({ $active, $enterDelay, $leaveDelay }) => ($active ? $enterDelay : $leaveDelay)}s,
    opacity 120ms ease ${({ $active, $enterDelay, $leaveDelay }) => ($active ? $enterDelay : $leaveDelay + TRACE_MS / 1000)}s;
`;

const CircuitSparks = styled.g`
  filter: url(#sparkGlow);
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 0.12s ease;
`;

const CircuitSpark = styled.path`
  fill: none;
  stroke: #bfdbfe;
  stroke-width: ${({ $depth }) => 1.1 - $depth * 0.12};
  stroke-linecap: square;
  stroke-linejoin: miter;
  stroke-dasharray: 14 86;
  animation: ${electricFlow} 0.75s linear infinite;
  animation-delay: ${({ $sparkDelay }) => $sparkDelay}s;
`;

const CircuitNode = styled.circle`
  fill: ${({ theme }) => theme.accent};
  transform: scale(${({ $active }) => ($active ? 1 : 0)});
  transform-origin: center;
  transform-box: fill-box;
  opacity: ${({ $active }) => ($active ? 0.95 : 0)};
  transition:
    transform 180ms cubic-bezier(0.22, 1, 0.36, 1) ${({ $active, $nodeDelay, $leaveDelay }) => ($active ? $nodeDelay : $leaveDelay)}s,
    opacity 120ms ease ${({ $active, $nodeDelay, $leaveDelay }) => ($active ? $nodeDelay : $leaveDelay + TRACE_MS / 1000)}s;
`;

const CircuitHub = styled.circle`
  fill: ${({ theme }) => theme.accent};
  filter: url(#sparkGlow);
  transform-box: fill-box;
  transform-origin: center;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 0.12s ease;
  animation: ${({ $active }) => ($active ? hubPulse : 'none')} 0.9s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const PortraitFrame = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) translateZ(var(--tilt-lift, 0px));
  transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform;

  &::before {
    content: '';
    position: absolute;
    inset: -14px;
    border-radius: 28px;
    background: linear-gradient(135deg, ${({ theme }) => theme.accent}55, transparent 60%);
    filter: blur(8px);
    opacity: ${({ $active }) => ($active ? 1 : 0.6)};
    transition: opacity 0.4s ease;
    z-index: -1;
  }

  img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 24px;
    border: 1px solid ${({ theme }) => theme.borderStrong};
    box-shadow: ${({ $active, theme }) => {
    const shadow = $active
      ? `0 20px 50px ${theme.shadowColor}, 0 0 30px ${theme.glow}`
      : `0 8px 24px ${theme.shadowColor}`;
    return shadow;
  }};
    transition: box-shadow 0.4s ease;
    backface-visibility: hidden;
  }

  @media (prefers-reduced-motion: reduce) {
    transform: none !important;
    transition: none;
  }
`;

const CIRCUIT_PATHS = [
  { d: 'M150,150 H35 V55 H-60', depth: 0, node: [-60, 55] },
  { d: 'M150,150 H265 V25 H375', depth: 0, node: [375, 25] },
  { d: 'M150,150 V265 H20 V375', depth: 0, node: [20, 375] },
  { d: 'M150,150 V265 H280 V375', depth: 0, node: [280, 375] },
  { d: 'M150,150 H-65', depth: 0, node: [-65, 150] },
  { d: 'M150,150 H380', depth: 0, node: [380, 150] },
  { d: 'M150,150 V-65', depth: 0, node: [150, -65] },
  { d: 'M150,150 V380', depth: 0, node: [150, 380] },
  { d: 'M35,55 V5 H-55', depth: 1, node: [-55, 5] },
  { d: 'M35,55 H-40', depth: 1, node: [-40, 55] },
  { d: 'M265,25 H310 V-45', depth: 1, node: [310, -45] },
  { d: 'M265,25 V75 H345', depth: 1, node: [345, 75] },
  { d: 'M20,265 H-50 V330', depth: 1, node: [-50, 330] },
  { d: 'M20,265 V310 H-35', depth: 1, node: [-35, 310] },
  { d: 'M280,265 H340 V330', depth: 1, node: [340, 330] },
  { d: 'M280,265 V310 H365', depth: 1, node: [365, 310] },
  { d: 'M150,265 H85 V320', depth: 1, node: [85, 320] },
  { d: 'M150,265 H215 V320', depth: 1, node: [215, 320] },
  { d: 'M90,150 V95 H175', depth: 1, node: [175, 95] },
  { d: 'M210,150 V205 H125', depth: 1, node: [125, 205] },
  { d: 'M-40,55 V15 H-70', depth: 2, node: [-70, 15] },
  { d: 'M-40,55 H-65 V85', depth: 2, node: [-65, 85] },
  { d: 'M310,-45 H370', depth: 2, node: [370, -45] },
  { d: 'M345,75 V120 H385', depth: 2, node: [385, 120] },
  { d: 'M-50,330 H-75 V360', depth: 2, node: [-75, 360] },
  { d: 'M340,330 H385', depth: 2, node: [385, 330] },
  { d: 'M85,320 H35 V360', depth: 2, node: [35, 360] },
  { d: 'M215,320 H265 V360', depth: 2, node: [265, 360] },
  { d: 'M175,95 H220 V50', depth: 2, node: [220, 50] },
  { d: 'M125,205 H70 V250', depth: 2, node: [70, 250] },
  { d: 'M-70,15 H-85', depth: 3, node: [-85, 15] },
  { d: 'M-65,85 V105', depth: 3, node: [-65, 105] },
  { d: 'M370,-45 V-65', depth: 3, node: [370, -65] },
  { d: 'M385,120 H400', depth: 3, node: [400, 120] },
  { d: 'M-75,360 H-90', depth: 3, node: [-90, 360] },
  { d: 'M385,330 V350', depth: 3, node: [385, 350] },
  { d: 'M35,360 H10', depth: 3, node: [10, 360] },
  { d: 'M265,360 H290', depth: 3, node: [290, 360] },
  { d: 'M220,50 H245 V25', depth: 3, node: [245, 25] },
  { d: 'M70,250 H45 V275', depth: 3, node: [45, 275] },
  { d: 'M-85,15 V0', depth: 4, node: [-85, 0] },
  { d: 'M400,120 V140', depth: 4, node: [400, 140] },
  { d: 'M-90,360 V375', depth: 4, node: [-90, 375] },
  { d: 'M290,360 V375', depth: 4, node: [290, 375] },
  { d: 'M245,25 H265', depth: 4, node: [265, 25] },
  { d: 'M45,275 H25', depth: 4, node: [25, 275] },
];

const CircuitLayer = React.memo(function CircuitLayer({ active, theme }) {
  const sparkPaths = useMemo(
    () => CIRCUIT_PATHS.filter((path) => path.depth <= SPARK_DEPTH_MAX),
    [],
  );

  return (
    <svg viewBox='-90 -90 480 480' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <filter id='circuitGlow' x='-20%' y='-20%' width='140%' height='140%'>
          <feGaussianBlur stdDeviation='1.8' result='blur' />
          <feMerge>
            <feMergeNode in='blur' />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
        <filter id='sparkGlow' x='-30%' y='-30%' width='160%' height='160%'>
          <feGaussianBlur stdDeviation='2.5' result='blur' />
          <feMerge>
            <feMergeNode in='blur' />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
      </defs>
      <CircuitTraces>
        {CIRCUIT_PATHS.map((path, i) => {
          const timing = pathTiming(path.depth, i);
          return (
            <CircuitTrace
              key={`trace-${path.d}`}
              d={path.d}
              pathLength='100'
              theme={theme}
              $depth={path.depth}
              $active={active}
              $enterDelay={timing.enterDelay}
              $leaveDelay={timing.leaveDelay}
            />
          );
        })}
      </CircuitTraces>
      {active && (
        <CircuitSparks $active={active}>
          {sparkPaths.map((path, i) => {
            const timing = pathTiming(path.depth, i);
            return (
              <CircuitSpark
                key={`spark-${path.d}`}
                d={path.d}
                pathLength='100'
                $depth={path.depth}
                $sparkDelay={timing.sparkDelay}
              />
            );
          })}
        </CircuitSparks>
      )}
      {CIRCUIT_PATHS.map((path, i) => {
        const timing = pathTiming(path.depth, i);
        return (
          <CircuitNode
            key={`node-${path.d}`}
            cx={path.node[0]}
            cy={path.node[1]}
            r={3.8 - path.depth * 0.45}
            theme={theme}
            $active={active}
            $nodeDelay={timing.nodeDelay}
            $leaveDelay={timing.leaveDelay}
          />
        );
      })}
      <CircuitHub cx={150} cy={150} theme={theme} $active={active} r='4.5' />
    </svg>
  );
});

const TILT_MAX = 14;

export const Hero = () => {
  const { theme, t, isMobile } = useContext(AppContext);
  const onAnchorClick = useAnchorScroll();
  const h = t.hero;
  const portraitRef = useRef(null);
  const portraitFrameRef = useRef(null);
  const electricFieldRef = useRef(null);
  const hoveredRef = useRef(false);
  const introActiveRef = useRef(false);
  const introEndTimerRef = useRef(null);
  const tiltRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [introActive, setIntroActive] = useState(false);
  const circuitActive = hovered || introActive;

  const applyTilt = useCallback(() => {
    rafRef.current = null;
    const { x, y } = tiltRef.current;
    const lift = hoveredRef.current || introActiveRef.current ? 12 : 0;
    const field = electricFieldRef.current;
    const frame = portraitFrameRef.current;

    if (field) {
      field.style.setProperty('--tilt-x', `${x * 0.35}deg`);
      field.style.setProperty('--tilt-y', `${y * 0.35}deg`);
    }
    if (frame) {
      frame.style.setProperty('--tilt-x', `${x}deg`);
      frame.style.setProperty('--tilt-y', `${y}deg`);
      frame.style.setProperty('--tilt-lift', `${lift}px`);
    }
  }, []);

  const queueTilt = useCallback(() => {
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(applyTilt);
    }
  }, [applyTilt]);

  const handleMouseMove = useCallback(
    (e) => {
      if (isMobile) {
        return;
      }
      const el = portraitRef.current;
      if (!el) {
        return;
      }
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      tiltRef.current = { x: y * -TILT_MAX, y: x * TILT_MAX };
      queueTilt();
    },
    [isMobile, queueTilt],
  );

  const handleMouseEnter = useCallback(() => {
    if (!isMobile) {
      hoveredRef.current = true;
      setHovered(true);
      queueTilt();
    }
  }, [isMobile, queueTilt]);

  const handleMouseLeave = useCallback(() => {
    hoveredRef.current = false;
    setHovered(false);
    tiltRef.current = { x: 0, y: 0 };
    queueTilt();
  }, [queueTilt]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      return undefined;
    }

    const maxEnterMs = Math.max(
      ...CIRCUIT_PATHS.map((path, i) => (pathTiming(path.depth, i).enterDelay + TRACE_MS / 1000) * 1000),
    );

    const startTimer = window.setTimeout(() => {
      introActiveRef.current = true;
      setIntroActive(true);
      queueTilt();

      introEndTimerRef.current = window.setTimeout(() => {
        introActiveRef.current = false;
        setIntroActive(false);
        queueTilt();
      }, maxEnterMs + INTRO_HOLD_MS);
    }, INTRO_DELAY_MS);

    return () => {
      window.clearTimeout(startTimer);
      if (introEndTimerRef.current) {
        window.clearTimeout(introEndTimerRef.current);
      }
      introActiveRef.current = false;
    };
  }, [queueTilt]);

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
        <Status theme={theme}>{h.status}</Status>
        <Title theme={theme}>
          {h.titleA}<span>{h.titleB}</span>
        </Title>
        <Subtitle theme={theme}>{h.subtitle}</Subtitle>
        <Actions>
          <PrimaryButton href='#contacto' theme={theme} onClick={onAnchorClick}>{h.ctaPrimary}</PrimaryButton>
          <SecondaryButton href='#proyectos' theme={theme} onClick={onAnchorClick}>{h.ctaSecondary}</SecondaryButton>
        </Actions>
        <Stats>
          {h.stats.map((s) => (
            <Stat key={s.label}>
              <StatValue theme={theme}>{s.value}</StatValue>
              <StatLabel theme={theme}>{s.label}</StatLabel>
            </Stat>
          ))}
        </Stats>
      </Content>
      <Visual>
        <PortraitScene
          ref={portraitRef}
          data-scroll
          data-scroll-speed='1.6'
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <ElectricField ref={electricFieldRef} theme={theme} aria-hidden>
            <ElectricAmbience $active={circuitActive} theme={theme} />
            <CircuitLayer active={circuitActive} theme={theme} />
          </ElectricField>
          <PortraitFrame
            ref={portraitFrameRef}
            theme={theme}
            $active={circuitActive}
          >
            <img src='/images/profile.png' alt={h.portraitAlt} />
          </PortraitFrame>
        </PortraitScene>
      </Visual>
    </Wrapper>
  );
};
