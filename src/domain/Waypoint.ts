import { MapStrategy } from './MapStrategy';
import { Observable } from './Observable';
import { Point } from './types';

//enum
export enum WaypointStyle {
  START = 'START',
  END = 'END',
  INTERMEDIATE = 'INTERMEDIATE',
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface IWaypoint {
  lat: number;
  lng: number;
  id: string;

  edit(lat: number, lng: number): void;

  getCoordinates(): Coordinates;
  getId(): string;
  draw(
    style: WaypointStyle,
    mapStrategy: MapStrategy,
    onPositionChange: () => void
  ): void;
  getMarker(): any;
}

class Waypoint extends Observable implements IWaypoint, Point {
  lat: number;
  lng: number;
  id: string;

  private marker: any;

  constructor({ lat, lng }: Coordinates, id: string = '') {
    super();
    this.lat = lat;
    this.lng = lng;
    this.id = id || `${lat},${lng}`;
  }

  edit(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }

  getCoordinates(): Coordinates {
    return { lng: this.lng, lat: this.lat };
  }

  getCoordinatesAsArray(): [number, number] {
    return [this.lng, this.lat];
  }

  draw(
    style: WaypointStyle = WaypointStyle.INTERMEDIATE,
    mapStrategy: MapStrategy,
    onPositionChange = () => {}
  ) {
    if (!mapStrategy) {
      throw new Error('MapStrategy is required');
    }
    this.marker = mapStrategy.addMarker(this, style);
    mapStrategy.onUpdateWaypoint(this);
    this.listenEvents(onPositionChange);
  }

  remove(mapStrategy: MapStrategy) {
    if (!mapStrategy) {
      throw new Error('MapStrategy is required');
    }
    mapStrategy.removeMarker(this.marker);
  }

  getId() {
    return this.id;
  }

  private listenEvents(callback: () => void) {
    this.marker.on('drag', () => {
      this.onDrag();
      callback();
    });
  }

  private onDrag() {
    const lngLat = this.marker.getLngLat();
    this.lng = lngLat.lng;
    this.lat = lngLat.lat;
  }

  getMarker() {
    return this.marker;
  }
}

export default Waypoint;
