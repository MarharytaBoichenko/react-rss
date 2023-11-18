import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Gallery, ItemProps } from '../components/types';

interface ListResponse<T> {
  limit: string;
  skip: string;
  data: T[];
}

// Define a service using a base URL and expected endpoints
export const galleryApi = createApi({
  reducerPath: 'gallery',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/products' }),
  tagTypes: ['itemGAllery'],
  endpoints: (builder) => ({
    getGalleryList: builder.query({
      query: ({ limit, skip }) => `?limit=${limit}&skip=${skip}`,
      providesTags: ['itemGAllery'],
    }),

    getBySearch: builder.query({
      query: (search) => `/search?q=${search}`,
      providesTags: ['itemGAllery'],
    }),
    getOneItem: builder.query({
      query: (dataNumber: string) => `/${dataNumber}`,
      providesTags: ['itemGAllery'],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetGalleryListQuery, useGetBySearchQuery, useGetOneItemQuery } = galleryApi;
