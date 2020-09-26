import React, { useCallback, useEffect, useReducer } from 'react';
import classNames from 'classnames';
import { ChannelService } from '@demo-monorepo/service-channel';
import { Channel, Filter, SortOrder } from '@demo-monorepo/api-interfaces';
import { Columns, Column, Pagination } from '@demo-monorepo/ui';
import ChannelCard from '../channel-card/channel-card';
import ChannelFilters from '../channel-filters/channel-filters';
import ChannelSortButton from '../channel-sort-button/channel-sort-button';
import './channel-listing.scss';

const PAGE_SIZE = 18;

const SUCCESS_GET_CHANNEL = 'SUCCESS_GET_CHANNEL';
const UPDATE_SELECTED_FILTER = 'UPDATE_SELECTED_FILTER';
const UPDATE_PAGE = 'UPDATE_PAGE';
const UPDATE_SORT = 'UPDATE_SORT';
const START_LOADING = 'START_LOADING';

interface ChannelListingProps {
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
    case SUCCESS_GET_CHANNEL: {
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

export const ChannelListing = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    total,
    channels,
    page,
    sort,
    order,
    aggregations,
    selectedFilters,
    isLoading,
  } = state;

  const pageStart = page * PAGE_SIZE + 1;
  const pageEnd = Math.min(total, page * PAGE_SIZE + PAGE_SIZE);

  const getChannels = useCallback(async () => {
    dispatch({
      type: START_LOADING,
      payload: {},
    });

    const payload = await ChannelService.getChannels({
      page,
      size: PAGE_SIZE,
      filters: selectedFilters,
      sort,
      order,
    });

    dispatch({
      type: SUCCESS_GET_CHANNEL,
      payload,
    });
  }, [page, selectedFilters, sort, order]);

  const handleFilterChange = useCallback(
    (currentSelectedFilters: Set<string>) => {
      dispatch({
        type: UPDATE_SELECTED_FILTER,
        payload: {
          selectedFilters: currentSelectedFilters,
        },
      });
    },
    []
  );

  const handlePageChange = useCallback(
    (currentPage: number) => {
      if (currentPage === page) {
        return;
      }

      dispatch({
        type: UPDATE_PAGE,
        payload: {
          page: currentPage,
        },
      });
    },
    [page]
  );

  const handleSortChange = useCallback((currentSort, currentOrder) => {
    dispatch({
      type: UPDATE_SORT,
      payload: {
        sort: currentSort,
        order: currentOrder,
      },
    });
  }, []);

  useEffect(() => {
    getChannels();
  }, [getChannels]);

  return (
    <Columns
      className={classNames('channel-listing', {
        'is-loading': isLoading,
      })}
    >
      <Column>
        <Columns isMultiline isVcentered>
          <Column>
            <div className="title is-3">
              <b>Channels</b>
            </div>
            {!channels && <p>Loading...</p>}
            {!total && (
              <p>Oops, no channels found. Please try a different filter...</p>
            )}
          </Column>
          {!!total && (
            <Column isNarrow>
              {pageStart} to {pageEnd} of {total} channels
            </Column>
          )}
          {!!total && (
            <Column isNarrow>
              <ChannelSortButton
                sort={sort}
                order={order}
                onSort={handleSortChange}
              />
            </Column>
          )}
        </Columns>
        {!!total && (
          <>
            <Columns isMultiline>
              {channels?.map((channel) => (
                <Column key={channel.id} size={4}>
                  <ChannelCard {...channel} />
                </Column>
              ))}
            </Columns>

            <Columns>
              <Column></Column>
              <Column isNarrow>
                <Pagination
                  initialIndex={page}
                  size={PAGE_SIZE}
                  total={total}
                  onChange={handlePageChange}
                />
              </Column>
            </Columns>
          </>
        )}
      </Column>
      <Column size={3}>
        <ChannelFilters
          selectedFilters={selectedFilters}
          aggregations={aggregations}
          onSelect={handleFilterChange}
        />
      </Column>
    </Columns>
  );
};

export default ChannelListing;
