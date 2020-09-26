import axios from 'axios';

export default (req, res) => {
  const limit = req.params.limit || '12';

  axios
    .get(
      `https://picsum.photos/v2/list?limit=${limit}&page=` +
        Math.floor(Math.random() * 100)
    )
    .then((response) => {
      const results = response.data;

      const photos = results.map((result) => {
        return {
          url: result['download_url'],
        };
      });

      res.send(photos);
    });
};
