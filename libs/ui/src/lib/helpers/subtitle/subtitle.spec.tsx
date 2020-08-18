import React from 'react';
import { render } from '@testing-library/react';

import Subtitle from './subtitle';

describe('Subtitle', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Subtitle />);
    expect(baseElement).toBeTruthy();
  });
});
