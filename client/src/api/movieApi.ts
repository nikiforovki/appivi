import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Movie } from './types';

const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Movie'],
  endpoints: (builder) => ({
    getMovies: builder.query<Movie[], void>({
      query: () => 'all-movies',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Movie' as const, id })),
              { type: 'Movie' as const, id: 'LIST' },
            ]
          : [{ type: 'Movie' as const, id: 'LIST' }],
    }),
  }),
});

export const { useGetMoviesQuery } = movieApi;
export default movieApi;
