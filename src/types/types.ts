import { CSSProperties, ReactNode, MouseEvent, ReactEventHandler } from 'react';

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

export type MapProps = {
  className?: string;
  style?: CSSProperties;
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
};

export type InputProps = {
  element: 'input' | 'textarea';
  rows?: number;
  placeholder?: string;
  type?:
    | 'text'
    | 'password'
    | 'number'
    | 'email'
    | 'checkbox'
    | 'radio'
    | 'file'
    | 'date'
    | 'color'
    | 'range'
    | 'hidden';
  id?: string;
  className?: string;
  label: string;
  errorText?: string;
  validators: ValidatorType[];
  onInput: (id: string, value: string, isValid: boolean) => void;
};

export type InputState = {
  value: string;
  isValid: boolean;
  isTouched: boolean;
};

export type InputAction = {
  type: 'CHANGE' | 'TOUCH';
  value: string;
  validators: ValidatorType[];
};

export type ValidatorType = {
  type: string;
  val?: number;
};

export type FormState = {
  inputs: {
    title: {
      value: string;
      isValid: boolean;
    },
    description: {
      value: string;
      isValid: boolean;
    }
  };
  isValid: boolean;
}

export type FormAction = {
  type: 'INPUT_CHANGE';
  inputId: string;
  isValid: boolean;
  value: string;
}
