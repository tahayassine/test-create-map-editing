import React from 'react';
import Sidebar from './Sidebar';
import RouteList from './RouteList';
import { IRoute } from '../domain/Route';

const routes: IRoute[] = [
  // Ajoutez vos routes ici
];

const MainPage: React.FC = () => {
  const handleEdit = (index: number) => {
    console.log('Edit route at index:', index);
  };

  const handleDelete = (index: number) => {
    console.log('Delete route at index:', index);
  };

  return (
    <div className="flex">
      <Sidebar>
        <RouteList
          routes={routes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Sidebar>
      <div className="flex-1 p-4 ml-64">
        <h1 className="text-3xl font-bold mb-4">Main Content</h1>
        <p>This is the main content area.</p>
      </div>
    </div>
  );
};

export default MainPage;
