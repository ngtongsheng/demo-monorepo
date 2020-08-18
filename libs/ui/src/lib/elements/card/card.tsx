import React, { FunctionComponent } from 'react';

import './card.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CardProps {}

export const Card: FunctionComponent<CardProps> = ({ children }) => {
  return (
    <div className="card">
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;
