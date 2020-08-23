import React from 'react';
import './goo.scss';

const GooFilter = () => {
  return (
    <svg>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="15" />
        <feColorMatrix
          in="blur"
          values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7"
        />
      </filter>
    </svg>
  );
};

export default GooFilter;
