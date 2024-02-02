import {
  CSSProperties,
  ReactNode,
  MouseEvent,
  ReactEventHandler,
} from 'react';

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

export type ButtonProps = {
  size?: 'default' | 'small' | 'big';
  inverse?: boolean;
  danger?: boolean;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  to?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children: ReactNode;
};

export type ModalProps = {
  show: boolean;
  onCancel: ReactEventHandler;
  className?: string;
  style?: CSSProperties;
  headerClass?: string;
  header: string;
  onSubmit?: () => void;
  contentClass: string;
  children: ReactNode;
  footerClass: string;
  footer: ReactNode;
};
