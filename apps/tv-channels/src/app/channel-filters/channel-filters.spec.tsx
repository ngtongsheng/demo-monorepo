import React from 'react';
import { render } from '@testing-library/react';

import ChannelFilters from './channel-filters';

describe('ChannelFilters', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChannelFilters />);
    expect(baseElement).toBeTruthy();
  });
});
