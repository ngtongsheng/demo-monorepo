import React from 'react';
import { render } from '@testing-library/react';

import InteractiveAnimation from './interactive-animation';

describe('InteractiveAnimation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InteractiveAnimation />);
    expect(baseElement).toBeTruthy();
  });
});
