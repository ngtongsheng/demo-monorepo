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
  children,
}) => {
  const className: string = classNames('columns', {
    'is-vcentered': isVcentered,
    'is-multiline': isMultiline,
  });

  return <div className={className}>{children}</div>;
};

export default Columns;
