import React, { forwardRef } from 'react';

import './input.scss';

type Type = 'text' | 'number' | 'password';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: Type;
  value: string | number;
  placeholder?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input ref={ref} className="input" {...props} />;
});

export default Input;
