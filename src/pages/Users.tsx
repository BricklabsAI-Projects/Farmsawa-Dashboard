import React, { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { mockUsers } from '../lib/mockData';
import { UserProfile } from '../lib/supabase';

const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  
  // Get unique regions from user data
  const regions = Array.from(new Set(mockUsers.map(user => user.region)));
  
  // Filter users based on search term and selected region
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.phone_number.includes(searchTerm);
    
    const matchesRegion = selectedRegion === '' || user.region === selectedRegion;
    
    return matchesSearch && matchesRegion;
  });
  
  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        
        <button className="btn btn-primary flex items-center gap-2">
          <Download size={16} />
          <span>Export</span>
        </button>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10 w-full"
            placeholder="Search by name or phone..."
          />
        </div>
        
        <div className="md:w-64">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="input pl-10 w-full appearance-none"
            >
              <option value="">All Regions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Users table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header text-left">Name</th>
                <th className="table-header text-left">Phone Number</th>
                <th className="table-header text-left">Region</th>
                <th className="table-header text-left">Crops</th>
                <th className="table-header text-center">Farmer Status</th>
                <th className="table-header text-right">Registered On</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user: UserProfile) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="table-cell font-medium text-gray-900">{user.name}</td>
                    <td className="table-cell">{user.phone_number}</td>
                    <td className="table-cell">
                      {user.region}, {user.location}
                    </td>
                    <td className="table-cell">
                      <div className="flex flex-wrap gap-1">
                        {user.crops.map((crop, index) => (
                          <span 
                            key={index}
                            className="inline-block text-xs py-0.5 px-2 bg-primary-50 text-primary-700 rounded-full"
                          >
                            {crop}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="table-cell text-center">
                      {user.is_farmer ? (
                        <span className="badge badge-success">Farmer</span>
                      ) : (
                        <span className="badge bg-neutral-100 text-neutral-600">Non-Farmer</span>
                      )}
                    </td>
                    <td className="table-cell text-right text-gray-500">
                      {formatDate(user.created_at)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    No users found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;