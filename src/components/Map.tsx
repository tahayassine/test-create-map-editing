// map compentent

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapboxStrategy } from '../services/MapboxStrategy';
import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import InterfaceUI from './interface';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { useGetRoutesQuery } from '../apiRoutes';
import RouteManager from '../domain/RouteManager';
import Sidebar from './Sidebar';
import { setRoutes, setRoutesManager, updateRoute } from '../slices/routeSlice';
import { IRoute } from '../domain/Route';

const INITIAL_CENTER: [number, number] = [-74.015974, 40.712776];
const INITIAL_ZOOM = 10.12;
const ACCESS_TOKEN =
  'pk.eyJ1IjoidHlhc3NpbmUiLCJhIjoiY20xb3dpOWJuMTVlOTJxcXY3MWU3c2pudyJ9.LOA4DpdGdDJz3y2GZuRWsQ';

const Map: React.FC = () => {
  const [mapbox, setMapbox] = useState<MapboxStrategy | null>(null);
  const mapRef = useRef<mapboxgl.Map>();
  const mapContainer = useRef<HTMLDivElement>(null);
  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const dispatch = useDispatch<AppDispatch>();
  const { routes, isLoading } = useSelector((state: RootState) => state.routes);
  const [localRoutes, setLocalRoutes] = useState(routes);
  const routesManager: RouteManager | null = useSelector(
    (state: RootState) => state.routes.routesManager
  );

  // console.log('frst routes2', routes2);

  useEffect(() => {
    setLocalRoutes(routes);
  }, [routes]);

  useGetRoutesQuery({});

  mapboxgl.accessToken = ACCESS_TOKEN;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: center,
      zoom: zoom,
      interactive: true,
      projection: 'globe',
    });

    mapRef.current = map;
    setMapbox(new MapboxStrategy(mapRef.current));

    mapRef.current?.on('load', function () {
      mapRef.current?.setFog({});
      // ADD drowing
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (routesManager == null && routes && mapbox) {
      console.log('set routes manager', routes, mapbox);
      dispatch(setRoutesManager(new RouteManager(routes, mapbox)));
    }

    if (routesManager !== null && routesManager instanceof RouteManager) {
      console.log('draw all routes', routesManager);
      routesManager.drawAllRoutes((route: IRoute) => {
        dispatch(updateRoute(route));
      });
    }
  }, [routes, mapbox]);

  return (
    <>
      <Sidebar>
        <InterfaceUI />
      </Sidebar>
      <div id="map-container" ref={mapContainer} />
    </>
  );
};

export default Map;
