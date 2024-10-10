// create class RouteManager add route delete route rename route

import Route, { IRoute } from './Route';
import { MapStrategy } from './MapStrategy';
import { Observer } from './Observer';
import Waypoint from './Waypoint';

export default class RouteManager implements Observer {
  routes: IRoute[] = [];

  constructor(routes: IRoute[], private mapStrategy: MapStrategy) {
    this.initMapStrategy(mapStrategy);
    routes.forEach((route) => {
      this.addRoute(route, this.mapStrategy);
    });
    return this;
  }

  getMapStrategy() {
    return this.mapStrategy;
  }

  private initMapStrategy(mapStrategy: MapStrategy) {
    this.mapStrategy = mapStrategy;
    return this;
  }

  drawAllRoutes(dispatcher: Function = () => {}) {
    this.routes.forEach((route) => {
      route.draw(this.mapStrategy, () => {
        dispatcher(route);
      });
    });
  }

  deleteRoute(route: Route, mapStrategy: MapStrategy) {
    route.remove(mapStrategy);
    this.routes = this.routes.filter((r) => r !== route);
    this.drawAllRoutes();
  }

  addRoute(route: IRoute, mapStrategy: MapStrategy, onDeleted = () => {}) {
    // route.remove(mapStrategy);
    this.routes.push(route);
    this.drawAllRoutes(onDeleted);
  }

  updateRoute(
    routeId: string,
    newRoute: IRoute,
    mapStrategy: MapStrategy,
    onUpdated = () => {}
  ) {
    const route = this.routes.find((r) => r.id === routeId);
    if (route) {
      route.update(newRoute);
      route.draw(mapStrategy, onUpdated);
    }
  }

  updateRoutes(routes: IRoute[]): RouteManager {
    this.routes = routes;
    return this;
  }

  renameRoute(route: Route, name: string) {
    route.setName(name);
  }

  update(data: any): void {
    if (data instanceof Waypoint) {
      this.drawAllRoutes();
    }
  }

  getRoutes(): IRoute[] {
    return this.routes;
  }
}
