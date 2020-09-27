import React, { FunctionComponent, useCallback } from 'react';
import { Panel, Tags, Tag } from '@demo-monorepo/ui';
import { Filter } from '@demo-monorepo/api-interfaces';
import './channel-filters.scss';

const LABELS = {
  isHd: 'Resolution',
  category: 'Categories',
  language: 'Languages',
};

export interface ChannelFiltersProps {
  aggregations: Filter[];
  selectedFilters: Set<string>;
  onChange?: (s: Set<string>) => void;
}

export const ChannelFilters: FunctionComponent<ChannelFiltersProps> = ({
  aggregations,
  selectedFilters,
  onChange,
}) => {
  const handleFilterChange = useCallback(
    (key: string) => {
      const isSelected = selectedFilters.has(key);

      if (isSelected) {
        selectedFilters.delete(key);
        onChange(new Set(selectedFilters));
        return;
      }

      onChange(new Set(selectedFilters).add(key));
    },
    [onChange, selectedFilters]
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
