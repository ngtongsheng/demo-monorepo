import React, { useCallback, useEffect, useState } from 'react';
import { PhotoService } from '@demo-monorepo/service-photo';
import { Carousel } from '@demo-monorepo/carousel';
import './app.scss';

export const App = () => {
  const [photos, setPhotos] = useState([]);

  const getPhotos = useCallback(async () => {
    const res = await PhotoService.getPhoto({ resolution: 'HD', limit: 5 });
    setPhotos(res);
  }, []);

  useEffect(() => {
    getPhotos();
  }, [getPhotos]);

  return <Carousel contents={photos} />;
};

export default App;
