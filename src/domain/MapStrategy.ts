import Route from './Route';
import { WaypointStyle } from './Waypoint';
import Waypoint from './Waypoint';

export interface MapStrategy {
  addMarker(Waypoint: Waypoint, waypointStyle: WaypointStyle): any;
  removeMarker(marker: any): void;
  addRoute(route: Route): void;
  removeLayer(id: string): void;
  removeRoute(route: Route): void;
  updateRoute(route: Route): void;
  onUpdateWaypoint: (waypoint: Waypoint) => void;
}
