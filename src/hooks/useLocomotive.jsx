import React, { createContext, useContext, useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

const LocomotiveContext = createContext({
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
  update: () => {},
});

export const useLocomotive = () => useContext(LocomotiveContext);

// Provider de scroll suave con Locomotive Scroll (v4).
// - El header (navbar) se renderiza FUERA del contenedor porque es position: fixed.
// - Respeta prefers-reduced-motion y desactiva smooth en móvil por rendimiento.
export const SmoothScrollProvider = ({ header, children }) => {
  const containerRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) {return undefined;}

    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const instance = new LocomotiveScroll({
      el,
      smooth: !prefersReduced,
      lerp: 0.08,
      getDirection: true,
      class: 'is-inview',
      tablet: { smooth: true, breakpoint: 1024 },
      smartphone: { smooth: false },
    });
    instanceRef.current = instance;

    // Reenvía la posición de scroll para que otros componentes (navbar) reaccionen,
    // ya que con smooth scroll window.scrollY se mantiene en 0.
    instance.on('scroll', (obj) => {
      const y = obj && obj.scroll ? obj.scroll.y : 0;
      window.dispatchEvent(new CustomEvent('locomotive-scroll', { detail: { y } }));
    });

    // Recalcula posiciones cuando fuentes/imágenes terminan de cargar.
    const refresh = () => instance.update();
    const timer = setTimeout(refresh, 500);
    window.addEventListener('load', refresh);
    const images = Array.from(el.querySelectorAll('img'));
    images.forEach((img) => img.addEventListener('load', refresh));

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', refresh);
      images.forEach((img) => img.removeEventListener('load', refresh));
      instance.destroy();
      instanceRef.current = null;
    };
  }, []);

  const value = {
    scrollTo: (target, options) => instanceRef.current && instanceRef.current.scrollTo(target, options),
    stop: () => instanceRef.current && instanceRef.current.stop(),
    start: () => instanceRef.current && instanceRef.current.start(),
    update: () => instanceRef.current && instanceRef.current.update(),
  };

  return (
    <LocomotiveContext.Provider value={value}>
      {header}
      <div data-scroll-container ref={containerRef}>
        {children}
      </div>
    </LocomotiveContext.Provider>
  );
};

export default SmoothScrollProvider;
