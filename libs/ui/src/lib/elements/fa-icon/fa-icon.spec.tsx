import React from 'react';
import { render } from '@testing-library/react';

import FaIcon from './fa-icon';

describe('FaIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FaIcon />);
    expect(baseElement).toBeTruthy();
  });
});
