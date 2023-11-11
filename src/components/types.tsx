import { FormEvent, ReactNode } from 'react';
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

export type PaginationProps = {
  pagesQuantity: number;
  currentPage: number;
  setCurrentPage: (data: number) => void;
};

export type SelectProps = {
  handleSelect: (event: FormEvent<HTMLSelectElement>) => void;
};

export type AppContextType = {
  gallery: ItemProps[];
  search: string | null;
  isGallery: (data: []) => void;
};

export type ContextProps = {
  children: ReactNode;
};
