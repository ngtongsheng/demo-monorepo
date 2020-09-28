import React, { FunctionComponent } from 'react';
import format from 'date-fns/format';
import { Show } from '@demo-monorepo/api-interfaces';
import { Columns, Column, Ellipsis } from '@demo-monorepo/ui';
import './channel-showtimes.scss';

export interface ChannelShowtimesProps {
  shows: Show[];
  isShowOnNow?: boolean;
}

export const ChannelShowtimes: FunctionComponent<ChannelShowtimesProps> = ({
  shows,
  isShowOnNow = true,
}) => {
  return (
    <div>
      {shows?.map((show, index) => {
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
            <Column isNarrow>{isNow && isShowOnNow ? 'On Now' : time}</Column>
            <Column>
              <Ellipsis title={show.title}>{show.title}</Ellipsis>
            </Column>
          </Columns>
        );
      })}
    </div>
  );
};

export default ChannelShowtimes;
