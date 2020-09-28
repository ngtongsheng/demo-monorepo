import React from 'react';
import { render } from '@testing-library/react';

import ChannelShowtimes from './channel-showtimes';

describe('ChannelShowtimes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChannelShowtimes />);
    expect(baseElement).toBeTruthy();
  });
});
