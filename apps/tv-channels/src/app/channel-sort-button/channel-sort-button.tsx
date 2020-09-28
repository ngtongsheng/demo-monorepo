import React, { FunctionComponent, useCallback, useContext } from 'react';
import { Button, FaIcon } from '@demo-monorepo/ui';
import {
  ChannelListingContext,
  UPDATE_SORT,
} from '../channel-listing/channel-listing';
import './channel-sort-button.scss';

export interface ChannelSortButtonProps {
  title: string;
  field: string;
  disabled?: boolean;
}

export const ChannelSortButton: FunctionComponent<ChannelSortButtonProps> = ({
  title,
  field,
  disabled,
}) => {
  const { state, dispatch } = useContext(ChannelListingContext);
  const { sort, order } = state;
  const isCurrentSort = sort === field;

  const handleSortChange = useCallback(() => {
    if (!sort || sort !== field) {
      dispatch({
        type: UPDATE_SORT,
        payload: {
          sort: field,
          order: 'ascend',
        },
      });
      return;
    }

    if (order === 'ascend') {
      dispatch({
        type: UPDATE_SORT,
        payload: {
          sort: field,
          order: 'descend',
        },
      });
      return;
    }

    dispatch({
      type: UPDATE_SORT,
      payload: {
        sort: '',
        order: '',
      },
    });
  }, [dispatch, field, order, sort]);

  return (
    <Button
      disabled={disabled}
      onClick={handleSortChange}
      color={isCurrentSort ? 'danger' : 'light'}
    >
      <span>Sort by {title}</span> {!isCurrentSort && <FaIcon name="sort" />}
      {isCurrentSort && order === 'ascend' && <FaIcon name="sort-alpha-down" />}
      {isCurrentSort && order === 'descend' && (
        <FaIcon name="sort-alpha-up-alt" />
      )}
    </Button>
  );
};

export default ChannelSortButton;
