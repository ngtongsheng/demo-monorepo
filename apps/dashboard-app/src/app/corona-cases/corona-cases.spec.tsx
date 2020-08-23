import React from 'react';
import { render } from '@testing-library/react';

import CoronaCases from './corona-cases';

describe('CoronaCases', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CoronaCases />);
    expect(baseElement).toBeTruthy();
  });
});
