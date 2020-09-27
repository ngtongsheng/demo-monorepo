import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import './tags.scss';

export const Tags: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  const classes = classNames('tags', className);
  return (
    <div {...props} className={classes}>
      {children}
    </div>
  );
};

export default Tags;
