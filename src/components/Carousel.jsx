import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { AppContext } from './../App/AppContext';
import { pick } from './../data/projects';

const Wrapper = styled.div`
  width: 100%;
`;

const Stage = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 14px;
  overflow: hidden;
  background: ${({ theme }) => theme.surfaceHover};
  border: 1px solid ${({ theme }) => theme.border};
`;

const Slide = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: opacity 0.45s ease;
`;

const Arrow = styled.button`
  position: absolute;
  top: 50%;
  ${({ side }) => (side === 'left' ? 'left: 12px;' : 'right: 12px;')}
  transform: translateY(-50%);
  display: ${({ visible }) => (visible ? 'inline-flex' : 'none')};
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  color: #fff;
  background: rgba(10, 14, 39, 0.6);
  border: 1px solid ${({ theme }) => theme.borderStrong};
  backdrop-filter: blur(6px);
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.cta};
    transform: translateY(-50%) scale(1.05);
  }
`;

const Counter = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  color: #fff;
  background: rgba(10, 14, 39, 0.65);
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 999px;
  padding: 0.2rem 0.7rem;
  font-size: 0.78rem;
  font-family: 'Space Grotesk', sans-serif;
`;

const Caption = styled.p`
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 0.92rem;
  text-align: center;
  margin: 0.9rem 0 0;
  min-height: 1.2em;
`;

const Thumbs = styled.div`
  display: flex;
  gap: 0.6rem;
  margin-top: 1rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
`;

const Thumb = styled.button`
  flex: 0 0 auto;
  width: 74px;
  height: 48px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  background: none;
  border: 2px solid ${({ active, theme }) => (active ? theme.accent : 'transparent')};
  opacity: ${({ active }) => (active ? 1 : 0.55)};
  transition: opacity 0.2s ease, border-color 0.2s ease;

  &:hover {
    opacity: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ArrowIcon = ({ dir }) => (
  <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    {dir === 'left' ? <polyline points='15 18 9 12 15 6' /> : <polyline points='9 18 15 12 9 6' />}
  </svg>
);

export const Carousel = ({ images = [] }) => {
  const { theme, lang } = useContext(AppContext);
  const [index, setIndex] = useState(0);
  const caption = (img, fallback) => pick(img.caption, lang) || fallback;
  const count = images.length;
  const hasMultiple = count > 1;

  const go = useCallback(
    (next) => setIndex((i) => (next + count) % count),
    [count]
  );

  useEffect(() => {
    setIndex(0);
  }, [images]);

  useEffect(() => {
    if (!hasMultiple) {return;}
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') {go(index - 1);}
      if (e.key === 'ArrowRight') {go(index + 1);}
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, go, hasMultiple]);

  if (count === 0) {return null;}

  return (
    <Wrapper>
      <Stage theme={theme}>
        {images.map((img, i) => (
          <Slide key={img.src + i} src={img.src} alt={caption(img, `Imagen ${i + 1}`)} active={i === index} />
        ))}
        <Arrow theme={theme} side='left' visible={hasMultiple} aria-label='Imagen anterior' onClick={() => go(index - 1)}>
          <ArrowIcon dir='left' />
        </Arrow>
        <Arrow theme={theme} side='right' visible={hasMultiple} aria-label='Imagen siguiente' onClick={() => go(index + 1)}>
          <ArrowIcon dir='right' />
        </Arrow>
        {hasMultiple && <Counter theme={theme}>{index + 1} / {count}</Counter>}
      </Stage>

      <Caption theme={theme}>{caption(images[index], '')}</Caption>

      {hasMultiple && (
        <Thumbs>
          {images.map((img, i) => (
            <Thumb
              key={img.src + i}
              theme={theme}
              active={i === index}
              aria-label={`Ir a imagen ${i + 1}`}
              onClick={() => setIndex(i)}
            >
              <img src={img.src} alt={caption(img, `Miniatura ${i + 1}`)} />
            </Thumb>
          ))}
        </Thumbs>
      )}
    </Wrapper>
  );
};

export default Carousel;
