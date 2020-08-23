import axios from 'axios';

const getPeoples = () => {
  return axios.get('http://localhost:3333/peoples').then(({ data }) => data);
};

const getPeople = () => {
  return axios.get('http://localhost:3333/people').then(({ data }) => data);
};

export default {
  getPeoples,
  getPeople,
};
