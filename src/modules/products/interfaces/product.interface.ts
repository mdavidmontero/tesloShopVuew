import type { User } from '@/modules/auth/interfaces/user.interface';

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: Size[];
  gender: Gender;
  tags: string[];
  images: string[];
  user: User;
}

export enum Size {
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
  XXL = 'xxl',
  XXXL = 'xxxl',
}

export enum Gender {
  Kid = 'kid',
  Men = 'men',
  Women = 'women',
}
