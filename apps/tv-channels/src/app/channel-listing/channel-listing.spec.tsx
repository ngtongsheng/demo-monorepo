import React from 'react';
import { render } from '@testing-library/react';

import ChannelListing from './channel-listing';

describe('ChannelListing', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChannelListing />);
    expect(baseElement).toBeTruthy();
  });
});
