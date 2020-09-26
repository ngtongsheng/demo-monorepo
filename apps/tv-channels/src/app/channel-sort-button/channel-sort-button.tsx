import React, { FunctionComponent, useCallback } from 'react';
import { SortOrder } from '@demo-monorepo/api-interfaces';
import { Button, FaIcon } from '@demo-monorepo/ui';

import './channel-sort-button.scss';

export interface ChannelSortButtonProps {
  sort: string;
  order: SortOrder;
  onSort: (sort: string, order: SortOrder) => void;
}

export const ChannelSortButton: FunctionComponent<ChannelSortButtonProps> = ({
  sort,
  order,
  onSort,
}) => {
  const handleClick = useCallback(() => {
    if (!sort) {
      onSort('title', 'ascend');
      return;
    }

    if (order === 'ascend') {
      onSort('title', 'descend');
      return;
    }

    onSort('', '');
  }, [onSort, order, sort]);

  return (
    <Button onClick={handleClick} color={sort ? 'danger' : 'light'}>
      <span>Sort by title</span> {order === '' && <FaIcon name="sort" />}
      {order === 'ascend' && <FaIcon name="sort-alpha-down" />}
      {order === 'descend' && <FaIcon name="sort-alpha-up-alt" />}
    </Button>
  );
};

export default ChannelSortButton;
