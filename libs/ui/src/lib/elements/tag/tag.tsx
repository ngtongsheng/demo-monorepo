import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import './tag.scss';

type Color = 'light' | 'dark' | 'danger';
type Size = 'medium' | 'small' | 'normal';

export interface TagProps extends HTMLAttributes<HTMLDivElement> {
  color: Color;
  size?: Size;
}

export const Tag: FunctionComponent<TagProps> = ({
  className,
  children,
  color = 'light',
  size = 'medium',
  ...props
}) => {
  const classes = classNames(className, 'tag', 'is-rounded', {
    [`is-${color}`]: color,
    [`is-${size}`]: size,
  });

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

export default Tag;
