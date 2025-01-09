import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  MoviesResponse,
  AmediatekaSeriesResponse,
  AnimatedSeriesResponse,
  SubscriptionRequest,
} from './types';
import { API_ROUTES } from '@/shared/api/resources';

const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  tagTypes: ['Movie', 'AmediatekaSeries', 'AnimatedSeries', 'Subscription'],
  endpoints: (builder) => ({
    getMovies: builder.query<MoviesResponse, void>({
      query: () => {
        return API_ROUTES.MOVIES;
      },
      providesTags: (result) => {
        if (result?.movies) {
          return [
            ...result.movies.map(({ id }) => ({
              type: 'Movie' as 'Movie',
              id,
            })),
            { type: 'Movie' as 'Movie', id: 'LIST' },
          ];
        }

        return [{ type: 'Movie' as 'Movie', id: 'LIST' }];
      },
    }),

    getAmediatekaSeries: builder.query<AmediatekaSeriesResponse, void>({
      query: () => {
        return API_ROUTES.AMEDIATEKA_SERIES;
      },
      providesTags: (result) => {
        if (result?.amediatekaSeries) {
          return [
            ...result.amediatekaSeries.map(({ id }) => ({
              type: 'AmediatekaSeries' as 'AmediatekaSeries',
              id,
            })),
            { type: 'AmediatekaSeries' as 'AmediatekaSeries', id: 'LIST' },
          ];
        }

        return [{ type: 'AmediatekaSeries' as 'AmediatekaSeries', id: 'LIST' }];
      },
    }),

    getAnimatedSeries: builder.query<AnimatedSeriesResponse, void>({
      query: () => {
        return API_ROUTES.ANIMATED_SERIES;
      },
      providesTags: (result) => {
        if (result?.animatedSeries) {
          return [
            ...result.animatedSeries.map(({ id }) => ({
              type: 'AnimatedSeries' as 'AnimatedSeries',
              id,
            })),
            { type: 'AnimatedSeries' as 'AnimatedSeries', id: 'LIST' },
          ];
        }

        return [{ type: 'AnimatedSeries' as 'AnimatedSeries', id: 'LIST' }];
      },
    }),

    postSubscription: builder.mutation<any, SubscriptionRequest>({
      query: (data) => {
        return {
          url: API_ROUTES.SUBSCRIPTIONS,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [{ type: 'Subscription', id: 'LIST' }],
    }),

    getUserByEmail: builder.query<any, string>({
      query: (email) => {
        return `${API_ROUTES.USERS}/${email}`;
      },
      providesTags: (email) => [{ type: 'Subscription', id: email }],
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetAmediatekaSeriesQuery,
  useGetAnimatedSeriesQuery,
  usePostSubscriptionMutation,
  useGetUserByEmailQuery,
} = movieApi;

export default movieApi;
