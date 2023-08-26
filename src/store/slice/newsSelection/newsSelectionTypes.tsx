import { PostType } from "../posts/postsTypes";

export enum StatusEnum {
  loading = "loading",
  success = "success",
  error = "error",
}

export type NewsSelectionSliceType = {
  data: PostType[] | null;
  status: StatusEnum;
};
