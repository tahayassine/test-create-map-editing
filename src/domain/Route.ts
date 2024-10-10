import Drawer from './Drawer';
import { MapStrategy } from './MapStrategy';
import Waypoint, { IWaypoint, WaypointStyle } from './Waypoint';
import { Way } from './types';

export interface IRoute {
  waypoints: IWaypoint[];
  name: string;
  id: string;
  addWaypoint(waypoint: IWaypoint): void;
  deleteWaypoint(waypoint: IWaypoint): void;
  getName(): string;
  setName(name: string): void;
  getWaypoint(index: number): IWaypoint;
  onWaypointUpdated(Waypoint: IWaypoint, callback: () => void): void;
  draw(mapStrategy: MapStrategy, callback: () => void): void;
  update(newRoute: IRoute): void;
}

class Route implements IRoute, Drawer, Way {
  waypoints: IWaypoint[];
  public sourceId: string;
  public layerId: string;
  private isDrawn: boolean = false;
  marker: any;
  name: string = '';
  id = '';

  constructor(waypoints: Waypoint[], name: string) {
    if (waypoints.length < 2) {
      throw new Error('Route must have at least 2 waypoints');
    }
    this.waypoints = waypoints;
    this.name = name;
    this.id = `${String(Math.random())}-route`;
    this.sourceId = `${this.id}-source`;
    this.layerId = `${this.id}-layer`;
  }

  onWaypointUpdated(Waypoint: IWaypoint, callback: () => void): void {
    callback();
  }

  getWaypoint(index: number): IWaypoint {
    return this.waypoints[index];
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getId(): string {
    return this.id;
  }

  getSourceId(): string {
    return this.sourceId;
  }

  getLayerId(): string {
    return this.layerId;
  }

  remove(mapStrategy: MapStrategy): void {
    if (!mapStrategy) {
      throw new Error('MapStrategy is required');
    }
    mapStrategy.removeRoute(this);
    this.isDrawn = false;
  }

  draw(mapStrategy: MapStrategy, onRouteUpdated = () => {}) {
    if (!mapStrategy) {
      throw new Error('MapStrategy is required');
    }
    if (!this.isDrawn) {
      mapStrategy.addRoute(this);
      this.waypoints.forEach((waypoint, k) => {
        return waypoint.draw(
          k === 0
            ? WaypointStyle.START
            : k === this.waypoints.length - 1
            ? WaypointStyle.END
            : WaypointStyle.INTERMEDIATE,
          mapStrategy,
          () => {
            this.onWaypointUpdated(waypoint, () => {
              this.draw(mapStrategy);
              onRouteUpdated();
            });
          }
        );
      });

      this.isDrawn = true;
    } else {
      onRouteUpdated();
      mapStrategy.updateRoute(this);
    }
  }

  getGeoJSON(): any {
    return {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: this.waypoints.map((point) => [point.lng, point.lat]),
      },
    };
  }

  addWaypoint(waypoint: IWaypoint) {
    this.waypoints.push(
      new Waypoint(
        {
          ...waypoint.getCoordinates(),
        },
        waypoint.getId()
      )
    );
    console.log('waypoints', this.waypoints);
  }

  update(newRoute: IRoute) {
    this.waypoints = newRoute.waypoints;
    this.name = newRoute.name;
  }

  deleteWaypoint(waypoint: Waypoint) {
    this.waypoints = this.waypoints.filter((w) => w !== waypoint);
  }
}

export default Route;
