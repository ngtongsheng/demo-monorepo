import React from 'react';
import { render } from '@testing-library/react';
import { Channel } from '@demo-monorepo/api-interfaces';

import ChannelCard from './channel-card';

describe('ChannelCard', () => {
  it('should render successfully', () => {
    const channel: Channel = {
      id: '',
      title: '',
      thumbnail: '',
      channelId: '',
    };

    const { baseElement } = render(<ChannelCard {...channel} />);
    expect(baseElement).toBeTruthy();
  });
});
