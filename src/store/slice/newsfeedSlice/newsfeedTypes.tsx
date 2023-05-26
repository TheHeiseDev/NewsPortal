import { PostType, StatusEnum } from "../postsSlice/postsTypes";

export type NewsfeedSliceType = {
  items: {
    data: PostType[] | null;
    status: StatusEnum;
    maxPage: number;
  };
};

export type ParamsType = {
  page?: number;
  limit?: number;
  category?: string;
};
