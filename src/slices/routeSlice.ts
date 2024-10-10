import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Route, { IRoute } from '../domain/Route';
import RouteManager from '../domain/RouteManager';
import initRoutes from '../utiles/initRoutes';
import { useGetRoutesQuery } from '../apiRoutes';

interface RouteState {
  routes: IRoute[];
  routesManager: RouteManager | null;
  isLoading: boolean;
  error: string | undefined;
}

const initialState: RouteState = {
  routes: [] as IRoute[],
  routesManager: null,
  isLoading: false,
  error: undefined,
};

const routeSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    setRoutes(state, action: PayloadAction<IRoute[]>) {
      state.routes = action.payload;
      if (state.routesManager) {
        state.routesManager = state.routesManager.updateRoutes(action.payload);
      }
    },
    updateRoute(state, action: PayloadAction<IRoute>) {
      const index = state.routes.findIndex(
        (route) => route.id === action.payload.id
      );
      if (index !== -1) {
        state.routes[index] = action.payload;
      }
    },
    setRoutesManager(state, action: PayloadAction<RouteManager>) {
      state.routesManager = action.payload;
    },
    initRoutes(state, action: PayloadAction<IRoute[]>) {
      const { data } = useGetRoutesQuery({});
      console.log('data', data);
      state.isLoading = true;
    },
  },
});

export const { setRoutes, updateRoute, setRoutesManager } = routeSlice.actions;
export default routeSlice.reducer;
