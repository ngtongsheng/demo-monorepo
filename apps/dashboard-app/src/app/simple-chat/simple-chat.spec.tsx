import React from 'react';
import { render } from '@testing-library/react';

import SimpleChat from './simple-chat';

describe('SimpleChat', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SimpleChat />);
    expect(baseElement).toBeTruthy();
  });
});
