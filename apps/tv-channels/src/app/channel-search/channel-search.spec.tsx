import React from 'react';
import { render } from '@testing-library/react';

import ChannelSearch from './channel-search';

describe('ChannelSearch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChannelSearch />);
    expect(baseElement).toBeTruthy();
  });
});
