import { MapStrategy } from './MapStrategy';

export default interface Drawer {
  sourceId: string;
  layerId: string;
  marker: any;
  draw(mapStrategy: MapStrategy): void;
  remove(mapStrategy: MapStrategy): void;
}
