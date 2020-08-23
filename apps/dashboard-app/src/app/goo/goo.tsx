import React, { useCallback } from 'react';
import { useTrail, animated } from 'react-spring';
import GooFilter from './goo-filter';
import './goo.scss';

const random = (min, max): number => {
  return Math.round(Math.random() * (max - min) + min);
};

const getTransforms = (x, y) =>
  `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

const Goo = () => {
  const [trail, setTrail] = useTrail(3, () => ({
    xy: [0, 0],
    config: (i: number) => {
      const config = {
        friction: random(30, 50),
      };

      if (i === 0) {
        return {
          ...config,
          tension: random(1000, 1200),
        };
      }

      return {
        ...config,
        mass: random(10, 20),
        tension: random(100, 300),
      };
    },
  }));

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      setTrail({ xy: [clientX, clientY] });
    },
    [setTrail]
  );

  return (
    <>
      <div className="title is-4">Interactive animation</div>
      <div className="goo">
        <GooFilter />
        <div className="goo-container" onMouseMove={handleMouseMove}>
          {trail.map(({ xy }, index) => (
            <animated.div
              key={index}
              style={{
                transform: xy.interpolate(getTransforms as never),
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Goo;
