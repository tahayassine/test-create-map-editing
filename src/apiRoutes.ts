import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Route, { IRoute } from './domain/Route';
import Waypoint from './domain/Waypoint';
import { setRoutes } from './slices/routeSlice';

// define base url by environment
const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://api.example.com';

export const routesApi = createApi({
  reducerPath: 'routesApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getRoutes: builder.query({
      query: () => '/routes',
      keepUnusedDataFor: 5,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          console.log('onQueryStarted', data);
          // `onSuccess` side-effect
          dispatch(setRoutes(data));
        } catch (err) {
          // `onError` side-effect
          console.log('Error fetching post!');
        }
      },
      transformResponse: (response: IRoute[]) => {
        const routes = response.map((route) => {
          return new Route(
            route.waypoints.map((waypoint) => {
              return new Waypoint(
                {
                  lat: waypoint.lat,
                  lng: waypoint.lng,
                },
                waypoint.id
              );
            }),
            route.name
          );
        });
        // dispatch(UpdateRoutes(routes));
        return routes;
      },
    }),
    addRoute: builder.mutation({
      query: (route: IRoute) => ({
        url: '/routes',
        method: 'POST',
        body: route,
      }),
    }),
    deleteRoute: builder.mutation({
      query: (route: IRoute) => ({
        url: `/routes/${route.id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetRoutesQuery,
  useAddRouteMutation,
  useDeleteRouteMutation,
} = routesApi;
