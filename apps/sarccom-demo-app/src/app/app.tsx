import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { User, Photo } from '@demo-monorepo/api-interfaces';
import { Thumb, Columns, Column } from '@demo-monorepo/ui';
import './app.scss';

export const App = () => {
  const [user, setUser] = useState<User>();
  const [photos, setPhotos] = useState<Photo[]>();
  const { thumb, name, location, phone } = user || {};

  const getPeople = useCallback(async () => {
    const [people, photos] = await Promise.all([
      axios.get('http://localhost:3333/people'),
      axios.get('http://localhost:3333/photos'),
    ]);

    setUser(people.data);
    setPhotos(photos.data);
  }, []);

  useEffect(() => {
    getPeople();
  }, [getPeople]);

  return (
    <div className="app section container">
      {user && (
        <Columns isVcentered>
          <Column isNarrow>
            <Thumb isLarge src={thumb} alt={name} />
          </Column>
          <Column>
            <p className="title is-5">{name}</p>
            <p className="subtitle is-6">
              {location} ({phone})
            </p>
          </Column>
        </Columns>
      )}
      <Columns isMultiline>
        {photos?.map(({ url }) => {
          return (
            <Column key={url} size={4}>
              <div
                style={{
                  background: 'url(' + url + ')',
                  overflow: 'hidden',
                  height: '17em',
                  backgroundSize: 'cover',
                }}
              ></div>
            </Column>
          );
        })}
      </Columns>
    </div>
  );
};

export default App;
