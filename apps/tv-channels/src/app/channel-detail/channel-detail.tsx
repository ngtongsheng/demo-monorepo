import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { ChannelService } from '@demo-monorepo/service-channel';
import { Channel, DailyShows } from '@demo-monorepo/api-interfaces';
import { Columns, Column, Panel } from '@demo-monorepo/ui';
import ChannelCard from '../channel-card/channel-card';
import ChannelShowtimes from '../channel-showtimes/channel-showtimes';
import './channel-detail.scss';

const SUCCESS_GET_CHANNEL = 'SUCCESS_GET_CHANNEL';
const START_LOADING = 'START_LOADING';

interface ChannelDetailProps {
  channel: Channel;
  weeklyShows: DailyShows[];
  isLoading: boolean;
}

const initialState: ChannelDetailProps = {
  channel: null,
  weeklyShows: null,
  isLoading: false,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SUCCESS_GET_CHANNEL: {
      const { channel, weeklyShows } = payload;
      return {
        ...state,
        channel,
        weeklyShows,
        isLoading: false,
      };
    }

    case START_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }

    default:
      return state;
  }
};

export const ChannelDetail: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, channel, weeklyShows } = state as ChannelDetailProps;

  const getChannel = useCallback(async () => {
    dispatch({
      type: START_LOADING,
      payload: {},
    });

    const payload = await ChannelService.getChannel(id.split('-').pop());

    dispatch({
      type: SUCCESS_GET_CHANNEL,
      payload,
    });
  }, [id]);

  useEffect(() => {
    getChannel();
  }, [getChannel]);

  return (
    <>
      <Columns
        className={classNames('channel-listing', {
          'is-loading': isLoading,
        })}
      >
        <Column>
          {channel && (
            <ChannelCard
              {...channel}
              isShowtime={false}
              isDescription
              isHoverble={false}
            />
          )}
        </Column>
      </Columns>
      <Panel title="Schedules">
        <Columns isMultiline>
          {weeklyShows?.map(({ shows }, index) => (
            <Column size={3}>
              <ChannelShowtimes shows={shows} isShowOnNow={index === 0} />
            </Column>
          ))}
        </Columns>
      </Panel>
    </>
  );
};

export default ChannelDetail;
