export enum StatusEnum {
  loading = "loading",
  success = "success",
  error = "error",
}

export type PostsSliceType = {
  items: {
    data: PostsType[] | null;
    status: StatusEnum;
  };
};
export type PostsType = {
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
