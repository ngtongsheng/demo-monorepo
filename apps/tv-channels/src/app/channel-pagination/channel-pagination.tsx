import React, { FunctionComponent, useContext, useCallback } from 'react';
import { Pagination } from '@demo-monorepo/ui';

import './channel-pagination.scss';
import {
  ChannelListingContext,
  CHANNEL_LISTING_SIZE,
  UPDATE_PAGE,
} from '../channel-listing/channel-listing';

export const ChannelPagination: FunctionComponent = () => {
  const { state, dispatch } = useContext(ChannelListingContext);

  const handlePageChange = useCallback(
    (currentPage: number) => {
      dispatch({
        type: UPDATE_PAGE,
        payload: {
          page: currentPage,
        },
      });
    },
    [dispatch]
  );

  const { page, total } = state;
  return (
    <Pagination
      page={page}
      size={CHANNEL_LISTING_SIZE}
      total={total}
      onChange={handlePageChange}
    />
  );
};

export default ChannelPagination;
