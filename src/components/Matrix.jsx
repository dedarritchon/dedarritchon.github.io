import React, { useContext } from 'react';
import styled from 'styled-components';

import { AppContext } from './../App/AppContext';

const P = {
  Container: styled.div`
    transition: background-color 0.5s linear;
    position: absolute;
    background-color: ${({ theme }) => theme.background};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    z-index: 0;
  `,
};

function animateTitle(Title = "Hello World ;)", delay = 300) {
  let counter = 0;
  let direction = true;
  let newtitle;
  setInterval(function () {
      if (counter === Title.length)
          direction = false;
      if (counter === 1)
          direction = true;
      counter = (direction === true) ? ++counter : --counter;
      newtitle = (counter === 0) ? " " : Title.slice(0, counter);
      document.title = newtitle;
  }, delay)
}

animateTitle();

export const Matrix = () => {

  var initialized = false;

  const { theme } = useContext(AppContext);

  let colors = ["#0F0", "#F00", "#0FF", "#FF0", "#F0F", "#FFF"];

  let color = colors[Math.floor(Math.random() * colors.length)];

  let stop = false;

  // Tracking the mouse's position
  let mouseX = 0;
  let mouseY = 0;

  window.onwheel  = function () {
    let new_color = colors[Math.floor(Math.random() * colors.length)];
    while (new_color === color) {
      new_color = colors[Math.floor(Math.random() * colors.length)];
    }
    color = new_color;
  }

  window.onclick  = function () {
    let new_color = colors[Math.floor(Math.random() * colors.length)];
    while (new_color === color) {
      new_color = colors[Math.floor(Math.random() * colors.length)];
    }
    color = new_color;
  }

  window.onmousemove = function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  document.addEventListener('keypress', (event) => {
    alert("Welcome back, Neo.\n\nClick or Scroll your mouse to change the Matrix colors")
  }, false);

  var initMatrix = () => {
    if (!initialized) {

      let canvas = document.getElementById( 'canvas' );

      let ctx = canvas.getContext('2d')

      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;

      var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*|`+-/~{[()]}ば司立肌切チじを飯端めなだごさ対全分人ぜち使";

      chars = chars.split("");

      var font_size = 18;
      var columns = canvas.width/font_size;

      var drops = [];

      for(var x = 0; x < columns; x++)
        drops[x] = 1;

      function draw()
      {
        if (!stop){

          if (canvas.height !== window.innerHeight || canvas.width !== window.innerWidth){
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;
          }

          ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = color;

          // get pointer location

          // Adjust font size based on mouseY
          font_size = 18 + (mouseY / canvas.height) * -10 + (mouseX / canvas.width) * 10; // Adjust 32 to control the max increase in font size
          ctx.font = font_size + "px console";

          for(var i = 0; i < drops.length; i++)
          {
            if (!initialized){
              color = colors[Math.floor(Math.random() * colors.length)];
              ctx.fillStyle = color;
            }
    
            var text = chars[Math.floor(Math.random()*chars.length)];

            ctx.fillText(text, i*font_size, drops[i]*font_size);

            if(drops[i]*font_size > canvas.height && Math.random() > 0.975){
              drops[i] = 0;
              initialized = true;
            }
            drops[i]++;
          }
        }
      }

      setInterval(draw, 35);
      // draw stuff
    }
  }

  return (
    <P.Container theme={theme}>
      <canvas id='canvas' ref={initMatrix}></canvas>
    </P.Container>
  );
};
