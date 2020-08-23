import React from 'react';
import { render } from '@testing-library/react';

import Goo from './goo';

describe('Goo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Goo />);
    expect(baseElement).toBeTruthy();
  });
});
