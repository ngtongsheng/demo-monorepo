import React, { FunctionComponent, useCallback, useContext } from 'react';
import { Tag, Tags, FaIcon } from '@demo-monorepo/ui';
import './channel-selected-filters.scss';
import {
  ChannelListingContext,
  UPDATE_SEARCH,
  UPDATE_SELECTED_FILTER,
} from '../channel-listing/channel-listing';

export const ChannelSelectedFilters: FunctionComponent = () => {
  const { state, dispatch } = useContext(ChannelListingContext);
  const { selectedFilters, search } = state;

  const handleFilterDelete = useCallback(
    (key: string) => {
      selectedFilters.delete(key);

      dispatch({
        type: UPDATE_SELECTED_FILTER,
        payload: {
          selectedFilters: new Set(selectedFilters),
        },
      });
    },
    [dispatch, selectedFilters]
  );

  const handleClearFilters = useCallback(() => {
    dispatch({
      type: UPDATE_SELECTED_FILTER,
      payload: {
        selectedFilters: new Set(),
      },
    });
  }, [dispatch]);

  const handleClearSearch = useCallback(() => {
    dispatch({
      type: UPDATE_SEARCH,
      payload: {
        search: '',
      },
    });
  }, [dispatch]);

  const handleClearAll = useCallback(() => {
    handleClearFilters();
    handleClearSearch();
  }, [handleClearFilters, handleClearSearch]);

  return (
    <Tags className="selected-filters">
      {Array.from(selectedFilters).map((key) => {
        const filter = JSON.parse(key);
        return (
          <Tag
            key={key}
            size="normal"
            color="danger"
            onClick={() => handleFilterDelete(key)}
          >
            {filter.field}: {filter.value}
            <FaIcon name="times" />
          </Tag>
        );
      })}
      {search && (
        <Tag size="normal" color="dark" onClick={handleClearSearch}>
          search: {search}
          <FaIcon name="times" />
        </Tag>
      )}
      <Tag
        size="normal"
        className={!selectedFilters.size && !search && 'is-disabled'}
        color={selectedFilters.size ? 'danger' : 'light'}
        onClick={handleClearAll}
      >
        Clear all <FaIcon name="times" />
      </Tag>
    </Tags>
  );
};

export default ChannelSelectedFilters;
