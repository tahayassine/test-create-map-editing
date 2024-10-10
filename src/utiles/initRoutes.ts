import { MapStrategy } from '../domain/MapStrategy';
import Route from '../domain/Route';
import Waypoint from '../domain/Waypoint';

export default function initRoutes(mapbox: MapStrategy | null): Route[] {
  const p1 = new Waypoint(
    {
      lng: 39.18,
      lat: -76.52,
    },
    mapbox,
    'waypoint-2'
  );
  const p2 = new Waypoint(
    {
      lat: 39.18,
      lng: -76.52,
    },
    mapbox,
    'waypoint-1'
  );
  const p3 = new Waypoint(
    {
      lat: 39.2,
      lng: -76.52,
    },
    mapbox,
    'waypoint-3'
  );
  const p4 = new Waypoint(
    {
      lat: 39.21,
      lng: -76.52,
    },
    mapbox,
    'waypoint-4'
  );
  const p5 = new Waypoint(
    {
      lat: 39.22,
      lng: -76.52,
    },
    mapbox,
    'waypoint-5'
  );
  const p6 = new Waypoint(
    {
      lat: 39.23,
      lng: -76.52,
    },
    mapbox,
    'waypoint-6'
  );

  // const p3 = new Waypoint(-76.52, 39.2, mapbox);
  // const p4 = new Waypoint(-76.52, 39.21, mapbox);
  // const p5 = new Waypoint(-76.52, 39.22, mapbox);
  // const p6 = new Waypoint(-76.52, 39.23, mapbox);
  // const p7 = new Waypoint(-76.52, 39.18, mapbox);

  const r1 = new Route([p1, p2, p3], 'route-1', mapbox);
  const r2 = new Route([p4, p5, p6], 'route-2', mapbox);

  return [r1, r2];
}
