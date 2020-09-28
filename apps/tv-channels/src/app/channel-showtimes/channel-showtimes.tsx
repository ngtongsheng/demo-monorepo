import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
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
      {!shows?.length && <p>Not available.</p>}
      {shows?.map((show, index) => {
        const { showtime } = show;
        const time = format(new Date(showtime), 'hh:mm aaa');
        const isNow = index === 0;
        const className = classNames('showtime', 'is-mobile', {
          'is-show-on-now': isShowOnNow,
        });

        return (
          <Columns
            key={showtime}
            className={className}
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
