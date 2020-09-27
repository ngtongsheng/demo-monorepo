import axios from 'axios';
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
  Show,
} from '@demo-monorepo/api-interfaces';

const ORDERS = {
  descend,
  ascend,
};

const applyFilters = (filters) => {
  const convertResolutionToBoolean = (filter: Filter) => {
    if (filter.field === 'isHd') {
      filter.values = filter.values.map((value) => value === 'HD');
    }

    return filter;
  };

  const converted = map(convertResolutionToBoolean)(filters);

  const byFields = (channel) =>
    pipe(
      map(({ field, values }: Filter): boolean => {
        return includes(channel[field], values);
      }),
      all(equals(true))
    )(converted);

  return filter(byFields);
};

const getAggregations = (channels): Filter[] => {
  return pipe(
    map((field: string) => ({
      field,
      values: pipe(
        groupBy((channel) => channel[field]),
        keys
      )(channels),
    })),
    map((filter: Filter) => {
      if (filter.field === 'isHd') {
        filter.values = filter.values.map((value) =>
          value === 'false' ? 'SD' : 'HD'
        );
      }

      return filter;
    })
  )(['language', 'category', 'isHd']);
};

export default async (req, res) => {
  const { data } = await axios.get(
    'https://contenthub-api.eco.astro.com.my/channel/all.json'
  );

  const channels: ChannelRaw[] = data.response;

  const { page = 0, sort, order, filters = [] } = req.body as ListingApiProps;

  const filtered = applyFilters(filters)(channels);
  const orderMethod = (ORDERS[order] || ascend)(prop(sort));
  const aggregations = getAggregations(channels);

  const { size = filtered.length } = req.body as ListingApiProps;
  const pageStart = page * size;
  const pageEnd = pageStart + size;

  const sorted = sortWith([orderMethod])(filtered);
  const sliced = sorted.slice(pageStart, pageEnd);

  res.send({
    total: filtered.length,
    channels: sliced.map(
      ({
        id,
        title,
        stbNumber,
        imageUrl,
        isAstroGoExclusive,
        currentSchedule,
      }: ChannelRaw): Channel => {
        const shows = currentSchedule
          .map(
            (schedule): Show => ({
              id: `${schedule.title.split(' ').join('-')}-${
                schedule.siTrafficKey
              }`,
              title: schedule.title,
              showtime: schedule.datetime,
            })
          )
          .slice(0, 3);

        return {
          id: `${title.split(' ').join('-')}-${id}`,
          title,
          channelId: isAstroGoExclusive
            ? 'Astro GO Exclusive Channels'
            : `CH-${stbNumber}`,
          thumbnail: imageUrl,
          shows,
        };
      }
    ),
    aggregations,
  });
};
