import { configureStore } from '@reduxjs/toolkit';
import routeReducer from './slices/routeSlice';
import { routesApi } from './apiRoutes';

const store = configureStore({
  reducer: {
    routes: routeReducer,
    [routesApi.reducerPath]: routesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(routesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
