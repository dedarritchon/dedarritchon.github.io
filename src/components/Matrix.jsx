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
      chars: [],
      brightness: 1,
      age: 0,
      maxAge: 0,
      glitchTimer: 0,
      trail: [],
      column: 0,
      length: 0
    };
  }

  release(drop) {
    drop.x = 0;
    drop.y = 0;
    drop.speed = 1;
    drop.chars = [];
    drop.brightness = 1;
    drop.age = 0;
    drop.maxAge = 0;
    drop.glitchTimer = 0;
    drop.trail = [];
    drop.column = 0;
    drop.length = 0;
    this.pool.push(drop);
  }

  cleanup() {
    // More efficient cleanup - iterate backwards to avoid index shifting
    for (let i = this.active.length - 1; i >= 0; i--) {
      const drop = this.active[i];
      if (drop.age >= drop.maxAge || drop.y > window.innerHeight + 100) {
        this.release(drop);
        this.active.splice(i, 1);
      }
    }
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
  const columnsRef = useRef([]);
  const lastDropTimeRef = useRef(0);
  const frameCountRef = useRef(0);

  const { theme } = useContext(AppContext);

  // Authentic Matrix character set - mainly katakana with some Latin characters
  const chars = useMemo(() => {
    return [
      // Katakana characters (most common in Matrix)
      'ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ',
      'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト',
      'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
      'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ',
      'ル', 'レ', 'ロ', 'ワ', 'ヲ', 'ン', 'ガ', 'ギ', 'グ', 'ゲ',
      'ゴ', 'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ', 'ダ', 'ヂ', 'ヅ', 'デ',
      'ド', 'バ', 'ビ', 'ブ', 'ベ', 'ボ', 'パ', 'ピ', 'プ', 'ペ',
      'ポ', 'ャ', 'ュ', 'ョ', 'ッ', 'ー', '・', '、', '。', '「',
      '」', '『', '』', '（', '）', '［', '］', '｛', '｝', '【',
      '】', '〈', '〉', '《', '》', '『', '』', '「', '」', '『',
      // Latin characters (less common)
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
      'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
      'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3',
      '4', '5', '6', '7', '8', '9', '@', '#', '$', '%',
      '&', '*', '|', '`', '+', '-', '/', '~', '{', '[',
      '(', ')', '}', ']', '=', '>', '<', '?', '!', ';',
      ':', '"', "'", ',', '.', '_', '^', '\\', '|', '°'
    ];
  }, []);

  // Performance constants - optimized for better performance
  const FONT_SIZE = 18;
  const COLUMN_WIDTH = FONT_SIZE * 1.2;
  const MAX_DROPS = 150; // Reduced from 300
  const GLITCH_CHANCE = 0.002; // Increased glitch frequency for better visibility
  const TRAIL_LENGTH = 8; // Reduced from 15 for better performance
  const DROP_SPAWN_INTERVAL = 80; // Increased interval
  const CLEANUP_INTERVAL = 30; // Cleanup every 30 frames

  // Mouse event handlers with throttling
  const handleMouseMove = useCallback((e) => {
    const currentTime = Date.now();
    if (currentTime - mouseRef.current.lastMove > 16) {
      mouseRef.current.lastMove = currentTime;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }
  }, []);

  // Get random character with katakana bias
  const getRandomChar = useCallback(() => {
    const rand = Math.random();
    if (rand < 0.7) {
      // 70% chance for katakana (first 80 characters)
      return chars[Math.floor(Math.random() * 80)];
    } else {
      // 30% chance for Latin characters and symbols
      return chars[80 + Math.floor(Math.random() * (chars.length - 80))];
    }
  }, [chars]);

  // Create new drop in a specific column
  const createDrop = useCallback((column) => {
    if (dropPoolRef.current.active.length >= MAX_DROPS) {
      return;
    }

    const drop = dropPoolRef.current.get();
    drop.x = column * COLUMN_WIDTH + COLUMN_WIDTH / 2;
    drop.y = -FONT_SIZE;
    drop.speed = 0.5 + Math.random() * 1.5;
    drop.column = column;
    drop.length = 3 + Math.floor(Math.random() * 12); // Reduced length range
    drop.brightness = 1;
    drop.age = 0;
    drop.maxAge = 800 + Math.random() * 1200; // Reduced lifespan
    drop.glitchTimer = 0;
    drop.trail = [];
    drop.chars = [];

    // Generate characters for this drop
    for (let i = 0; i < drop.length; i++) {
      drop.chars.push(getRandomChar());
    }

    dropPoolRef.current.active.push(drop);
  }, [getRandomChar]);

  // Initialize columns
  const initializeColumns = useCallback((canvas) => {
    const numColumns = Math.floor(canvas.width / COLUMN_WIDTH);
    columnsRef.current = new Array(numColumns).fill(0).map(() => ({
      lastDrop: 0,
      active: false
    }));
  }, []);

  // Main render function - optimized
  const render = useCallback((ctx, canvas) => {
    // Clear with very subtle fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and render drops
    dropPoolRef.current.active.forEach((drop) => {
      // Update position
      drop.y += drop.speed;
      drop.age++;

      // Calculate distance from mouse for interaction
      const dx = drop.x - mouseRef.current.x;
      const dy = drop.y - mouseRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const radius = 80; // Reduced radius

      // Subtle mouse interaction
      if (distance < radius) {
        const angle = Math.atan2(dy, dx);
        const force = (radius - distance) / radius; // Reduced force
        drop.x += Math.cos(angle) * force;
        drop.y += Math.sin(angle) * force;
      }

      // Update trail more efficiently
      drop.trail.push({ x: drop.x, y: drop.y, brightness: drop.brightness });
      if (drop.trail.length > TRAIL_LENGTH) {
        drop.trail.shift();
      }

      // Glitch effect - more noticeable
      if (Math.random() < GLITCH_CHANCE) {
        drop.glitchTimer = 5; // Increased duration
        drop.chars[0] = getRandomChar(); // Change the first character
      }

      // Decrease glitch timer
      if (drop.glitchTimer > 0) {
        drop.glitchTimer--;
      }

      // Render trail with reduced opacity for better readability
      drop.trail.forEach((trailPoint, trailIndex) => {
        const alpha = (trailIndex / drop.trail.length) * drop.brightness * 0.08; // Reduced from 0.12

        // Matrix green color with trail fade
        ctx.fillStyle = `rgba(0, 255, 70, ${alpha})`;
        ctx.font = `bold ${FONT_SIZE}px 'Courier New', monospace`;
        ctx.textBaseline = 'top';
        ctx.textAlign = 'center';

        // Render each character in the trail
        for (let i = 0; i < drop.chars.length; i++) {
          const charY = trailPoint.y - (i * FONT_SIZE);
          if (charY > -FONT_SIZE && charY < canvas.height) {
            ctx.fillText(drop.chars[i], Math.round(trailPoint.x), Math.round(charY));
          }
        }
      });

      // Render main character with enhanced visibility
      const brightness = Math.max(0.6, drop.brightness - (drop.age / drop.maxAge)); // Increased minimum brightness

      // Main Matrix green color with enhanced contrast
      ctx.fillStyle = `rgba(0, 255, 70, ${brightness})`;
      ctx.font = `bold ${FONT_SIZE}px 'Courier New', monospace`;
      ctx.textBaseline = 'top';
      ctx.textAlign = 'center';

      // Render each character in the drop
      for (let i = 0; i < drop.chars.length; i++) {
        const charY = drop.y - (i * FONT_SIZE);
        if (charY > -FONT_SIZE && charY < canvas.height) {
          // Enhanced glitch effect - more visible
          if (drop.glitchTimer > 0 && i === 0) {
            // Add random offset and color variation for glitch
            const glitchOffset = (Math.random() - 0.5) * 4;
            const glitchColor = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.8)' : `rgba(0, 255, 70, ${brightness})`;
            ctx.fillStyle = glitchColor;
            ctx.fillText(drop.chars[i], Math.round(drop.x + glitchOffset), Math.round(charY));
            ctx.fillStyle = `rgba(0, 255, 70, ${brightness})`; // Reset color
          } else {
            ctx.fillText(drop.chars[i], Math.round(drop.x), Math.round(charY));
          }
        }
      }

      // Fade out at bottom
      if (drop.y > canvas.height - FONT_SIZE * 2) {
        drop.brightness *= 0.98;
      }
    });

    // Cleanup old drops - only every few frames for better performance
    frameCountRef.current++;
    if (frameCountRef.current % CLEANUP_INTERVAL === 0) {
      dropPoolRef.current.cleanup();
    }

    // Create new drops in columns - less frequent
    const currentTime = Date.now();
    if (currentTime - lastDropTimeRef.current > DROP_SPAWN_INTERVAL) {
      lastDropTimeRef.current = currentTime;

      // Find available columns
      const availableColumns = columnsRef.current
        .map((col, index) => ({ ...col, index }))
        .filter((col) => currentTime - col.lastDrop > 1200 + Math.random() * 2000);

      if (availableColumns.length > 0) {
        const randomColumn = availableColumns[Math.floor(Math.random() * availableColumns.length)];
        createDrop(randomColumn.index);
        columnsRef.current[randomColumn.index].lastDrop = currentTime;
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

      // Reinitialize columns on resize
      initializeColumns(canvas);
    }

    render(ctx, canvas);
    animationRef.current = requestAnimationFrame(animate);
  }, [render, initializeColumns]);

  useEffect(() => {
    // Initialize mouse position
    mouseRef.current.x = window.innerWidth / 2;
    mouseRef.current.y = window.innerHeight / 2;

    // Initialize columns
    const canvas = canvasRef.current;
    if (canvas) {
      initializeColumns(canvas);
    }

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Start animation
    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [animate, handleMouseMove, initializeColumns]);

  return (
    <P.Container theme={theme}>
      <canvas
        id='canvas'
        ref={canvasRef}
        style={{
          display: 'block',
          imageRendering: 'pixelated'
        }}
      />
    </P.Container>
  );
};
