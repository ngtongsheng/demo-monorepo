import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import { useParams } from 'react-router-dom';
import { ChannelService } from '@demo-monorepo/service-channel';
import { Channel, DailyShows } from '@demo-monorepo/api-interfaces';
import {
  Columns,
  Column,
  Panel,
  PanelBlock,
  PanelTabs,
  Button,
} from '@demo-monorepo/ui';
import ChannelCard from '../channel-card/channel-card';
import ChannelShowtimes from '../channel-showtimes/channel-showtimes';
import './channel-detail.scss';

const SUCCESS_GET_CHANNEL = 'SUCCESS_GET_CHANNEL';
const UPDATE_TAB = 'UPDATE_TAB';
const START_LOADING = 'START_LOADING';

interface ChannelDetailProps {
  channel: Channel;
  weeklyShows: DailyShows[];
  isLoading: boolean;
  days: string[];
  currentDay: string;
}

const initialState: ChannelDetailProps = {
  channel: null,
  weeklyShows: null,
  isLoading: false,
  days: [],
  currentDay: '',
};

const convertToDayOfWeek = (date) => {
  const dateObj = new Date(date);

  if (isToday(dateObj)) {
    return 'Today';
  }

  return format(dateObj, 'EEE');
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SUCCESS_GET_CHANNEL: {
      const { channel, weeklyShows } = payload;
      const days = (weeklyShows || []).map(({ date }) =>
        convertToDayOfWeek(date)
      );
      const currentDay = days[0];

      return {
        ...state,
        channel,
        weeklyShows,
        isLoading: false,
        days,
        currentDay,
      };
    }

    case UPDATE_TAB: {
      const { currentDay } = payload;
      return {
        ...state,
        currentDay,
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
  const {
    isLoading,
    channel,
    weeklyShows,
    days,
    currentDay,
  } = state as ChannelDetailProps;

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

  const handleTabChange = useCallback(async (currentTab) => {
    console.log(currentTab);
    dispatch({
      type: UPDATE_TAB,
      payload: {
        currentDay: currentTab,
      },
    });
  }, []);

  useEffect(() => {
    getChannel();
  }, [getChannel]);

  return (
    <>
      <Columns>
        <Column>
          <Button color="light">Back</Button>
        </Column>
      </Columns>
      <Columns>
        <Column size={4}>
          {channel && (
            <ChannelCard
              {...channel}
              isShowtime={false}
              isDescription
              isHoverble={false}
            />
          )}
        </Column>
        <Column size={8}>
          <Panel title="Schedules" isPanelBlock={false}>
            <PanelTabs
              justifyContent="left"
              tabs={days}
              currentTab={currentDay}
              onChange={handleTabChange}
            />
            <PanelBlock>
              {weeklyShows
                ?.filter(({ date }) => convertToDayOfWeek(date) === currentDay)
                .map(({ shows }, index) => (
                  <ChannelShowtimes shows={shows} isShowOnNow={index === 0} />
                ))}
            </PanelBlock>
          </Panel>
        </Column>
      </Columns>
    </>
  );
};

export default ChannelDetail;
