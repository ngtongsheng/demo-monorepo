import React, { FunctionComponent } from 'react';
import NavigationButton from '../navigation-button/navigation-button';
import { useKeyDown } from '@demo-monorepo/hooks';
import { CarouselStyleProps } from '../carousel';
import './navigation-buttons.scss';

export interface NavigationButtonsProps extends CarouselStyleProps {
  onPrev: () => void;
  onNext: () => void;
  isKeyboard?: boolean;
}

const NavigationButtons: FunctionComponent<NavigationButtonsProps> = ({
  onPrev,
  onNext,
  isBoxShadow = true,
  isKeyboard = false,
}) => {
  useKeyDown(['ArrowLeft'], () => {
    if (!isKeyboard) {
      return;
    }

    onPrev();
  });

  useKeyDown(['ArrowRight'], () => {
    if (!isKeyboard) {
      return;
    }

    onNext();
  });

  return (
    <>
      <NavigationButton
        className={isBoxShadow && 'is-box-shadow'}
        color="light"
        direction="left"
        onClick={onPrev}
      />
      <NavigationButton
        className={isBoxShadow && 'is-box-shadow'}
        color="light"
        direction="right"
        onClick={onNext}
      />
    </>
  );
};

export default NavigationButtons;
