import React from 'react';
import { render } from '@testing-library/react';

import ChannelSelectedFilters from './channel-selected-filters';

describe('ChannelSelectedFilters', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChannelSelectedFilters />);
    expect(baseElement).toBeTruthy();
  });
});
