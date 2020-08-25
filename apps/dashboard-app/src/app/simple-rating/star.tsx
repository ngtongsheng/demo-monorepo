import React, { FunctionComponent } from 'react';

import './simple-rating.scss';
import { FaIcon } from '@demo-monorepo/ui';

export interface StarProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: string;
  isChecked: boolean;
}

export const Star: FunctionComponent<StarProps> = ({
  color,
  isChecked,
  ...props
}) => {
  return (
    <span {...props} style={{ color: isChecked && color }} className="star">
      <FaIcon name="star" />
    </span>
  );
};

export default Star;
