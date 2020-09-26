import axios from 'axios';
import { Channel } from '@demo-monorepo/api-interfaces';

const getChannels = (): Promise<Channel[]> => {
  return axios.get('/channel').then(({ data }) => data);
};

const getChannel = (id): Promise<Channel> => {
  return axios.get(`/channel/${id}`).then(({ data }) => data);
};

export default {
  getChannels,
  getChannel,
};
