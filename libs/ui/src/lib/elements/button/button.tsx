import React, { FunctionComponent, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import './button.scss';

type Color = 'primary' | 'dark';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: Color;
  type?: 'button' | 'submit';
  isOutlined?: boolean;
}

export const Button: FunctionComponent<ButtonProps> = ({
  color = 'primary',
  type = 'button',
  isOutlined = false,
  children,
  ...props
}) => {
  const className = classNames('button', {
    [`is-${color}`]: color,
    'is-outlined': isOutlined,
  });
  return (
    <button type={type} className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
