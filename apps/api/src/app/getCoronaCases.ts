import axios from 'axios';
import { CoronaCase } from '@demo-monorepo/api-interfaces';

export default (req, res) => {
  axios
    .get('https://corona.lmao.ninja/v2/countries?yesterday&sort')
    .then((response) => {
      const results = response.data;

      const coronaCases: CoronaCase[] = results.map(
        ({ countryInfo: { iso3 }, cases }) => {
          return {
            id: iso3,
            value: cases,
          };
        }
      );

      res.send(coronaCases);
    });
};
