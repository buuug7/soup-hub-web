export interface Soup {
  id: number;
  content: string;
  extra?: object;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    name: string;
  };
}

export interface PaginationResponse {
  total: number;
  totalPage: number;
  perPage: number;
  currentPage: number;
  data: any[];
}

export interface PaginationParam {
  currentPage: number;
  perPage?: number;
}

export interface SoupSearchParam {
  content?: string;
  username?: string;
}
