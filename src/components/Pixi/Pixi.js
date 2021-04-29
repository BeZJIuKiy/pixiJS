// import { Stage, Container, Sprite, useApp, AnimatedSprite, PixiComponent, PIXI } from '@inlet/react-pixi';
// import { Text } from '@pixi/text';
import React, { useEffect, useRef, useState } from "react"
import * as PIXI from 'pixi.js'
import ava1 from './images/ava1.jpg';
import ava2 from './images/ava2.jpg';
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
        window.addEventListener('resize', () => resize());
        const resize = () => {
            setCurSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
            renderer.resize(window.innerWidth, window.innerHeight);
        }

        const renderer = new PIXI.Renderer({
            view: canvasRef.current,                // Ссылка на объект
            width: curSize.width,                   // Ширина
            height: curSize.height,                 // Высота
            resolution: window.devicePixelRatio,    // Разрешение
            autoDensity: true,                      // Плотность
        });

        const loader = PIXI.Loader.shared;
        // loader.onComplete.add(() => handleLoadComplete());
        // loader.onLoad.add(() => handleLoadAsset());
        // loader.onError.add(() => handleLoadError());
        // loader.onProgress.add(() => handleLoadProgress(loader));
        
        loader.add(ava1)
            .add(ava2)
            .on("asset", (() => handleLoadAsset()))
            .on("error", (() => handleLoadError()))
            .on("progress", (() => handleLoadProgress(loader)))
            .load(() => handleLoadComplete());

        const handleLoadComplete = () => {
            const texture = loader.resources[ava1].texture;
            const image = new PIXI.Sprite(texture);
            image.anchor.x = 0.5;
            image.anchor.y = 0.5;

            const stage = new PIXI.Container();
            stage.addChild(image);

            const ticker = new PIXI.Ticker();
            ticker.add(() => animate(image, stage));
            ticker.start();
        }
        const handleLoadAsset = () => {
            console.log("asset loaded");
        }
        const handleLoadError = () => {
            console.error("load error");
        }
        const handleLoadProgress = (loader, resource) => {
            console.log(loader.progress + "% loaded");
        }

        const animate = ((img, stage) => {
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
