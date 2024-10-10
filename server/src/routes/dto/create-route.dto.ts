export class CreateRouteDto {
  name: string;
  waypoints: {
    name: string;
    lat: number;
    lng: number;
  }[];
}
