import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import './card.scss';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  isFullHeight?: boolean;
}

export const Card: FunctionComponent<CardProps> = ({
  isFullHeight = false,
  className,
  children,
}) => {
  const classes = classNames('card', className, {
    'is-full-height': isFullHeight,
  });

  return (
    <div className={classes}>
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;
