import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.mock('locomotive-scroll', () => {
  class LocomotiveScrollMock {
    on() {}
    destroy() {}
    start() {}
    stop() {}
    update() {}
    scrollTo() {}
  }
  return { default: LocomotiveScrollMock };
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver = globalThis.ResizeObserver || ResizeObserverMock;
