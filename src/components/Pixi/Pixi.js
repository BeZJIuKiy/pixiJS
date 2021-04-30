// import { Stage, Container, Sprite, useApp, AnimatedSprite, PixiComponent, PIXI } from '@inlet/react-pixi';
// import { Text } from '@pixi/text';
import React, { useEffect, useRef, useState } from "react"
import * as PIXI from 'pixi.js'
import ava1 from './images/ava1.jpg';
import ava2 from './images/ava2.jpg';
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

    loader
      .add('mask', ava1)
      .add('jonny', ava2)
      .load(() => handleLoadComplete(loader, loader.resources));

    loader.onLoad.add(() => handleLoadAsset(loader.resources));
    loader.onError.add(() => handleLoadError());
    loader.onProgress.add(() => handleLoadProgress(loader));

    const handleLoadComplete = (loader, resources) => {
      let image = new PIXI.Sprite(resources.mask.texture);
      image.anchor.x = 0.5;
      image.anchor.y = 0.5;

      const stage = new PIXI.Container();
      stage.addChild(image);

      const ticker = new PIXI.Ticker();
      ticker.add(() => animate(image, stage));
      ticker.start();

      setTimeout(() => image.texture = resources.jonny.texture, 2000)
    }
    const handleLoadAsset = (resources) => {
      console.log('asset loaded');
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
