import React, { FunctionComponent, useCallback, useContext } from 'react';
import { Input, Panel } from '@demo-monorepo/ui';
import './channel-search.scss';
import {
  ChannelListingContext,
  UPDATE_SEARCH,
} from '../channel-listing/channel-listing';

export const ChannelSearch: FunctionComponent = () => {
  const { state, dispatch } = useContext(ChannelListingContext);
  const { search } = state;

  const handleSearch = useCallback(
    ({ target }) => {
      dispatch({
        type: UPDATE_SEARCH,
        payload: {
          search: target.value,
        },
      });
    },
    [dispatch]
  );

  return (
    <Panel title="Search">
      <Input
        value={search}
        onChange={handleSearch}
        placeholder="Search by channel name or id"
      />
    </Panel>
  );
};

export default ChannelSearch;
