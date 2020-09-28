import axios from 'axios';
import {
  Channel,
  ChannelRaw,
  DailyShows,
  Show,
} from '@demo-monorepo/api-interfaces';

export default async (req, res) => {
  const { id } = req.params;
  const url = `https://contenthub-api.eco.astro.com.my/channel/${id}.json`;
  const { data } = await axios.get(url);

  const {
    title,
    isAstroGoExclusive,
    stbNumber,
    imageUrl,
    description,
    schedule,
  }: ChannelRaw = data.response;

  const weeklyShows = Object.keys(schedule).map(
    (date): DailyShows => ({
      date,
      shows: schedule[date].map(
        (schedule): Show => ({
          id: `${schedule.title.split(' ').join('-')}-${schedule.siTrafficKey}`,
          title: schedule.title,
          showtime: schedule.datetime,
        })
      ),
    })
  );

  const channel: Channel = {
    id: `${title.split(' ').join('-')}-${id}`,
    title,
    channelId: isAstroGoExclusive
      ? 'Astro GO Exclusive Channels'
      : `CH-${stbNumber}`,
    thumbnail: imageUrl,
    description,
  };

  res.send({
    channel,
    weeklyShows,
  });
};
