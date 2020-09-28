import axios from 'axios';
import { pipe, map, groupBy, toPairs } from 'ramda';
import {
  Channel,
  ListingApiProps,
  Filter,
} from '@demo-monorepo/api-interfaces';

const { CancelToken } = axios;
let source;

const cancelPrevious = () => {
  if (source) {
    source.cancel('cancel');
  }

  source = CancelToken.source();
};

const getChannels = ({
  search,
  page,
  size,
  sort,
  order,
  filters = new Set<string>(),
}: ListingApiProps = {}): Promise<{ total: number; channels: Channel[] }> => {
  cancelPrevious();

  const body = {
    search,
    page,
    size,
    sort,
    order,
    filters: pipe(
      map(JSON.parse),
      groupBy<{ field: string; value: string }>(({ field }) => field),
      toPairs,
      map(
        ([field, values]): Filter => ({
          field,
          values: values.map(({ value }) => value),
        })
      )
    )(Array.from(filters as Set<string>)),
  };

  const options = {
    cancelToken: source.token,
  };

  return axios.post('/channel', body, options).then(({ data }) => data);
};

const getChannel = (id): Promise<Channel> => {
  return axios.get(`/channel/${id}`).then(({ data }) => data);
};

export default {
  getChannels,
  getChannel,
};
