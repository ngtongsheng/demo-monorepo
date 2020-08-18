import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import './thumb.scss';

export interface ThumbProps {
  src: string;
  alt?: string;
  isLarge?: boolean;
}

export const Thumb: FunctionComponent<ThumbProps> = ({
  isLarge = false,
  src,
  alt = '',
}) => {
  const className = classNames('thumb', {
    'is-large': isLarge,
  });

  return <img className={className} src={src} alt={alt}></img>;
};

export default Thumb;
