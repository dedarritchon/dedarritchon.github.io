import React, { createContext, useContext, useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

const LocomotiveContext = createContext({
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
  update: () => {},
  subscribeScroll: () => () => {},
});

export const useLocomotive = () => useContext(LocomotiveContext);

// Devuelve un handler de click para anclas internas (#seccion) que usa el
// scrollTo de Locomotive. Es imprescindible: con smooth scroll el contenedor
// está transformado, por lo que el salto nativo del navegador (href="#x")
// se rompe y no muestra la sección. Con fallback a scrollIntoView.
export const useAnchorScroll = (offset = -80) => {
  const { scrollTo } = useLocomotive();

  return (e, href) => {
    const selector = href || (e.currentTarget && e.currentTarget.getAttribute('href'));
    if (!selector || selector[0] !== '#') {return;}

    const target = document.querySelector(selector);
    if (!target) {return;}

    e.preventDefault();
    if (scrollTo) {
      scrollTo(target, { offset });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };
};

// Provider de scroll suave con Locomotive Scroll (v4).
// - El header (navbar) se renderiza FUERA del contenedor porque es position: fixed.
// - Respeta prefers-reduced-motion y desactiva smooth en móvil por rendimiento.
export const SmoothScrollProvider = ({ header, children }) => {
  const containerRef = useRef(null);
  const instanceRef = useRef(null);
  const scrollListenersRef = useRef(new Set());

  useEffect(() => {
    const el = containerRef.current;
    if (!el) {return undefined;}

    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Smooth virtual scroll feels great on desktop, but on touch devices it
    // fights native inertia (lerp catch-up → inconsistent speed / jiggle).
    // Keep native scrolling under the tablet breakpoint.
    const instance = new LocomotiveScroll({
      el,
      smooth: !prefersReduced,
      lerp: 0.1,
      getDirection: true,
      class: 'is-inview',
      tablet: { smooth: false, breakpoint: 1024 },
      smartphone: { smooth: false },
    });
    instanceRef.current = instance;

    instance.on('scroll', (obj) => {
      const y = obj && obj.scroll ? obj.scroll.y : 0;
      scrollListenersRef.current.forEach((fn) => fn(y));
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
    subscribeScroll: (fn) => {
      scrollListenersRef.current.add(fn);
      return () => scrollListenersRef.current.delete(fn);
    },
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
