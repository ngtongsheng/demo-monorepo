import React from 'react';
import { render } from '@testing-library/react';

import Ellipsis from './ellipsis';

describe('Ellipsis', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Ellipsis />);
    expect(baseElement).toBeTruthy();
  });
});
