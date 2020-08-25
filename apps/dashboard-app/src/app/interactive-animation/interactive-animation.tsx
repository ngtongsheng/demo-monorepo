import React from 'react';
import Goo from '../goo/goo';
import './interactive-animation.scss';

/* eslint-disable-next-line */
export interface InteractiveAnimationProps {}

export const InteractiveAnimation = (props: InteractiveAnimationProps) => {
  return (
    <div className="interactive-animation">
      <div>
        <div className="title is-4">Interactive animation</div>
        <div className="content">
          <p>Move you mouse to the the goo animation.</p>
        </div>
      </div>
      <Goo />
    </div>
  );
};

export default InteractiveAnimation;
