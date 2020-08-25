import axios from 'axios';

const getPhoto = () => {
  return axios
    .get(
      'https://349ba4e37i.execute-api.ap-southeast-1.amazonaws.com/dev/photos'
    )
    .then(({ data }) => data.body);
};

export default {
  getPhoto,
};
