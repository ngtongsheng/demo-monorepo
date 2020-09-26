type ChannelResoltion = 'SD' | 'HD';

export interface Show {
  id: string;
  title: string;
  showtime: Date;
}

export interface Channel {
  id: string;
  title: string;
  channelId: string;
  thumbnail: string;
  description?: string;
  resolution?: ChannelResoltion;
  shows?: Show[];
}

export interface ChannelRaw {
  language: string;
  id: string;
  title: string;
  stbNumber: number;
  imageUrl: string;
  isAstroGoExclusive: boolean;
}
