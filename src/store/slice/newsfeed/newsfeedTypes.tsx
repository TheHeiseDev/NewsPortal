import { PostType, StatusEnum } from "../posts/postsTypes";

export type NewsfeedSliceType = {
  items: {
    data: PostType[] | null;
    status: StatusEnum;
    totalPages: number;
    currentPage: number

  };
};

export type ParamsType = {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sortBy?: string;
};
