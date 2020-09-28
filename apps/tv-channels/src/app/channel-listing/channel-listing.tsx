import React, {
  useCallback,
  useEffect,
  useReducer,
  createContext,
} from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ChannelService } from '@demo-monorepo/service-channel';
import { Channel, Filter, SortOrder } from '@demo-monorepo/api-interfaces';
import { Columns, Column } from '@demo-monorepo/ui';
import ChannelCard from '../channel-card/channel-card';
import ChannelFilters from '../channel-filters/channel-filters';
import ChannelSortButton from '../channel-sort-button/channel-sort-button';
import ChannelSelectedFilters from '../channel-selected-filters/channel-selected-filters';
import ChannelSearch from '../channel-search/channel-search';
import ChannelPagination from '../channel-pagination/channel-pagination';

import './channel-listing.scss';

export const CHANNEL_LISTING_SIZE = 12;
export const SUCCESS_GET_CHANNELS = 'SUCCESS_GET_CHANNELS';
export const UPDATE_SELECTED_FILTER = 'UPDATE_SELECTED_FILTER';
export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_SORT = 'UPDATE_SORT';
export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const START_LOADING = 'START_LOADING';

interface ChannelListingProps {
  search: string;
  page: number;
  total: number;
  sort: string;
  order: SortOrder;
  channels: Channel[];
  aggregations: Filter[];
  selectedFilters: Set<string>;
  isLoading: boolean;
}

const initialState: ChannelListingProps = {
  search: '',
  page: 0,
  total: 0,
  sort: '',
  order: '',
  channels: null,
  aggregations: null,
  selectedFilters: new Set<string>(),
  isLoading: false,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SUCCESS_GET_CHANNELS: {
      const { channels, total, aggregations } = payload;
      return {
        ...state,
        total,
        channels,
        aggregations,
        isLoading: false,
      };
    }

    case UPDATE_SELECTED_FILTER: {
      const { selectedFilters } = payload;
      return {
        ...state,
        selectedFilters,
        page: 0,
      };
    }

    case UPDATE_PAGE: {
      const { page } = payload;
      return {
        ...state,
        page,
      };
    }

    case UPDATE_SORT: {
      const { sort, order } = payload;
      return {
        ...state,
        sort,
        order,
      };
    }

    case UPDATE_SEARCH: {
      const { search } = payload;
      return {
        ...state,
        search,
        page: 0,
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

export const ChannelListingContext = createContext<{
  state?: ChannelListingProps;
  dispatch?: React.Dispatch<{
    type: string;
    payload: {
      [f: string]: unknown;
    };
  }>;
}>({});

export const ChannelListing = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    total,
    channels,
    page,
    sort,
    order,
    selectedFilters,
    isLoading,
    search,
  } = state as ChannelListingProps;

  const pageStart = page * CHANNEL_LISTING_SIZE + 1;
  const pageEnd = Math.min(
    total,
    page * CHANNEL_LISTING_SIZE + CHANNEL_LISTING_SIZE
  );

  const getChannels = useCallback(async () => {
    dispatch({
      type: START_LOADING,
      payload: {},
    });

    const payload = await ChannelService.getChannels({
      search,
      page,
      size: CHANNEL_LISTING_SIZE,
      filters: selectedFilters,
      sort,
      order,
    });

    dispatch({
      type: SUCCESS_GET_CHANNELS,
      payload,
    });
  }, [search, page, selectedFilters, sort, order]);

  useEffect(() => {
    getChannels();
  }, [getChannels]);

  return (
    <ChannelListingContext.Provider value={{ state, dispatch }}>
      <Columns
        className={classNames('channel-listing', {
          'is-loading': isLoading,
        })}
      >
        <Column>
          <Columns
            isMultiline
            isVcentered
            className="channel-heading is-mobile"
          >
            <Column className="is-two-thirds-mobile">
              <div className="title is-3">
                <b>Channels</b>
              </div>
            </Column>

            {!!total && (
              <Column isNarrow>
                <span>
                  {pageStart} to {pageEnd} of {total} channels
                </span>
                <span>
                  {pageStart}-{pageEnd} of {total}
                </span>
              </Column>
            )}

            <Column isNarrow>
              <ChannelSortButton
                title="title"
                field="title"
                disabled={!total}
              />
            </Column>
            <Column isNarrow>
              <ChannelSortButton
                title="channel"
                field="stbNumber"
                disabled={!total}
              />
            </Column>
          </Columns>
          <Columns isMultiline>
            <Column>
              <ChannelSelectedFilters />
            </Column>
          </Columns>
          {!channels && <p>Loading...</p>}
          {!total && channels && (
            <p>Oops, no channels found. Please try a different filter...</p>
          )}
          {!!total && (
            <>
              <Columns isMultiline>
                {channels?.map((channel) => (
                  <Column key={channel.id} size={4}>
                    <Link to={`/channels/${channel.id}`}>
                      <ChannelCard {...channel} />
                    </Link>
                  </Column>
                ))}
              </Columns>

              <Columns>
                <Column></Column>
                <Column isNarrow>
                  <ChannelPagination />
                </Column>
              </Columns>
            </>
          )}
        </Column>
        <Column size={3}>
          <ChannelSearch />
          <ChannelFilters />
        </Column>
      </Columns>
    </ChannelListingContext.Provider>
  );
};

export default ChannelListing;
