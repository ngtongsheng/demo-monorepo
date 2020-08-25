import axios from 'axios';

const getPeoples = () => {
  return axios
    .get(
      'https://349ba4e37i.execute-api.ap-southeast-1.amazonaws.com/dev/peoples'
    )
    .then(({ data }) => data.body);
};

const getPeople = () => {
  return axios
    .get(
      'https://349ba4e37i.execute-api.ap-southeast-1.amazonaws.com/dev/people'
    )
    .then(({ data }) => data.body);
};

export default {
  getPeoples,
  getPeople,
};
