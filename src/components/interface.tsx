import { useEffect, useState } from 'react';
import Header from './Header';
import RouteList from './RouteList';
import Route, { IRoute } from '../domain/Route';
import AddButton from './AddButton';
import { useGetRoutesQuery } from '../apiRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import RouteStep from './RouteStep';
import SaveButton from './SaveButton';
import { Save } from 'lucide-react';
import Waypoint, { IWaypoint } from '../domain/Waypoint';
import { setRoutes, updateRoute } from '../slices/routeSlice';
import RouteManager from '../domain/RouteManager';

interface InterfaceUIProps {}

const InterfaceUI: React.FC<InterfaceUIProps> = ({}) => {
  const [currentRoute, setCurrentRoute] = useState<IRoute | undefined>();
  // const { data: routes, isSuccess, isLoading } = useGetRoutesQuery({});
  const { routes, isLoading } = useSelector((state: RootState) => state.routes);
  const [newWaypoints, setNewWaypoints] = useState<IWaypoint[]>([]);
  const dispatch = useDispatch();
  const routesManager: RouteManager | null = useSelector(
    (state: RootState) => state.routes.routesManager
  );

  const addNewRoute = () => {
    // Logic to add a new route
  };

  const editRoute = (index: number) => {
    // Logic to edit a route
    if (routes) {
      setCurrentRoute(routes[index]);
    }
  };

  const deleteRoute = (index: number) => {
    if (routes) {
      const route = routes[index];
      // route?.remove(mapStrategy);
      routes.splice(index, 1);
    }
  };

  const addNewStep = () => {
    // Logic to add a new step to the current route
    // currentRoute?.addWaypoint();
    // currentRoute?.draw(mapStrategy);
  };

  const deleteStep = (index: number) => {
    console.log('delete step', index);
    if (currentRoute === undefined) {
      return;
    }
    currentRoute.deleteWaypoint(currentRoute.getWaypoint(index));
    // currentRoute.draw(mapStrategy);
  };

  const addNewWaypoint = (newWaypoint: IWaypoint) => {
    currentRoute?.addWaypoint(newWaypoint);
    routesManager;
  };

  const saveRouteCurrentRoute = () => {
    console.log('hello');
    if (currentRoute !== undefined) {
      dispatch(updateRoute(currentRoute as Route));
    }
  };

  useEffect(() => {
    if (currentRoute) {
      // currentRoute.draw(mapStrategy);
    }
  }, [currentRoute, routes, isLoading]);

  return (
    <div className="h-screen text-white bg-gray-900">
      {(isLoading && <p>Loading...</p>) || (
        <div>
          <Header
            title={currentRoute?.name || 'Routes'}
            handleback={() => {
              setCurrentRoute(undefined);
              setNewWaypoints([]);
            }}
            backable={currentRoute != undefined}
          />

          {currentRoute === undefined ? (
            <>
              <RouteList
                routes={routes || []}
                onEdit={editRoute}
                onDelete={(index) => console.log('delete route', index)}
              />
              <AddButton onClick={addNewRoute} text="Add new route" />
            </>
          ) : (
            <div className="m-1">
              {currentRoute.waypoints.map((step, index) => (
                <RouteStep
                  key={index}
                  id={index}
                  lat={step.getCoordinates().lat}
                  long={step.getCoordinates().lng}
                  onDelete={() => deleteStep(index)}
                  onSave={() =>
                    console.log('coucou currentRoute', currentRoute)
                  }
                  isNew={false}
                />
              ))}
              {newWaypoints.map((step, index) => (
                <RouteStep
                  key={index}
                  id={index}
                  lat={step.getCoordinates().lat}
                  long={step.getCoordinates().lng}
                  onDelete={() => deleteStep(index)}
                  onSave={(lat: number, lng: number) => {
                    const newWaypoint = new Waypoint(
                      {
                        lat: lat,
                        lng: lng,
                      },
                      index.toString()
                    );

                    currentRoute?.addWaypoint(newWaypoint);
                    if (routesManager) {
                      newWaypoint.draw(
                        undefined,
                        routesManager.getMapStrategy()
                      );
                    }
                  }}
                  isNew={step.getMarker() === null}
                />
              ))}

              <SaveButton
                onClick={saveRouteCurrentRoute}
                text="Save modification"
              />
              <AddButton
                onClick={() =>
                  setNewWaypoints([
                    ...newWaypoints,
                    new Waypoint(
                      {
                        lng: 0,
                        lat: 0,
                      },
                      (currentRoute.waypoints.length + 1).toString()
                    ),
                  ])
                }
                text="Add new waypoint"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InterfaceUI;
