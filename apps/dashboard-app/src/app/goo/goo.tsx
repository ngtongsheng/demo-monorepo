import React from 'react';
import { useTrail, animated } from 'react-spring';

import './goo.scss';

const random = (min, max): number => {
  return Math.round(Math.random() * (max - min) + min);
};

const getTransforms = (x, y) =>
  `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

const fast = { tension: random(1000, 1200), friction: random(30, 50) };
const slow = {
  mass: random(10, 20),
  tension: random(100, 300),
  friction: random(30, 50),
};

const Goo = () => {
  const [trail, setTrail] = useTrail(3, () => ({
    xy: [0, 0],
    config: (i: number) => (i === 0 ? fast : slow),
  }));

  return (
    <>
      <div className="title is-4">Goo animation</div>
      <div className="goo">
        <svg>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="15"
            />
            <feColorMatrix
              in="blur"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7"
            />
          </filter>
        </svg>
        <div
          className="hooks-main"
          onMouseMove={({ clientX, clientY }) =>
            setTrail({ xy: [clientX, clientY] })
          }
        >
          {trail.map(({ xy }, index) => {
            return (
              <animated.div
                key={index}
                style={{
                  transform: xy.interpolate(getTransforms as never),
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Goo;
