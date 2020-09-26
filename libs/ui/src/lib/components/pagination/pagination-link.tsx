import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

export interface PaginationLinkProps extends HTMLAttributes<HTMLDivElement> {
  isCurrent: boolean;
}

const PaginationLink: FunctionComponent<PaginationLinkProps> = ({
  children,
  isCurrent,
  ...props
}) => {
  const classes = classNames('cd', 'pagination-link', {
    'is-current': isCurrent,
    'has-background-danger': isCurrent,
  });

  return (
    <li>
      <div className={classes} aria-label={`Go to page ${children}`} {...props}>
        {children}
      </div>
    </li>
  );
};

export default PaginationLink;
