import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { Button, FaIcon, ButtonProps } from '@demo-monorepo/ui';

export interface NavigationButtonProps extends ButtonProps {
  direction: 'left' | 'right';
}

const NavigationButton: FunctionComponent<NavigationButtonProps> = (props) => {
  const { style = {}, className, direction, ...other } = props;
  const classes = classNames(className, direction + '-button');

  return (
    <Button
      {...other}
      className={classes}
      style={{ ...style, fontSize: '200%' }}
      isIcon
    >
      <FaIcon
        name={('chevron-' + direction) as 'chevron-left' | 'chevron-right'}
      ></FaIcon>
    </Button>
  );
};

export default NavigationButton;
