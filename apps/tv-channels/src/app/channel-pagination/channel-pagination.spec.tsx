import React from 'react';
import { render } from '@testing-library/react';

import ChannelPagination from './channel-pagination';

describe('ChannelPagination', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChannelPagination />);
    expect(baseElement).toBeTruthy();
  });
});
