import { FormEvent } from 'react';
export type ItemProps = {
  title?: string;
  price?: string;
  rating?: string;
  category?: string;
  discountPercentage?: string;
  description?: string;
  brand?: string;
  id: string;
};

export type Gallery = {
  gallery: ItemProps[];
};

export type Search = {
  search: string;
};

export type Quantity = {
  quantity: number;
};

export type ErrorCardProps = {
  children: string;
};

export type PaginationProps = {
  pagesQuantity: number;
  currentPage: number;
  setCurrentPage: (data: number) => void;
};

export type SelectProps = {
  handleSelect: (event: FormEvent<HTMLSelectElement>) => void;
};

export type LoaderProps = {
  position: string;
};

export type GalleryProps = {
  gallery: ItemProps[];
};

export type Loading = {
  loadingMain: boolean;
  loadingDetailed: boolean;
};
