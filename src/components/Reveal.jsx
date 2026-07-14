import React from 'react';
import styled from 'styled-components';

import useScrollReveal from './../hooks/useScrollReveal';

const Wrapper = styled.div`
  height: 100%;
  opacity: ${({ inView }) => (inView ? 1 : 0)};
  transform: ${({ inView, hiddenTransform }) => (inView ? 'none' : hiddenTransform)};
  transition: opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1) ${({ delay }) => delay}ms,
    transform 0.75s cubic-bezier(0.22, 1, 0.36, 1) ${({ delay }) => delay}ms;
  will-change: opacity, transform;
`;

// Envuelve contenido para animarlo cuando entra en el viewport.
// Uso: <Reveal from="up" delay={100} distance={36}>...</Reveal>
export const Reveal = ({ children, from = 'up', delay = 0, distance = 28, threshold, className }) => {
  const { ref, inView } = useScrollReveal({ threshold });

  const offsets = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
    none: 'none',
  };
  const hiddenTransform = offsets[from] || offsets.up;

  return (
    <Wrapper
      ref={ref}
      inView={inView}
      hiddenTransform={hiddenTransform}
      delay={delay}
      className={className}
    >
      {children}
    </Wrapper>
  );
};

export default Reveal;
