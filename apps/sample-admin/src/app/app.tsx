import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { User } from '@demo-monorepo/api-interfaces';
import './app.scss';
import UserCard from './components/UserCard';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const getPeoples = useCallback(async () => {
    const res = await axios.get('http://localhost:3333/peoples');

    setUsers(res.data);
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
