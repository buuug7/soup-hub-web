export interface Soup {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  more: {
    reference: string;
  };
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
  loading: boolean;
  updateUser: Function;
  updateTheme: Function;
  updateMessage: Function;
  updateLoading: Function;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  commentType: string;
  commentTypeId: number;
  user: User;
}
