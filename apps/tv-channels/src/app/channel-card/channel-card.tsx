import React, { FunctionComponent } from 'react';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';
import { Card, Columns, Column, Thumb, Ellipsis } from '@demo-monorepo/ui';
import { Channel } from '@demo-monorepo/api-interfaces';
import './channel-card.scss';

export const ChannelCard: FunctionComponent<Channel> = ({
  id,
  title,
  thumbnail,
  channelId,
  shows,
}) => {
  return (
    <Link to={`/channels/${id}`}>
      <Card className="channel-card" isFullHeight isRounded>
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
        <div>
          {shows.map((show, index) => {
            const { showtime } = show;
            const time = format(new Date(showtime), 'hh:mm aaa');
            const isNow = index === 0;

            return (
              <Columns
                key={showtime}
                className="showtime is-mobile"
                isNoMarginBottom
                isGapless
              >
                <Column isNarrow>{isNow ? 'On Now' : time}</Column>
                <Column>
                  <Ellipsis title={show.title}>{show.title}</Ellipsis>
                </Column>
              </Columns>
            );
          })}
        </div>
      </Card>
    </Link>
  );
};

export default ChannelCard;
