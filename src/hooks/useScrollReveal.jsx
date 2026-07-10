import { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Detecta cuando un elemento entra en el viewport para disparar animaciones
// de "reveal" al hacer scroll (inspirado en Locomotive Scroll, pero nativo
// con IntersectionObserver). Respeta prefers-reduced-motion.
export const useScrollReveal = ({ threshold = 0.15, rootMargin = '0px 0px -10% 0px', once = true } = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {return;}

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {observer.unobserve(entry.target);}
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
};

export default useScrollReveal;
