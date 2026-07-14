import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useLocomotive } from './../hooks/useLocomotive';

const Outer = styled.section.attrs({ 'data-scroll-section': '' })`
  position: relative;
  width: 100%;
`;

const Pin = styled.div`
  ${({ $enabled }) =>
    $enabled
      ? `
    height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;
  `
      : `
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  `}
`;

const GUTTER = 'max(1.5rem, calc((100vw - 1120px) / 2 + 1.5rem))';

const Track = styled.div`
  display: flex;
  align-items: stretch;
  gap: 1.75rem;
  padding: 1rem ${GUTTER};
  backface-visibility: hidden;

  @media (max-width: 900px) {
    padding: 1rem 1.25rem;
  }
`;

const EdgeSpacer = styled.div`
  flex: 0 0 auto;
  width: 3rem;

  @media (max-width: 900px) {
    width: 0;
  }
`;

const canEnable = () => {
  if (typeof window === 'undefined') {return false;}
  const wide = window.matchMedia('(min-width: 901px)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return wide && !reduced;
};

export const HorizontalScroll = ({ children, className }) => {
  const { update, subscribeScroll } = useLocomotive();
  const outerRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const maxXRef = useRef(0);
  const startYRef = useRef(0);
  const lastYRef = useRef(0);
  const measureTimerRef = useRef(0);
  const [enabled, setEnabled] = useState(canEnable);

  useEffect(() => {
    const onResize = () => setEnabled(canEnable());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const outer = outerRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!outer || !pin || !track) {return undefined;}

    if (!enabled) {
      outer.style.height = '';
      pin.style.transform = '';
      track.style.transform = '';
      return undefined;
    }

    const apply = (y) => {
      lastYRef.current = y;
      const maxX = maxXRef.current;
      if (maxX <= 0) {
        pin.style.transform = '';
        track.style.transform = '';
        return;
      }
      const progress = Math.min(Math.max(y - startYRef.current, 0), maxX);
      pin.style.transform = `translate3d(0, ${progress}px, 0)`;
      track.style.transform = `translate3d(${-progress}px, 0, 0)`;
    };

    const measure = () => {
      pin.style.transform = '';
      track.style.transform = '';

      const maxX = Math.max(track.scrollWidth - pin.clientWidth, 0);
      maxXRef.current = maxX;
      outer.style.height = `${window.innerHeight + maxX}px`;
      startYRef.current = lastYRef.current + outer.getBoundingClientRect().top;

      if (update) {update();}
      apply(lastYRef.current);
    };

    const scheduleMeasure = () => {
      clearTimeout(measureTimerRef.current);
      measureTimerRef.current = setTimeout(measure, 150);
    };

    const unsub = subscribeScroll ? subscribeScroll(apply) : null;

    measure();
    const remeasureTimer = setTimeout(measure, 700);
    window.addEventListener('resize', scheduleMeasure);
    const resizeObserver = new ResizeObserver(scheduleMeasure);
    resizeObserver.observe(track);

    return () => {
      clearTimeout(remeasureTimer);
      clearTimeout(measureTimerRef.current);
      if (unsub) {unsub();}
      window.removeEventListener('resize', scheduleMeasure);
      resizeObserver.disconnect();
    };
  }, [enabled, children, update, subscribeScroll]);

  return (
    <Outer ref={outerRef} className={className}>
      <Pin ref={pinRef} $enabled={enabled}>
        <Track ref={trackRef}>
          <EdgeSpacer aria-hidden='true' />
          {children}
          <EdgeSpacer aria-hidden='true' />
        </Track>
      </Pin>
    </Outer>
  );
};

export default HorizontalScroll;
