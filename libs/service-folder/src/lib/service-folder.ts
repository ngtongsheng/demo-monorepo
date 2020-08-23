import axios from 'axios';

const getFolders = () => {
  return axios.get('http://localhost:3333/folders').then(({ data }) => data);
};

export default {
  getFolders,
};
