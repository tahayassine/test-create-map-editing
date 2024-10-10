import { Waypoint } from 'src/waypoints/entities/waypoint.entity';

export class Route {
  id: string;
  name: string;
  waypoints: Waypoint[];
}
