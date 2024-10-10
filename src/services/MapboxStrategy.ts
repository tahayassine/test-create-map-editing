// src/strategies/MapboxStrategy.ts
import mapboxgl from 'mapbox-gl';
import { MapStrategy } from '../domain/MapStrategy';
import Waypoint, { WaypointStyle } from '../domain/Waypoint';
import Route from '../domain/Route';

export class MapboxStrategy implements MapStrategy {
  private map: mapboxgl.Map;

  constructor(map: mapboxgl.Map) {
    this.map = map;
  }

  onUpdateWaypoint(waypoint: Waypoint): void {}

  addRoute(route: Route): void {
    this.map.addSource(route.getSourceId(), {
      type: 'geojson',
      data: route.getGeoJSON(),
    });
    this.map.addLayer({
      id: route.getLayerId(),
      type: 'line',
      source: route.getSourceId(),
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#888',
        'line-width': 8,
      },
    });
  }

  removeMarker(marker: any): void {
    if (marker) {
      marker.remove();
    }
  }

  removeRoute(route: Route): void {
    this.map.removeLayer(route.getLayerId());
    this.map.removeSource(route.getSourceId());
    for (const waypoint of route.waypoints) {
      this.removeMarker(waypoint.getMarker());
    }
  }

  addMarker(waypoint: Waypoint, markerStyle: WaypointStyle): mapboxgl.Marker {
    const el = document.createElement('div');
    el.className = 'marker ';

    if (markerStyle == WaypointStyle.START) {
      el.classList.add('marker-start');
    } else if (markerStyle == WaypointStyle.END) {
      el.classList.add('marker-end');
    }

    return new mapboxgl.Marker(el, {
      draggable: true,
    })
      .setLngLat(waypoint.getCoordinatesAsArray())
      .addTo(this.map);
  }

  removeLayer(id: string) {
    if (this.map.getLayer(id)) {
      this.map.removeLayer(id);
    }
    if (this.map.getSource(id)) {
      this.map.removeSource(id);
    }
  }

  updateSource(id: string, data: any) {
    let src = this.map.getSource(id);
    if (src) {
      (src as mapboxgl.GeoJSONSource).setData(data);
    } else {
      this.map.addSource(id, {
        type: 'geojson',
        data: data,
      });
    }
  }

  getLayer(id: string) {
    return this.map.getLayer(id);
  }

  getLayerSource(id: string) {
    return this.map.getSource(id);
  }

  updateRoute(route: Route): void {
    if (this.map.getSource(route.getSourceId())) {
      this.updateSource(route.getSourceId(), route.getGeoJSON());
    }
  }
}
