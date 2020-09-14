import React, { FunctionComponent, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import './button.scss';

type Color = 'primary' | 'dark' | 'light';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: Color;
  type?: 'button' | 'submit';
  isOutlined?: boolean;
  isIcon?: boolean;
}

export const Button: FunctionComponent<ButtonProps> = ({
  color = 'primary',
  type = 'button',
  isOutlined = false,
  isIcon = false,
  children,
  ...props
}) => {
  const className = classNames(props.className, 'button', {
    [`is-${color}`]: color,
    'is-outlined': isOutlined,
    'is-icon': isIcon,
  });
  return (
    <button {...props} type={type} className={className}>
      {children}
    </button>
  );
};

export default Button;
