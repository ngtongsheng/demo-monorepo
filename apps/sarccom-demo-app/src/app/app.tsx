import React, { useState, useEffect, useCallback } from 'react';
import { User, Photo } from '@demo-monorepo/api-interfaces';
import { Thumb, Columns, Column } from '@demo-monorepo/ui';
import { PeopleService } from '@demo-monorepo/service-people';
import { PhotoService } from '@demo-monorepo/service-photo';
import './app.scss';

export const App = () => {
  const [user, setUser] = useState<User>();
  const [photos, setPhotos] = useState<Photo[]>();
  const { thumb, name, location, phone } = user || {};

  const getPeople = useCallback(async () => {
    const [people, photos] = await Promise.all([
      PeopleService.getPeople(),
      PhotoService.getPhoto(),
    ]);

    setUser(people);
    setPhotos(photos);
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
