import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import './fa-icon.scss';

type Style = 'fas' | 'far';
type Name = 'paper-plane' | 'star';

export interface FaIconProps {
  style?: Style;
  name: Name;
}

export const FaIcon: FunctionComponent<FaIconProps> = ({
  style = 'fas',
  name,
}) => {
  const className = classNames(style, `fa-${name}`);
  return (
    <span className="icon">
      <i className={className}></i>
    </span>
  );
};

export default FaIcon;
