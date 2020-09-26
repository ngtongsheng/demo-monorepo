import React from 'react';
import { render } from '@testing-library/react';

import ChannelDetail from './channel-detail';

describe('ChannelDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChannelDetail />);
    expect(baseElement).toBeTruthy();
  });
});
