import React, { FunctionComponent } from 'react';
import { Thumb, Columns, Column, Card, Button } from '@hello/ui';
import { User } from '@hello/api-interfaces';

export const UserCard: FunctionComponent<User> = ({
  name,
  phone,
  thumb,
  location,
}) => {
  return (
    <Card>
      <Columns isVcentered>
        <Column isNarrow>
          <Thumb src={thumb} alt={name} />
        </Column>
        <Column>
          <p className="title is-5">{name}</p>
          <p className="subtitle is-6">
            {location} ({phone})
          </p>
        </Column>
        <Column isNarrow>
          <Button>call</Button>
        </Column>
      </Columns>
    </Card>
  );
};

export default UserCard;
