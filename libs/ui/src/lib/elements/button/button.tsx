import React, { FunctionComponent } from 'react';

import './button.scss';

/* eslint-disable-next-line */
export interface ButtonProps {}

export const Button: FunctionComponent<ButtonProps> = ({ children }) => {
  return <div className="button is-primary">{children}</div>;
};

export default Button;
