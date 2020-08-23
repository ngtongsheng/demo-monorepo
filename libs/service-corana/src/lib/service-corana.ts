import axios from 'axios';

const getCoronaCases = () => {
  return axios
    .get('http://localhost:3333/corona-cases')
    .then(({ data }) => data);
};

export default {
  getCoronaCases,
};
