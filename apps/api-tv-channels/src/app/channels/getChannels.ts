import db from '../db';
import {
  all,
  includes,
  equals,
  prop,
  sortWith,
  descend,
  ascend,
  map,
  pipe,
  filter,
  groupBy,
  keys,
} from 'ramda';
import {
  Channel,
  ChannelRaw,
  Filter,
  ListingApiProps,
} from '@demo-monorepo/api-interfaces';

const ORDERS = {
  descend,
  ascend,
};

const applyFilters = (filters) =>
  filter((channel) =>
    pipe(
      map(({ field, values }: Filter): boolean =>
        includes(channel[field], values)
      ),
      all(equals(true))
    )(filters)
  );

const getAggregations = (channels) =>
  map((field: string) => ({
    field,
    values: pipe(
      groupBy((channel) => channel[field]),
      keys
    )(channels),
  }))(['language', 'category', 'isHd']);

export default (req, res) => {
  const collection = db.get('channels');
  const total = collection.size().value();

  const {
    page = 0,
    size = total,
    sort,
    order,
    filters = [],
  } = req.body as ListingApiProps;

  const channelsString = JSON.stringify(collection.values());
  const channels: ChannelRaw[] = JSON.parse(channelsString);

  const pageStart = page * size;
  const pageEnd = pageStart + size;
  const orderMethod = (ORDERS[order] || ascend)(prop(sort));

  const aggregations = getAggregations(channels);

  const filtered = applyFilters(filters)(channels);
  const sorted = sortWith([orderMethod])(filtered);
  const sliced = sorted.slice(pageStart, pageEnd);

  res.send({
    total: filtered.length,
    channels: sliced.map(
      ({ id, title, stbNumber, imageUrl, isAstroGoExclusive }): Channel => {
        return {
          id: `${title.split(' ').join('-')}-${id}`,
          title,
          channelId: isAstroGoExclusive
            ? 'Astro GO Exclusive Channels'
            : `CH-${stbNumber}`,
          thumbnail: imageUrl,
        };
      }
    ),
    aggregations,
  });
};
