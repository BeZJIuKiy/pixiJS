// import { Stage, Container, Sprite, useApp, AnimatedSprite, PixiComponent, PIXI } from '@inlet/react-pixi';
// import { Text } from '@pixi/text';
import React, { useEffect, useRef, useState } from "react"
import * as PIXI from 'pixi.js'
import ava1 from './images/ava1.jpg';
import ava2 from './images/ava2.jpg';
import ship from './images/ship.png';
import { observer } from 'mobx-react-lite';
import PixiState from '../Store/PixiState';

// const userAvatar = 'https://www.pngkey.com/png/full/572-5723307_kaneki-ken-kanekiken-kaneki-anime.png';

// Тестовый проект
export const Pixi = observer(() => {
  const canvasRef = useRef();
  const [curSize, setCurSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    PixiState.setCanvas(canvasRef.current);

    main();
    listen();
  }, []);

  const main = () => {
    const app = new PIXI.Application({
      view: canvasRef.current,
      width: 801,
      height: 601,
      backgroundColor: 0xAAAAAA
    })

    // player object
    const player = new PIXI.Sprite.from(ship);    // Берем нужную картинку
    player.anchor.set(0.5);                       // Перемещае точку в центр этой картинки
    player.x = app.view.width / 2;                // Выставляем картинку в центр объекта для рисования по ОХ
    player.y = app.view.height / 2;               // Выставляем картинку в центр объекта для рисования по ОY

    app.stage.addChild(player);                   // Добавили картинку на сцену

    // app.renderer.view.addEventListener('click', () => {
    //   console.log('Hello)');
    // })

    // mouse interactions
    /*
    app.stage.interactive = true;
    app.stage.on('pointermove', (e) => movePlayer(e))
    const movePlayer = (e) => {
      const pos = e.data.global;

      player.x = pos.x;
      player.y = pos.y;
    }
    */

    // keyboard event handlers


    window.addEventListener('resize', () => resize());
    const resize = () => {
      setCurSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
      // renderer.resize(window.innerWidth, window.innerHeight);
    }
  }

  const listen = () => {
    // canvasRef.current.onmousemove = mouseMoveHandler;
    // canvasRef.current.onmousedown = mouseDownHandler;
    // canvasRef.current.onmouseup = mouseUpHandler;
    canvasRef.current.onkeypress = keyPresHandler;
    
  }

  // const mouseMoveHandler = (e) => {
  //   console.log('mouse mooooove');
  // }
  // const mouseDownHandler = (e) => {
  //   console.log('mouse down');
  // }
  // const mouseUpHandler = (e) => {
  //   console.log('mouse up');
  // }
  const keyPresHandler = (e) => {
    console.log('key press');
  }


  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  )
})
