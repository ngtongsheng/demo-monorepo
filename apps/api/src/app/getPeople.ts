import axios from 'axios';
import { User } from '@hello/api-interfaces';

export default (req, res) => {
  axios.get('https://randomuser.me/api/').then((response) => {
    const { name, phone, picture, location } = response.data.results[0];

    const user: User = {
      name: name.first + ' ' + name.last,
      phone,
      thumb: picture.large,
      location: location.city + ', ' + location.state,
    };

    res.send(user);
  });
};
