// import { Stage, Container, Sprite, useApp, AnimatedSprite, PixiComponent, PIXI } from '@inlet/react-pixi';
// import { Text } from '@pixi/text';
import React, { useEffect, useRef, useState } from "react"
import * as PIXI from 'pixi.js'
import ava from './images/ava.jpg';
import { observer } from 'mobx-react-lite';
import PixiState from '../Store/PixiState';

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
    }, []);

    const main = () => {
        const renderer = new PIXI.Renderer({
            view: canvasRef.current,                // Ссылка на объект
            width: curSize.width,                   // Ширина
            height: curSize.height,                 // Высота
            resolution: window.devicePixelRatio,    // Разрешение
            autoDensity: true,                      // Плотность
        });

        window.addEventListener('resize', () => resize());

        const resize = () => {
            setCurSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
            renderer.resize(window.innerWidth, window.innerHeight);
        }

        const stage = new PIXI.Container();         // Сюда все передается

        const texture = PIXI.Texture.from(ava);     // Выбор изображения
        const img = new PIXI.Sprite(texture);       // Создание изображения

        img.anchor.x = 0.5;
        img.anchor.y = 0.5;

        stage.addChild(img);

        const ticker = new PIXI.Ticker();
        ticker.add(() => animate());
        ticker.start();

        const animate = (() => {
            img.x = renderer.screen.width / 2;
            img.y = renderer.screen.height / 2;

            img.rotation += 0.01;
            renderer.render(stage);
        });
    }

    return (
        <div>
            <canvas ref={canvasRef} />
        </div>
    )
})



// Вращение самолета
/*
const [width, height] = [500, 500];
const spritesheet = "https://pixijs.io/examples/examples/assets/spritesheet/fighter.json";

export const Pixi = () => {
  const [frames, setFrames] = React.useState([]);
  const app = useApp();

  // load
  React.useEffect(() => {
    app.loader.add(spritesheet).load((_, resource) => {
      setFrames(
        Object.keys(resource[spritesheet].data.frames).map((frame) =>
          PIXI.Texture.from(frame)
        )
      );
    });
  }, []);

  if (frames.length === 0) {
    return null;
  }

  return (
    <AnimatedSprite
      x={width/2}
      y={height/2}
      animationSpeed={0.5}
      textures={frames}
      initialFrame={0}
      isPlaying={true}
      loop={false}
      anchor={0.5}
      onComplete={() => console.log('complete')}
    />
  );
};
*/
