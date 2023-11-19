import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Gallery, ItemProps } from '../components/types';

interface ListResponse {
  limit: number;
  skip: number;
  // data: T[];
  search: string;
}

export const galleryApi = createApi({
  reducerPath: 'gallery',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/products' }),
  tagTypes: ['itemGAllery'],
  endpoints: (builder) => ({
    getGalleryListSearch: builder.query<Gallery, ListResponse>({
      query: ({ limit, skip, search }) => `/search?q=${search}&limit=${limit}&skip=${skip}`,
      providesTags: ['itemGAllery'],
    }),

    getOneItem: builder.query({
      query: (dataNumber: string) => `/${dataNumber}`,
      providesTags: ['itemGAllery'],
    }),
  }),
});

export const { useGetOneItemQuery, useGetGalleryListSearchQuery } = galleryApi;
