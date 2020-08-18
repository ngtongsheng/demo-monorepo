import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import './column.scss';

export interface ColumnProps {
  isNarrow?: boolean;
  size?: number;
}

export const Column: FunctionComponent<ColumnProps> = ({
  isNarrow = false,
  children,
  size,
  ...props
}) => {
  const className: string = classNames('column', {
    'is-narrow': isNarrow,
    ['is-' + size]: size,
  });

  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

export default Column;
