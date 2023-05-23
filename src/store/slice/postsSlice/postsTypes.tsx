export enum StatusEnum {
  loading = "loading",
  success = "success",
  error = "error",
}

export type PostsSliceType = {
  items: {
    data: PostType[] | null;
    status: StatusEnum;
  };
  item: {
    data: PostType | null;
    status: StatusEnum;
  };
};
export type PostType = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  views: number;
  comments: CommentsType[];
  date: number;
  category: string;
  link: string;
};

export type CommentsType = {
  id: string;
  user: string;
  text: string;
  date: string;
};
