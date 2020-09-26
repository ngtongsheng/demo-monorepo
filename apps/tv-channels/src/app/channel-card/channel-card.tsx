import React, { FunctionComponent } from 'react';
import { Card, Columns, Column, Thumb, Ellipsis } from '@demo-monorepo/ui';
import { Channel } from '@demo-monorepo/api-interfaces';
import './channel-card.scss';

export const ChannelCard: FunctionComponent<Channel> = ({
  title,
  thumbnail,
  channelId,
}) => {
  return (
    <Card className="channel-card" isFullHeight>
      <Columns isVcentered>
        <Column isNarrow>
          <Thumb src={thumbnail} alt={title} isRounded={false} />
        </Column>
        <Column>
          <div className="subtitle is-6">{channelId}</div>
          <Ellipsis title={title} className="title is-6">
            {title}
          </Ellipsis>
        </Column>
      </Columns>
    </Card>
  );
};

export default ChannelCard;
