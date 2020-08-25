import React from 'react';
import { render } from '@testing-library/react';

import SimpleRating from './simple-rating';

describe('SimpleRating', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SimpleRating />);
    expect(baseElement).toBeTruthy();
  });
});
