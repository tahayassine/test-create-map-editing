export type Point = {
  id: string;
  lat: number;
  lng: number;
};

export type Way = {
  id: string;
  name: string;
  waypoints: Point[];
};
