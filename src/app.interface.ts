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

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export interface AppContextInterface {
  user: User | null;
  theme: string;
  message: string;
  updateUser: Function;
  updateTheme: Function;
  updateMessage: Function;
}
