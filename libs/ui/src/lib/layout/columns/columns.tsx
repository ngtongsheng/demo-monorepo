import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import './columns.scss';

export interface ColumnsProps extends HTMLAttributes<HTMLDivElement> {
  isVcentered?: boolean;
  isNoMarginBottom?: boolean;
  isGapless?: boolean;
  isMultiline?: boolean;
}

export const Columns: FunctionComponent<ColumnsProps> = ({
  isVcentered = false,
  isNoMarginBottom = false,
  isGapless = false,
  isMultiline = false,
  className,
  children,
  ...props
}) => {
  const classes: string = classNames(className, 'columns', {
    'is-vcentered': isVcentered,
    'is-no-margin-bottom': isNoMarginBottom,
    'is-gapless': isGapless,
    'is-multiline': isMultiline,
  });

  return (
    <div {...props} className={classes}>
      {children}
    </div>
  );
};

export default Columns;
