import React, { useState, useEffect, useCallback } from 'react';
import { User } from '@demo-monorepo/api-interfaces';
import { PeopleService } from '@demo-monorepo/service-people';
import './app.scss';
import UserCard from './components/UserCard';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const getPeoples = useCallback(async () => {
    const res = await PeopleService.getPeoples();

    setUsers(res);
  }, []);

  useEffect(() => {
    getPeoples();
  }, [getPeoples]);

  return (
    <div className="app section container">
      {users?.map(({ name, phone, thumb, location }) => {
        return (
          <UserCard
            location={location}
            name={name}
            phone={phone}
            thumb={thumb}
          ></UserCard>
        );
      })}
    </div>
  );
};

export default App;
