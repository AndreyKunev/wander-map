import { CSSProperties } from 'react';

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

export type UserPlace = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  creator: string;
};

export type UserPlaceArray = UserPlace[];