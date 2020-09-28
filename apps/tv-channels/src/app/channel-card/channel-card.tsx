import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { Card, Columns, Column, Thumb, Ellipsis } from '@demo-monorepo/ui';
import { Channel } from '@demo-monorepo/api-interfaces';
import ChannelShowtimes from '../channel-showtimes/channel-showtimes';
import './channel-card.scss';

export interface ChannelCardProps extends Channel {
  isShowtime?: boolean;
  isDescription?: boolean;
  isHoverble?: boolean;
}

export const ChannelCard: FunctionComponent<ChannelCardProps> = ({
  id,
  title,
  thumbnail,
  channelId,
  shows,
  description,
  isShowtime = true,
  isDescription = false,
  isHoverble = true,
}) => {
  const className = classNames('channel-card', {
    'is-hoverable': isHoverble,
  });

  return (
    <Card className={className} isFullHeight isRounded>
      <Columns isVcentered className="is-mobile">
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
      {isDescription && description && (
        <Columns isVcentered className="is-mobile">
          <Column isNarrow>
            <p>{description}</p>
          </Column>
        </Columns>
      )}

      {isShowtime && <ChannelShowtimes shows={shows} />}
    </Card>
  );
};

export default ChannelCard;
