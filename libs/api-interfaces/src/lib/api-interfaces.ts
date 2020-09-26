export interface User {
  name: string;
  phone: string;
  thumb: string;
  location: string;
}

export interface CoronaCase {
  id: string;
  cases: number;
}

export type SortOrder = 'ascend' | 'descend' | '';

export interface Filter {
  field: string;
  values: (string | number)[];
}

export interface ListingApiProps {
  page?: number;
  size?: number;
  sort?: string;
  order?: SortOrder;
  filters?: Filter[] | Set<string>;
}
