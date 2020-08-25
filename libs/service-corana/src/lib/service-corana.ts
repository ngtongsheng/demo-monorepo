import axios from 'axios';

const getCoronaCases = () => {
  return axios
    .get(
      'https://349ba4e37i.execute-api.ap-southeast-1.amazonaws.com/dev/corona-cases'
    )
    .then(({ data }) => data.body);
};

export default {
  getCoronaCases,
};
