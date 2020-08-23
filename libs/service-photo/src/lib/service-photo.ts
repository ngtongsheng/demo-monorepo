import axios from 'axios';

const getPhoto = () => {
  return axios.get('http://localhost:3333/photos').then(({ data }) => data);
};

export default {
  getPhoto,
};
