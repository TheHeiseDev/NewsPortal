import { StatusEnum } from "../posts/postsTypes";

export type initialDeviceInfo = {
  ipAddress: string | null;
  country: string | null;
  status: StatusEnum
};
