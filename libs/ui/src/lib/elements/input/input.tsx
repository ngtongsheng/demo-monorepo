import React, { forwardRef } from 'react';
import classNames from 'classnames';
import './input.scss';

type Type = 'text' | 'number' | 'password';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: Type;
  value?: string | number;
  className?: string;
  placeholder?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const classes = classNames(className, 'input');
    return <input ref={ref} className={classes} {...props} />;
  }
);

export default Input;
