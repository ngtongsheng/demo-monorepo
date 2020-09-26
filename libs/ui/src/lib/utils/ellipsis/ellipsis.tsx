import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import './ellipsis.scss';

export const Ellipsis: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  const classes = classNames('is-ellipsis', className);

  return (
    <div {...props} className={classes}>
      {children}
    </div>
  );
};

export default Ellipsis;
