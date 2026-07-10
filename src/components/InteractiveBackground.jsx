import React, { useContext, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

import { AppContext } from './../App/AppContext';

const Layer = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
`;

const drift = keyframes`
  0%   { transform: translate3d(-10%, -8%, 0) scale(1); }
  33%  { transform: translate3d(8%, 6%, 0) scale(1.15); }
  66%  { transform: translate3d(-6%, 10%, 0) scale(0.95); }
  100% { transform: translate3d(-10%, -8%, 0) scale(1); }
`;

// Resplandor que sigue el cursor (efecto líquido con suavizado).
const CursorGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 60vmax;
  height: 60vmax;
  border-radius: 50%;
  will-change: transform;
  mix-blend-mode: screen;
  filter: blur(90px);
  opacity: 0.55;
  background: radial-gradient(
    circle at center,
    ${({ theme }) => theme.accent}cc 0%,
    ${({ theme }) => theme.accent}55 35%,
    transparent 70%
  );
`;

// Blob ambiental que deriva lentamente para dar sensación líquida constante.
const AmbientBlob = styled.div`
  position: absolute;
  width: 55vmax;
  height: 55vmax;
  border-radius: 50%;
  filter: blur(110px);
  opacity: 0.4;
  mix-blend-mode: screen;
  background: radial-gradient(circle at center, #6366f1aa 0%, #6366f133 40%, transparent 70%);
  animation: ${drift} 26s ease-in-out infinite;

  &.b1 { top: -10%; left: -5%; }
  &.b2 {
    bottom: -15%;
    right: -8%;
    background: radial-gradient(circle at center, #22d3eeaa 0%, #22d3ee33 40%, transparent 70%);
    animation-duration: 34s;
    animation-direction: reverse;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const InteractiveBackground = () => {
  const { theme } = useContext(AppContext);
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) {return undefined;}

    const reduce =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const half = () => glow.offsetWidth / 2;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight * 0.4;
    let curX = targetX;
    let curY = targetY;
    let raf = null;

    const place = (x, y) => {
      glow.style.transform = `translate3d(${x - half()}px, ${y - half()}px, 0)`;
    };

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    if (reduce) {
      place(targetX, targetY);
      return undefined;
    }

    const loop = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      place(curX, curY);
      raf = requestAnimationFrame(loop);
    };

    place(curX, curY);
    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) {cancelAnimationFrame(raf);}
    };
  }, []);

  return (
    <Layer>
      <AmbientBlob className='b1' />
      <AmbientBlob className='b2' />
      <CursorGlow ref={glowRef} theme={theme} />
    </Layer>
  );
};

export default InteractiveBackground;
