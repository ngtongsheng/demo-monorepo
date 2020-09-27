import React, { FunctionComponent, useCallback } from 'react';
import { Tag, Tags, FaIcon } from '@demo-monorepo/ui';
import './channel-selected-filters.scss';

export interface ChannelSelectedFiltersProps {
  selectedFilters: Set<string>;
  onChange?: (s: Set<string>) => void;
}

export const ChannelSelectedFilters: FunctionComponent<ChannelSelectedFiltersProps> = ({
  selectedFilters,
  onChange,
}) => {
  const handleFilterDelete = useCallback(
    (key: string) => {
      selectedFilters.delete(key);
      onChange(new Set(selectedFilters));
    },
    [onChange, selectedFilters]
  );

  const handleFilterDeleteAll = useCallback(() => {
    onChange(new Set());
  }, [onChange]);

  return (
    <Tags className="selected-filters">
      {Array.from(selectedFilters).map((key) => {
        const filter = JSON.parse(key);
        return (
          <Tag
            key={key}
            size="normal"
            color="light"
            onClick={() => handleFilterDelete(key)}
          >
            {filter.field}: {filter.value}
            <FaIcon name="times" />
          </Tag>
        );
      })}
      <Tag
        size="normal"
        className={!selectedFilters.size && 'is-disabled'}
        color={selectedFilters.size ? 'danger' : 'light'}
        onClick={handleFilterDeleteAll}
      >
        Clear all <FaIcon name="times" />
      </Tag>
    </Tags>
  );
};

export default ChannelSelectedFilters;
