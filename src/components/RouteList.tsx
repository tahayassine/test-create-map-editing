import { Edit, Trash } from 'lucide-react';
import Route, { IRoute } from '../domain/Route';

interface RouteListProps {
  routes: IRoute[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const RouteList: React.FC<RouteListProps> = ({ routes, onEdit, onDelete }) => (
  <div className="mt-4">
    {routes.map((route, index) => (
      <div
        key={index}
        className="flex items-center justify-between p-7 border-b border-gray-700"
      >
        <span className="text-white">{route.getName()}</span>
        <div>
          <button
            onClick={() => onEdit(index)}
            className="mr-2 text-gray-400 hover:text-white"
          >
            <Edit size={20} />
          </button>
          <button
            onClick={() => onDelete(index)}
            className="text-gray-400 hover:text-white"
          >
            <Trash size={20} />
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default RouteList;
