import { CSSProperties } from "react";

export type UserInfo = {
  id: string;
  name: string;
  image: string;
  placeCount: number;
};

export type UserInfoList = UserInfo[];

export type AvatarProps = {
  image: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  width?: string;
};
