import db from '../db';
import { Channel } from '@demo-monorepo/api-interfaces';

export default (req, res) => {
  const channels = db.get('channels').values();

  res.send(
    channels.map(
      ({ id, title, stbNumber, imageUrl, isAstroGoExclusive }): Channel => {
        return {
          id: `${title}-${id}`,
          title,
          channelId: isAstroGoExclusive
            ? 'Astro GO Exclusive Channels'
            : `CH-${stbNumber}`,
          thumbnail: imageUrl,
        };
      }
    )
  );
};
