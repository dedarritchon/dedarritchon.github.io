import React, { useContext, useEffect, useRef } from 'react';
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

function animateTitle(Title = 'Hello World ;)', delay = 300) {
  let counter = 0;
  let direction = true;
  let newtitle;
  setInterval(function () {
    if (counter === Title.length) direction = false;
    if (counter === 1) direction = true;
    counter = direction === true ? ++counter : --counter;
    newtitle = counter === 0 ? ' ' : Title.slice(0, counter);
    document.title = newtitle;
  }, delay);
}

animateTitle();

export const Matrix = () => {
  const canvasRef = useRef(null);

  const { theme } = useContext(AppContext);

  let colors = ['#0F0', '#F00', '#0FF', '#FF0', '#F0F', '#FFF'];
  let mouseColor = '#FFD700'; // Color for letters around the mouse

  let color = colors[Math.floor(Math.random() * colors.length)];

  let stop = false;

  // Tracking the mouse's position
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let lastMouseMoveTime = 0;

  const radius = 200; // Radius around the mouse to skip letters

  window.onwheel = function () {
    let new_color = colors[Math.floor(Math.random() * colors.length)];
    while (new_color === color) {
      new_color = colors[Math.floor(Math.random() * colors.length)];
    }
    color = new_color;
    mouseColor = colors[Math.floor(Math.random() * colors.length)];
  };

  window.onclick = function () {
    let new_color = colors[Math.floor(Math.random() * colors.length)];
    while (new_color === color) {
      new_color = colors[Math.floor(Math.random() * colors.length)];
    }
    color = new_color;
    mouseColor = colors[Math.floor(Math.random() * colors.length)];
  };

  window.onmousemove = function (e) {

    const currentTime = Date.now();

    if (currentTime - lastMouseMoveTime > 50) {

      lastMouseMoveTime = currentTime;
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
  };

  document.addEventListener(
    'keypress',
    (event) => {
      alert(
        'Welcome back, Neo.\n\nClick or Scroll your mouse to change the Matrix colors'
      );
    },
    false
  );

  useEffect(() => {
    let initialized = false;

    const canvas = canvasRef.current;

    const ctx = canvas.getContext('2d');

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    var chars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*|`+-/~{[()]}ば司立肌切チじを飯端めなだごさ対全分人ぜち使';

    chars = chars.split('');

    var font_size = 18;
    var columns = canvas.width / font_size;

    var drops = [];

    for (var x = 0; x < columns; x++) drops[x] = 1;

    function draw() {
      if (!stop) {
        if (
          canvas.height !== window.innerHeight ||
          canvas.width !== window.innerWidth
        ) {
          canvas.height = window.innerHeight;
          canvas.width = window.innerWidth;
        }

        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = font_size + 'px console';

        for (var i = 0; i < drops.length; i++) {
          var text = chars[Math.floor(Math.random() * chars.length)];

          let x = i * font_size;
          let y = drops[i] * font_size;

          // Calculate distance from mouse
          let dx = x - mouseX;
          let dy = y - mouseY;
          let distance = Math.sqrt(dx * dx + dy * dy);

          // If inside the radius, adjust the position and change color
          if (distance < radius) {
            let angle = Math.atan2(dy, dx);
            let offset = (radius - distance) / 2; // Adjust speed and amount of movement
            x += Math.cos(angle) * offset;
            y += Math.sin(angle) * offset;
            
            ctx.fillStyle = mouseColor; // Change color when near mouse
          } else {
            ctx.fillStyle = color; // Default color
          }

          ctx.fillText(text, x, y);

          if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
            initialized = true;
          }
          drops[i]++;
        }
      }
    }

    const interval = setInterval(draw, 40);

    return () => clearInterval(interval);
  }, [theme, color, radius]);

  return (
    <P.Container theme={theme}>
      <canvas id='canvas' ref={canvasRef}></canvas>
    </P.Container>
  );
};
