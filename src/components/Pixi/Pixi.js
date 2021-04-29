// import { Stage, Container, Sprite, useApp, AnimatedSprite, PixiComponent, PIXI } from '@inlet/react-pixi';
// import { Text } from '@pixi/text';
import React, { useEffect, useRef } from "react"
import * as PIXI from 'pixi.js'
import ava from './images/ava.jpg';
import { observer } from 'mobx-react-lite';
import PixiState from '../Store/PixiState';

// Тестовый проект

export const Pixi = observer (() => {
    const canvasRef = useRef();
    
    useEffect(() => {
        PixiState.setCanvas(canvasRef.current);
        
        main();
    }, []);

    const main = () => {
        const app = new PIXI.Application({
            view: canvasRef.current,
            width: window.innerWidth,
            height: window.innerHeight
        });
    
        const texture = PIXI.Texture.from(ava);
        const img = new PIXI.Sprite(texture);
    
        img.x = app.renderer.width / 2;
        img.y = app.renderer.height / 2;
    
        img.anchor.x = 0.5;
        img.anchor.y = 0.5;
    
        app.stage.addChild(img);
        app.ticker.add(() => animate(img));

        const animate = (img => img.rotation += 0.01);
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


// Падение кроликов :)
/*
const img = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png";

const emitterConfig = {
    alpha: {
        start: 0.5,
        end: 0.5
    },
    scale: {
        start: 1,
        end: 1
    },
    color: {
        start: "ffffff",
        end: "ffffff"
    },
    speed: {
        start: 3000,
        end: 3000
    },
    startRotation: {
        min: 65,
        max: 65
    },
    rotationSpeed: {
        min: 0,
        max: 0
    },
    lifetime: {
        min: 0.81,
        max: 0.81
    },
    blendMode: "normal",
    frequency: 0.004,
    emitterLifetime: 0,
    maxParticles: 1000,
    pos: {
        x: 0,
        y: 0
    },
    addAtBack: false,
    spawnType: "rect",
    spawnRect: {
        x: -600,
        y: -460,
        w: 900,
        h: 20
    }
};

export const Pixi = PixiComponent("Emitter", {
    create() {
        return new PIXI.Container();
    },
    applyProps(instance, oldProps, newProps) {
        const { image, config } = newProps;

        if (!this._emitter) {
            this._emitter = new PIXI.particles.Emitter(
                instance,
                [PIXI.Texture.from(image)],
                config
            );

            let elapsed = Date.now();

            const t = () => {
                this._emitter.raf = requestAnimationFrame(t);
                const now = Date.now();

                this._emitter.update((now - elapsed) * 0.001);

                elapsed = now;
            };

            this._emitter.emit = true;
            t();
        }
    },

    willUnmount() {
        if (this._emitter) {
            this._emitter.emit = false;
            cancelAnimationFrame(this._emitter.raf);
        }
    }
});
*/
