import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import './page-indicator.scss';

export interface PageIndicatorProps {
  isActive: boolean;
  onClick?: () => void;
}

const PageIndicator: FunctionComponent<PageIndicatorProps> = ({
  isActive,
  onClick,
}) => {
  const className = classNames('page-indicator', {
    'is-active': isActive,
  });

  return <div onClick={onClick} className={className}></div>;
};

export default PageIndicator;
