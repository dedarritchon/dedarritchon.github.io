import React from 'react';
import styled from 'styled-components';

import useScrollReveal from './../hooks/useScrollReveal';

const directions = {
  up: 'translateY(28px)',
  down: 'translateY(-28px)',
  left: 'translateX(28px)',
  right: 'translateX(-28px)',
  none: 'none',
};

const Wrapper = styled.div`
  height: 100%;
  opacity: ${({ inView }) => (inView ? 1 : 0)};
  transform: ${({ inView, from }) => (inView ? 'none' : directions[from] || directions.up)};
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${({ delay }) => delay}ms,
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${({ delay }) => delay}ms;
  will-change: opacity, transform;
`;

// Envuelve contenido para animarlo cuando entra en el viewport.
// Uso: <Reveal from="up" delay={100}>...</Reveal>
export const Reveal = ({ children, from = 'up', delay = 0, threshold, className }) => {
  const { ref, inView } = useScrollReveal({ threshold });

  return (
    <Wrapper ref={ref} inView={inView} from={from} delay={delay} className={className}>
      {children}
    </Wrapper>
  );
};

export default Reveal;
