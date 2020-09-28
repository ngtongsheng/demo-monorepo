import React, { FunctionComponent, useCallback, useContext } from 'react';
import { Panel, Tags, Tag } from '@demo-monorepo/ui';
import {
  ChannelListingContext,
  UPDATE_SELECTED_FILTER,
} from '../channel-listing/channel-listing';
import './channel-filters.scss';

const LABELS = {
  isHd: 'Resolution',
  category: 'Categories',
  language: 'Languages',
};
export const ChannelFilters: FunctionComponent = () => {
  const { state, dispatch } = useContext(ChannelListingContext);
  const { selectedFilters, aggregations } = state;

  const handleFilterChange = useCallback(
    (key: string) => {
      const isSelected = selectedFilters.has(key);

      if (isSelected) {
        selectedFilters.delete(key);
        dispatch({
          type: UPDATE_SELECTED_FILTER,
          payload: {
            selectedFilters: new Set(selectedFilters),
          },
        });

        return;
      }

      dispatch({
        type: UPDATE_SELECTED_FILTER,
        payload: {
          selectedFilters: new Set(selectedFilters).add(key),
        },
      });
    },
    [dispatch, selectedFilters]
  );

  return (
    <div className="filter">
      {aggregations?.map(({ field, values }) => (
        <Panel title={LABELS[field]} key={field}>
          <Tags>
            {values.map((value: string) => {
              const key = JSON.stringify({ field, value });
              const isSelected = selectedFilters.has(key);
              const color = isSelected ? 'danger' : 'light';

              return (
                <Tag
                  key={value}
                  color={color}
                  onClick={() => handleFilterChange(key)}
                >
                  {value}
                </Tag>
              );
            })}
          </Tags>
        </Panel>
      ))}
    </div>
  );
};

export default ChannelFilters;
