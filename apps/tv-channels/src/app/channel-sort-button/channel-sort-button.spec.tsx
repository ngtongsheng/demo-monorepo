import React from 'react';
import { render } from '@testing-library/react';

import ChannelSortButton from './channel-sort-button';

describe('ChannelSortButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChannelSortButton />);
    expect(baseElement).toBeTruthy();
  });
});
