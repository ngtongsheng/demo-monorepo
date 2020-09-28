type ChannelResoltion = 'SD' | 'HD';

export interface DailyShows {
  date: string;
  shows: Show[];
}

export interface Show {
  id: string;
  title: string;
  showtime: string;
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

export interface CurrentSchedule {
  title: string;
  datetime: string;
  siTrafficKey: string;
}

export interface Schedule {
  [date: string]: CurrentSchedule[];
}

export interface ChannelRaw {
  language: string;
  id: string;
  title: string;
  stbNumber: number;
  imageUrl: string;
  isAstroGoExclusive: boolean;
  currentSchedule: CurrentSchedule[];
  schedule: Schedule;
  description: string;
}
