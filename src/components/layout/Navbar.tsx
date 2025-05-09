import React from 'react';
import { Bell, Menu, User } from 'lucide-react';
import { useAuth } from '../../lib/authContext';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { user } = useAuth();
  
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button 
              type="button"
              className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">
                Admin Dashboard
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full">
              <span className="sr-only">View notifications</span>
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-primary-500 ring-2 ring-white"></span>
            </button>
            
            <div className="ml-3 relative flex items-center gap-3">
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-700">
                  {user?.email?.split('@')[0] || 'Admin'}
                </p>
                <p className="text-xs text-gray-500">
                  Administrator
                </p>
              </div>
              <div className="h-9 w-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                <User size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;