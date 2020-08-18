import axios from 'axios';
import { User } from '@hello/api-interfaces';

export default (req, res) => {
  axios.get('https://randomuser.me/api/?results=10').then((response) => {
    const { results } = response.data;

    const users: User[] = results.map(({ name, phone, picture, location }) => {
      return {
        name: name.first + ' ' + name.last,
        phone,
        thumb: picture.medium,
        location: location.city + ', ' + location.state,
      };
    });

    res.send(users);
  });
};
