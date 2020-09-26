import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import './thumb.scss';

export interface ThumbProps {
  src: string;
  alt?: string;
  isLarge?: boolean;
  isMedium?: boolean;
  isRounded?: boolean;
}

export const Thumb: FunctionComponent<ThumbProps> = ({
  isLarge = false,
  isMedium = false,
  isRounded = true,
  src,
  alt = '',
}) => {
  const className = classNames('thumb', {
    'is-large': isLarge,
    'is-medium': isMedium,
    'is-rounded': isRounded,
  });

  return <img className={className} src={src} alt={alt}></img>;
};

export default Thumb;
