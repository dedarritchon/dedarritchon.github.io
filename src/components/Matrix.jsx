import React, { useContext, useEffect, useRef, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { AppContext } from './../App/AppContext';

const P = {
  Container: styled.div`
    transition: background-color 0.5s linear;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: ${({ theme }) => theme.background};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    z-index: 0;
  `,
};

// Object pool for drops to avoid garbage collection
class DropPool {
  constructor() {
    this.pool = [];
    this.active = [];
  }

  get() {
    if (this.pool.length > 0) {
      return this.pool.pop();
    }
    return {
      x: 0,
      y: 0,
      speed: 1,
      char: '',
      brightness: 1,
      age: 0,
      maxAge: 0,
      glitchTimer: 0,
      trail: []
    };
  }

  release(drop) {
    drop.x = 0;
    drop.y = 0;
    drop.speed = 1;
    drop.char = '';
    drop.brightness = 1;
    drop.age = 0;
    drop.maxAge = 0;
    drop.glitchTimer = 0;
    drop.trail = [];
    this.pool.push(drop);
  }

  cleanup() {
    this.active = this.active.filter((drop) => {
      if (drop.age >= drop.maxAge) {
        this.release(drop);
        return false;
      }
      return true;
    });
  }
}

function animateTitle(Title = 'Hello World ;)', delay = 300) {
  let counter = 0;
  let direction = true;
  let newtitle;
  setInterval(function () {
    if (counter === Title.length) {
      direction = false;
    }
    if (counter === 1) {
      direction = true;
    }
    counter = direction === true ? ++counter : --counter;
    newtitle = counter === 0 ? ' ' : Title.slice(0, counter);
    document.title = newtitle;
  }, delay);
}

animateTitle();

export const Matrix = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const dropPoolRef = useRef(new DropPool());
  const mouseRef = useRef({ x: 0, y: 0, lastMove: 0 });
  const colorRef = useRef({ current: '#0F0', mouse: '#FFD700' });

  const { theme } = useContext(AppContext);

  // Memoized character set
  const chars = useMemo(() => {
    return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*|`+-/~{[()]}ば司立肌切チじを飯端めなだごさ対全分人ぜち使'.split('');
  }, []);

  // Memoized colors
  const colors = useMemo(() => ['#0F0', '#F00', '#0FF', '#FF0', '#F0F', '#FFF'], []);

  // Performance constants
  const FONT_SIZE = 20; // Increased font size for better visibility
  const COLUMN_SPACING = FONT_SIZE * 1.2;
  const MAX_DROPS = 400;
  const GLITCH_CHANCE = 0.001;
  const TRAIL_LENGTH = 2;

  // Mouse event handlers with throttling
  const handleMouseMove = useCallback((e) => {
    const currentTime = Date.now();
    if (currentTime - mouseRef.current.lastMove > 16) { // ~60fps
      mouseRef.current.lastMove = currentTime;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }
  }, []);

  const handleColorChange = useCallback(() => {
    let newColor = colors[Math.floor(Math.random() * colors.length)];
    while (newColor === colorRef.current.current) {
      newColor = colors[Math.floor(Math.random() * colors.length)];
    }
    colorRef.current.current = newColor;
    colorRef.current.mouse = colors[Math.floor(Math.random() * colors.length)];
  }, [colors]);

  const handleWheel = useCallback(() => {
    handleColorChange();
  }, [handleColorChange]);

  const handleClick = useCallback(() => {
    handleColorChange();
  }, [handleColorChange]);

  // Get random character with weighted distribution
  const getRandomChar = useCallback(() => {
    const rand = Math.random();
    if (rand < 0.6) {
      return chars[Math.floor(Math.random() * 26)]; // Letters
    } else if (rand < 0.8) {
      return chars[26 + Math.floor(Math.random() * 26)]; // Uppercase
    } else if (rand < 0.9) {
      return chars[52 + Math.floor(Math.random() * 9)]; // Numbers
    } else {
      return chars[61 + Math.floor(Math.random() * (chars.length - 61))]; // Special chars
    }
  }, [chars]);

  // Create new drop
  const createDrop = useCallback((x) => {
    if (dropPoolRef.current.active.length >= MAX_DROPS) {
      return;
    }

    const drop = dropPoolRef.current.get();
    drop.x = x;
    drop.y = -FONT_SIZE;
    drop.speed = 1 + Math.random() * 2;
    drop.char = getRandomChar();
    drop.brightness = 1;
    drop.age = 0;
    drop.maxAge = 200 + Math.random() * 300;
    drop.glitchTimer = 0;
    drop.trail = [];

    dropPoolRef.current.active.push(drop);
  }, [getRandomChar]);

  // Main render function
  const render = useCallback((ctx, canvas) => {
    // Clear with fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.015)'; // Reduced fade for better visibility
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and render drops
    dropPoolRef.current.active.forEach((drop) => {
      // Update position
      drop.y += drop.speed;
      drop.age++;

      // Calculate distance from mouse
      const dx = drop.x - mouseRef.current.x;
      const dy = drop.y - mouseRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const radius = 150;

      // Mouse interaction
      if (distance < radius) {
        const angle = Math.atan2(dy, dx);
        const force = (radius - distance) / radius;
        drop.x += Math.cos(angle) * force * 2;
        drop.y += Math.sin(angle) * force * 2;
      }

      // Update trail
      drop.trail.push({ x: drop.x, y: drop.y, brightness: drop.brightness });
      if (drop.trail.length > TRAIL_LENGTH) {
        drop.trail.shift();
      }

      // Glitch effect
      if (Math.random() < GLITCH_CHANCE) {
        drop.glitchTimer = 3;
        drop.char = getRandomChar();
      }

      // Render trail
      drop.trail.forEach((trailPoint, index) => {
        const alpha = (index / drop.trail.length) * drop.brightness * 0.08; // Increased alpha for better visibility
        ctx.fillStyle = `rgba(0, 255, 0, ${alpha})`;
        ctx.font = `bold ${FONT_SIZE}px 'Courier New', monospace`; // Better font for crisp rendering
        ctx.textBaseline = 'top';
        ctx.textAlign = 'center';
        ctx.fillText(drop.char, Math.round(trailPoint.x), Math.round(trailPoint.y)); // Round coordinates for crisp pixels
      });

      // Render main character
      const brightness = Math.max(0.3, drop.brightness - (drop.age / drop.maxAge));
      const isNearMouse = distance < radius;
      const currentColor = isNearMouse ? colorRef.current.mouse : colorRef.current.current;

      // Convert hex to RGB and apply brightness
      const hex = currentColor.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${brightness})`;
      ctx.font = `bold ${FONT_SIZE}px 'Courier New', monospace`; // Better font for crisp rendering
      ctx.textBaseline = 'top';
      ctx.textAlign = 'center';

      // Glitch effect
      if (drop.glitchTimer > 0) {
        ctx.fillText(drop.char, Math.round(drop.x + (Math.random() - 0.5) * 2), Math.round(drop.y));
        drop.glitchTimer--;
      } else {
        ctx.fillText(drop.char, Math.round(drop.x), Math.round(drop.y)); // Round coordinates for crisp pixels
      }

      // Fade out at bottom
      if (drop.y > canvas.height - FONT_SIZE * 2) {
        drop.brightness *= 0.99;
      }
    });

    // Cleanup old drops
    dropPoolRef.current.cleanup();

    // Create new drops
    const columns = Math.floor(canvas.width / COLUMN_SPACING);
    for (let i = 0; i < columns; i++) {
      if (Math.random() < 0.05) { // Higher spawn rate for continuous flow
        createDrop(i * COLUMN_SPACING);
      }
    }
  }, [createDrop, getRandomChar]);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');

    // Handle resize
    if (canvas.height !== window.innerHeight || canvas.width !== window.innerWidth) {
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;

      // Set up crisp text rendering
      ctx.imageSmoothingEnabled = false;
      ctx.textRenderingOptimization = 'optimizeSpeed';
    }

    render(ctx, canvas);
    animationRef.current = requestAnimationFrame(animate);
  }, [render]);

  useEffect(() => {
    // Initialize mouse position
    mouseRef.current.x = window.innerWidth / 2;
    mouseRef.current.y = window.innerHeight / 2;

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    // Start animation
    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('click', handleClick);
    };
  }, [animate, handleMouseMove, handleWheel, handleClick]);

  // Keypress event for the Neo message
  useEffect(() => {
    const handleKeyPress = (event) => {
      alert(
        'Welcome back, Neo.\n\nClick or Scroll your mouse to change the Matrix colors'
      );
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, []);

  return (
    <P.Container theme={theme}>
      <canvas
        id='canvas'
        ref={canvasRef}
        style={{
          display: 'block',
          imageRendering: 'crisp-edges', // For crisp text
          imageRendering: '-webkit-optimize-contrast',
          imageRendering: 'pixelated'
        }}
      />
    </P.Container>
  );
};
