import { render, screen } from '@testing-library/react';
import { describe, expect, test, beforeEach } from 'vitest';

import App from './App/App';

describe('application smoke tests', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('renders hero title', () => {
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  test('renders primary contact CTA', () => {
    const links = screen.getAllByRole('link');
    const contact = links.find((link) => (link.getAttribute('href') || '').includes('#contacto'));
    expect(contact).toBeTruthy();
  });

  test('renders navigation landmarks', () => {
    expect(document.getElementById('inicio')).toBeTruthy();
    expect(document.getElementById('contacto')).toBeTruthy();
  });
});
