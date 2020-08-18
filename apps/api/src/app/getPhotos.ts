import axios from 'axios';
import { Photo } from '@hello/api-interfaces';

export default (req, res) => {
  axios
    .get(
      'https://picsum.photos/v2/list?limit=12&page=' +
        Math.floor(Math.random() * 100)
    )
    .then((response) => {
      const results = response.data;

      const photos: Photo[] = results.map((result) => {
        return {
          url: result['download_url'],
        };
      });

      res.send(photos);
    });
};
