import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import './columns.scss';

export interface ColumnsProps extends HTMLAttributes<HTMLDivElement> {
  isVcentered?: boolean;
  isMultiline?: boolean;
}

export const Columns: FunctionComponent<ColumnsProps> = ({
  isVcentered = false,
  isMultiline = false,
  className,
  children,
  ...props
}) => {
  const classes: string = classNames(className, 'columns', {
    'is-vcentered': isVcentered,
    'is-multiline': isMultiline,
  });

  return (
    <div {...props} className={classes}>
      {children}
    </div>
  );
};

export default Columns;
