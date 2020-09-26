import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import './tag.scss';

type Color = 'light' | 'dark' | 'danger';

export interface TagProps extends HTMLAttributes<HTMLDivElement> {
  color: Color;
}

export const Tag: FunctionComponent<TagProps> = ({
  className,
  children,
  color = 'light',
  ...props
}) => {
  const classes = classNames(className, 'tag', 'is-rounded', 'is-medium', {
    [`is-${color}`]: color,
  });
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

export default Tag;
