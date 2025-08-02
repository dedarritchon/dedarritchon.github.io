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
      changeTimer: 0,
      changeInterval: 0,
      column: 0,
      layer: 0, // 0 = back, 1 = middle, 2 = front
      fadeOutY: 0, // Y position where character starts fading out
      size: 1, // Size multiplier for the character
      trail: [], // Array to store trail positions and characters
      trailLength: 0, // Length of the trail
      trailTimer: 0 // Timer for trail updates
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
    drop.changeTimer = 0;
    drop.changeInterval = 0;
    drop.column = 0;
    drop.layer = 0;
    drop.fadeOutY = 0;
    drop.size = 1;
    drop.trail = [];
    drop.trailLength = 0;
    drop.trailTimer = 0;
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
  const COLUMN_WIDTH = FONT_SIZE * 2.5; // Much wider spacing between columns
  const MAX_DROPS = 300; // Reduced for less density
  const DROP_SPAWN_INTERVAL = 500; // More frequent spawning for consistency
  const CLEANUP_INTERVAL = 10; // Cleanup every 10 frames
  const TRAIL_UPDATE_INTERVAL = 8; // Slower trail updates (every 8 frames)
  const DROP_SPEED = 0.5; // Slow speed for falling effect

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
    let char;
    if (rand < 0.8) {
      // 80% chance for katakana (first 80 characters)
      char = chars[Math.floor(Math.random() * 80)];
    } else {
      // 20% chance for Latin characters and symbols
      char = chars[80 + Math.floor(Math.random() * (chars.length - 80))];
    }
    // Ensure we always return a valid character
    return char || chars[0] || 'ア';
  }, [chars]);

  // Create new drop in a specific column
  const createDrop = useCallback((column) => {
    if (dropPoolRef.current.active.length >= MAX_DROPS) {
      return;
    }

    const drop = dropPoolRef.current.get();
    drop.x = column * COLUMN_WIDTH + COLUMN_WIDTH / 2;
    // Start drops at the top of the screen
    drop.y = -FONT_SIZE;
    drop.speed = DROP_SPEED; // Use fixed speed for consistency
    drop.column = column;
    drop.brightness = 1;
    drop.age = 0;
    drop.maxAge = 2000 + Math.random() * 2000; // Longer lifespan for more persistent drops
    drop.changeTimer = 0;
    drop.changeInterval = 120 + Math.random() * 180; // Characters change much less frequently (120-300 frames)
    drop.char = getRandomChar();

    // Assign layer for depth effect
    const layerRand = Math.random();
    if (layerRand < 0.6) {
      drop.layer = 0; // Back layer - 60% of drops
    } else if (layerRand < 0.9) {
      drop.layer = 1; // Middle layer - 30% of drops
    } else {
      drop.layer = 2; // Front layer - 10% of drops
    }

    // Set size based on layer
    if (drop.layer === 0) {
      drop.size = 0.6 + Math.random() * 0.2; // Small (0.6-0.8x)
    } else if (drop.layer === 1) {
      drop.size = 1 + Math.random() * 0.2; // Medium (0.9-1.1x)
    } else {
      drop.size = 1.3 + Math.random() * 0.4; // Large (1.3-1.7x)
    }

    // Set trail length based on layer for column effect
    if (drop.layer === 0) {
      drop.trailLength = 8 + Math.floor(Math.random() * 6); // 8-14 characters for back layer
    } else if (drop.layer === 1) {
      drop.trailLength = 12 + Math.floor(Math.random() * 8); // 12-20 characters for middle layer
    } else {
      drop.trailLength = 15 + Math.floor(Math.random() * 10); // 15-25 characters for front layer
    }

    drop.trail = [];
    drop.trailTimer = 0;

    // Set fade out position - most drops go all the way to bottom for consistency
    const fadeOutRand = Math.random();
    if (fadeOutRand < 0.1) {
      // 10% disappear early (between 85-95% of screen height)
      drop.fadeOutY = window.innerHeight * (0.85 + Math.random() * 0.1);
    } else if (fadeOutRand < 0.2) {
      // 10% disappear mid-way (between 95-98% of screen height)
      drop.fadeOutY = window.innerHeight * (0.95 + Math.random() * 0.03);
    } else {
      // 80% go all the way to bottom for more consistent visual effect
      drop.fadeOutY = window.innerHeight + FONT_SIZE;
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

  // Main render function - optimized for single characters
  const render = useCallback((ctx, canvas) => {
    // Clear with very subtle fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Track occupied positions in each column to prevent overlapping
    const columnOccupancy = new Map();

    // Sort drops by layer for proper depth rendering (back to front)
    const sortedDrops = [...dropPoolRef.current.active].sort((a, b) => a.layer - b.layer);

    // Update and render drops
    sortedDrops.forEach((drop) => {
      // Update position with fixed speed
      drop.y += drop.speed;
      drop.age++;
      drop.changeTimer++;
      drop.trailTimer++;

      // Calculate distance from mouse for interaction
      const dx = drop.x - mouseRef.current.x;
      const dy = drop.y - mouseRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const radius = 100;

      // Subtle mouse interaction
      if (distance < radius) {
        const angle = Math.atan2(dy, dx);
        const force = (radius - distance) / radius;
        drop.x += Math.cos(angle) * force;
        drop.y += Math.sin(angle) * force;
      }

      // Update trail positions - create falling column effect
      if (drop.trailTimer >= TRAIL_UPDATE_INTERVAL) { // Use fixed interval
        // Add new trail entry at the top of the column
        if (Math.random() < 0.3) { // 30% chance to add new trail entry
          drop.trail.push({
            x: drop.x,
            y: drop.y,
            char: getRandomChar(),
            age: 0
          });
        }

        drop.trailTimer = 0;
      }

      // Keep trail entries to create column effect - remove old ones that are off screen
      drop.trail = drop.trail.filter((trailEntry) =>
        trailEntry.y < canvas.height + FONT_SIZE * 2
      );

      // Limit trail length to prevent too many characters
      if (drop.trail.length > drop.trailLength) {
        drop.trail = drop.trail.slice(-drop.trailLength);
      }

      // Change character periodically (like in the movie)
      if (drop.changeTimer >= drop.changeInterval) {
        drop.char = getRandomChar();
        drop.changeTimer = 0;
        // Randomize the next change interval - much longer intervals
        drop.changeInterval = 150 + Math.random() * 300;
      }

      // Calculate brightness based on age and position
      let brightness = Math.max(0.3, 1 - (drop.age / drop.maxAge));

      // Apply layer-based brightness
      if (drop.layer === 0) {
        brightness *= 0.2; // Back layer - darker
      } else if (drop.layer === 1) {
        brightness *= 0.5; // Middle layer - medium brightness
      } else {
        brightness *= 1.0; // Front layer - full brightness
      }

      // Fade out based on fadeOutY position
      if (drop.y > drop.fadeOutY) {
        const fadeProgress = (drop.y - drop.fadeOutY) / (FONT_SIZE * 2);
        brightness *= Math.max(0, 1 - fadeProgress);
      }

      // Render all trail entries to create column effect
      drop.trail.forEach((trailEntry, index) => {
        // Calculate trail brightness - newer entries (higher index) are brighter
        const trailBrightness = brightness * (0.2 + (index / drop.trail.length) * 0.8);

        // Check if this position is already occupied in this column
        const columnKey = `${drop.column}-${Math.round(trailEntry.y / FONT_SIZE)}`;
        if (columnOccupancy.has(columnKey)) {
          return; // Skip rendering if position is occupied
        }
        columnOccupancy.set(columnKey, true);

        if (trailEntry.y > -FONT_SIZE && trailEntry.y < canvas.height) {
          ctx.fillStyle = `rgba(0, 255, 70, ${trailBrightness})`;
          ctx.font = `bold ${Math.round(FONT_SIZE * drop.size * 0.9)}px 'Courier New', monospace`;
          ctx.textBaseline = 'top';
          ctx.textAlign = 'center';
          ctx.fillText(trailEntry.char, Math.round(trailEntry.x), Math.round(trailEntry.y));
        }
      });

      // Render main character at the top of the column
      if (drop.y > -FONT_SIZE && drop.y < canvas.height && brightness > 0.05 && drop.char) {
        // Check if main character position is occupied
        const mainColumnKey = `${drop.column}-${Math.round(drop.y / FONT_SIZE)}`;
        if (!columnOccupancy.has(mainColumnKey)) {
          columnOccupancy.set(mainColumnKey, true);

          // Matrix green color with authentic brightness
          ctx.fillStyle = `rgba(0, 255, 70, ${brightness * drop.brightness})`;
          ctx.font = `bold ${Math.round(FONT_SIZE * drop.size)}px 'Courier New', monospace`;
          ctx.textBaseline = 'top';
          ctx.textAlign = 'center';

          // Add subtle glitch effect occasionally
          if (Math.random() < 0.001) {
            const glitchOffset = (Math.random() - 0.5) * 3;
            ctx.fillText(drop.char, Math.round(drop.x + glitchOffset), Math.round(drop.y));
          } else {
            ctx.fillText(drop.char, Math.round(drop.x), Math.round(drop.y));
          }
        }
      }
    });

    // Cleanup old drops - only every few frames for better performance
    frameCountRef.current++;
    if (frameCountRef.current % CLEANUP_INTERVAL === 0) {
      dropPoolRef.current.cleanup();
    }

    // Create new drops in columns - more frequent for authentic density
    const currentTime = Date.now();
    if (currentTime - lastDropTimeRef.current > DROP_SPAWN_INTERVAL) {
      lastDropTimeRef.current = currentTime;

      // Find available columns with shorter delays for more consistent spawning
      const availableColumns = columnsRef.current
        .map((col, index) => ({ ...col, index }))
        .filter((col) => currentTime - col.lastDrop > 200 + Math.random() * 400); // Shorter delays for consistency

      if (availableColumns.length > 0) {
        // Create more drops per cycle for consistency
        const numDropsToCreate = Math.min(
          Math.floor(availableColumns.length * 0.3), // Create drops in 30% of available columns
          Math.max(1, Math.floor((MAX_DROPS - dropPoolRef.current.active.length) * 0.15)) // More aggressive spawning
        );

        for (let i = 0; i < numDropsToCreate && availableColumns.length > 0; i++) {
          const randomIndex = Math.floor(Math.random() * availableColumns.length);
          const randomColumn = availableColumns[randomIndex];
          createDrop(randomColumn.index);
          columnsRef.current[randomColumn.index].lastDrop = currentTime;
          availableColumns.splice(randomIndex, 1); // Remove used column from available list
        }
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
