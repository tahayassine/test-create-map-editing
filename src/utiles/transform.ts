import { Route, Waypoint } from '../domain/types';

export const transformRoute = (route: Route) => ({
  id: route.id,
  name: route.name,
  isDrawn: route.isDrawn,
  sourceId: route.sourceId,
  layerId: route.layerId,
  waypoints: route.waypoints.map(transformWaypoint),
});

export const transformWaypoint = (waypoint: Waypoint) => ({
  id: waypoint.id,
  name: waypoint.name,
  lat: waypoint.lat,
  lng: waypoint.lng,
});
