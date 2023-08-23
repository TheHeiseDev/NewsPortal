import { PostType } from "../posts/postsTypes";

export enum StatusEnum {
  loading = "loading",
  success = "success",
  error = "error",
}

export type OtherPostsSlice = {
  data: PostType[] | null;
  status: StatusEnum;
};
