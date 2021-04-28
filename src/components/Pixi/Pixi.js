import { Stage, Container, Sprite, useApp, AnimatedSprite } from '@inlet/react-pixi';
import { Text } from '@pixi/text';
import React, { useEffect, useRef, useState } from "react"
import * as PIXI from 'pixi.js'
import ava from './images/ava.jpg';

export const Pixi = () => {
    const canvasRef = useRef();
    console.log(canvasRef);

    const app = new PIXI.Application({
        view: canvasRef.current,
        width: window.innerWidth,
        height: window.innerHeight
    });

    const texture = PIXI.Texture.from(ava);
    const img = new PIXI.Sprite(texture);
    // console.log(ava);

    img.x = app.renderer.width / 2;
    img.y = app.renderer.height / 2;

    img.anchor.x = 0.5;
    img.anchor.y = 0.5;

    app.stage.addChild(img);

    app.ticker.add(animate);

    function animate() {
        img.rotation += 0.01
    }

    // animate = () => (img.rotation += 0.01)

    return (
        <div>
            <canvas ref={canvasRef} />
        </div>
    )
}

// const [width, height] = [500, 500];
// // const spritesheet = "https://pixijs.io/examples/examples/assets/spritesheet/fighter.json";
// const spritesheet = "https://pixijs.io/examples/examples/assets/spritesheet/fighter.json";

// export const Pixi = () => {
//   const [frames, setFrames] = React.useState([]);
//   const app = useApp();

//   // load
//   React.useEffect(() => {
//     app.loader.add(spritesheet).load((_, resource) => {
//       setFrames(
//         Object.keys(resource[spritesheet].data.frames).map((frame) =>
//           PIXI.Texture.from(frame)
//         )
//       );
//     });
//   }, []);

//   if (frames.length === 0) {
//     return null;
//   }

//   return (
//     <AnimatedSprite
//       x={width/2}
//       y={height/2}
//       animationSpeed={0.5}
//       textures={frames}
//       initialFrame={0}
//       isPlaying={true}
//       loop={false}
//       anchor={0.5}
//       onComplete={() => console.log('complete')}
//     />
//   );
// };