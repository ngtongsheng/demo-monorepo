import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import './column.scss';

export interface ColumnProps extends HTMLAttributes<HTMLDivElement> {
  isNarrow?: boolean;
  size?: number;
}

export const Column: FunctionComponent<ColumnProps> = ({
  isNarrow = false,
  className,
  children,
  size,
  ...props
}) => {
  const classes: string = classNames('column', className, {
    'is-narrow': isNarrow,
    ['is-' + size]: size,
  });

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Column;
