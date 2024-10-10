import React from 'react';

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg z-10 opacity-90">
      {children}
    </div>
  );
};

export default Sidebar;
