import React, { useCallback, useEffect, useState } from 'react';
import { ChannelService } from '@demo-monorepo/service-channel';
import { Channel } from '@demo-monorepo/api-interfaces';
import { Columns, Column } from '@demo-monorepo/ui';
import ChannelCard from '../channel-card/channel-card';
import './channel-listing.scss';

export const ChannelListing = () => {
  const [channels, setChannels] = useState<Channel[]>();
  const getChannels = useCallback(async () => {
    const res: Channel[] = await ChannelService.getChannels();

    setChannels(res);
  }, []);

  useEffect(() => {
    getChannels();
  }, [getChannels]);

  return (
    <Columns>
      <Column>
        <Columns isMultiline>
          {channels?.map((channel) => (
            <Column size={4}>
              <ChannelCard key={channel.id} {...channel} />
            </Column>
          ))}
        </Columns>
      </Column>
      <Column size={3}></Column>
    </Columns>
  );
};

export default ChannelListing;
