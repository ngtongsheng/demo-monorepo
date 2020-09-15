import axios from 'axios';

const DIMENSIONS: DimensionHash = {
  HD: { w: '1600', h: '900' },
  FULLHD: { w: '1600', h: '900' },
};

type Resolution = 'HD' | 'FULLHD';

interface Dimension {
  w: string;
  h: string;
}

interface DimensionHash {
  [r: string]: Dimension;
}

interface GetPhotoOptions {
  resolution?: Resolution;
  limit?: number;
}

const getPhoto = (options?: GetPhotoOptions): Promise<string[]> => {
  return axios
    .get(
      'https://349ba4e37i.execute-api.ap-southeast-1.amazonaws.com/dev/photos?',
      {
        params: {
          limit: options.limit || 12,
        },
      }
    )
    .then(({ data }) => data.body.map(({ url }) => url))
    .then((photos) => {
      if (options?.resolution) {
        const { w, h } = DIMENSIONS[options.resolution];

        return photos.map((photo) => {
          const splitted = photo.split('/');
          splitted[splitted.length - 2] = w;
          splitted[splitted.length - 1] = h;
          return splitted.join('/');
        });
      }
      return photos;
    });
};

export default {
  getPhoto,
};
