import axios from 'axios';

const getFolders = () => {
  return axios
    .get(
      'https://349ba4e37i.execute-api.ap-southeast-1.amazonaws.com/dev/folders'
    )
    .then(({ data }) => data.body);
};

export default {
  getFolders,
};
