import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  FileText, 
  Upload, 
  LineChart, 
  Settings 
} from 'lucide-react';
import { useAuth } from '../../lib/authContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <aside className="h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="bg-primary-500 text-white p-2 rounded-lg">
          <LineChart size={24} />
        </div>
        <h1 className="text-xl font-bold text-primary-700">FarmSawa</h1>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <NavLink 
          to="/" 
          className={`sidebar-link ${isActive('/') ? 'active' : ''}`}
          end
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/users" 
          className={`sidebar-link ${isActive('/users') ? 'active' : ''}`}
        >
          <Users size={20} />
          <span>Users</span>
        </NavLink>
        
        <NavLink 
          to="/suppliers" 
          className={`sidebar-link ${isActive('/suppliers') ? 'active' : ''}`}
        >
          <Store size={20} />
          <span>Suppliers</span>
        </NavLink>
        
        <NavLink 
          to="/transactions" 
          className={`sidebar-link ${isActive('/transactions') ? 'active' : ''}`}
        >
          <FileText size={20} />
          <span>Transactions</span>
        </NavLink>
        
        <NavLink 
          to="/gpt-upload" 
          className={`sidebar-link ${isActive('/gpt-upload') ? 'active' : ''}`}
        >
          <Upload size={20} />
          <span>GPT Upload</span>
        </NavLink>
        
        <NavLink 
          to="/market-prices" 
          className={`sidebar-link ${isActive('/market-prices') ? 'active' : ''}`}
        >
          <LineChart size={20} />
          <span>Market Prices</span>
        </NavLink>
        
        <NavLink 
          to="/settings" 
          className={`sidebar-link ${isActive('/settings') ? 'active' : ''}`}
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>
      
      {/* Bottom section */}
      <div className="p-4 border-t border-gray-200">
        <button 
          onClick={() => signOut()}
          className="w-full btn btn-secondary"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;