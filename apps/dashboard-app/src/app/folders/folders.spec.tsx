import React from 'react';
import { render } from '@testing-library/react';

import Folders from './folders';

describe('Folders', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Folders />);
    expect(baseElement).toBeTruthy();
  });
});
