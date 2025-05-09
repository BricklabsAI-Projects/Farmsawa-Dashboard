import React, { useState } from 'react';
import { User, Mail, Lock, Bell, Globe, Smartphone, Users } from 'lucide-react';
import { mockAdmins } from '../lib/mockData';
import toast from 'react-hot-toast';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile settings state
  const [profileSettings, setProfileSettings] = useState({
    name: 'Admin User',
    email: 'admin@farmsawa.com',
    phone: '+254712345678',
  });
  
  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    priceUpdates: true,
    newUsers: true,
    newOrders: true,
    systemUpdates: false,
  });
  
  // API settings state
  const [apiSettings, setApiSettings] = useState({
    weatherApiKey: 'wth_ap1k3y123456789',
    deepLeafApiKey: '••••••••••••••••',
    whatsappBusinessId: 'wa_12345abcde',
  });
  
  // Handle profile update
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile settings updated successfully');
  };
  
  // Handle notification settings update
  const handleNotificationUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Notification preferences updated successfully');
  };
  
  // Handle API settings update
  const handleApiUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('API settings updated successfully');
  };
  
  // Handle password change
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Password changed successfully');
  };
  
  // Toggle notification setting
  const toggleNotification = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings navigation */}
        <div className="md:w-64 shrink-0">
          <div className="card">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                  activeTab === 'profile'
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <User className="mr-3 h-5 w-5" />
                <span>Profile Settings</span>
              </button>
              
              <button
                onClick={() => setActiveTab('password')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                  activeTab === 'password'
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Lock className="mr-3 h-5 w-5" />
                <span>Change Password</span>
              </button>
              
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                  activeTab === 'notifications'
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Bell className="mr-3 h-5 w-5" />
                <span>Notifications</span>
              </button>
              
              <button
                onClick={() => setActiveTab('api')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                  activeTab === 'api'
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Globe className="mr-3 h-5 w-5" />
                <span>API Settings</span>
              </button>

              <button
                onClick={() => setActiveTab('admins')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                  activeTab === 'admins'
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Users className="mr-3 h-5 w-5" />
                <span>Manage Admins</span>
              </button>
            </nav>
          </div>
        </div>
        
        {/* Settings content */}
        <div className="flex-1">
          <div className="card">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-lg font-bold mb-4">Profile Settings</h2>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        value={profileSettings.name}
                        onChange={(e) => setProfileSettings({ ...profileSettings, name: e.target.value })}
                        className="input pl-10 w-full"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        value={profileSettings.email}
                        onChange={(e) => setProfileSettings({ ...profileSettings, email: e.target.value })}
                        className="input pl-10 w-full"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Smartphone size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        value={profileSettings.phone}
                        onChange={(e) => setProfileSettings({ ...profileSettings, phone: e.target.value })}
                        className="input pl-10 w-full"
                        placeholder="+254XXXXXXXXX"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Password Change */}
            {activeTab === 'password' && (
              <div>
                <h2 className="text-lg font-bold mb-4">Change Password</h2>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="current-password"
                        className="input pl-10 w-full"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="new-password"
                        className="input pl-10 w-full"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="confirm-password"
                        className="input pl-10 w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button type="submit" className="btn btn-primary">
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-lg font-bold mb-4">Notification Preferences</h2>
                <form onSubmit={handleNotificationUpdate} className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">Email Alerts</h3>
                        <p className="text-xs text-gray-500">Receive alerts via email</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleNotification('emailAlerts')}
                        className={`
                          relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full
                          cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none
                          ${notificationSettings.emailAlerts ? 'bg-primary-500' : 'bg-gray-200'}
                        `}
                      >
                        <span
                          className={`
                            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow
                            transform ring-0 transition ease-in-out duration-200
                            ${notificationSettings.emailAlerts ? 'translate-x-5' : 'translate-x-0'}
                          `}
                        />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">Price Updates</h3>
                        <p className="text-xs text-gray-500">Get notified when market prices change</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleNotification('priceUpdates')}
                        className={`
                          relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full
                          cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none
                          ${notificationSettings.priceUpdates ? 'bg-primary-500' : 'bg-gray-200'}
                        `}
                      >
                        <span
                          className={`
                            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow
                            transform ring-0 transition ease-in-out duration-200
                            ${notificationSettings.priceUpdates ? 'translate-x-5' : 'translate-x-0'}
                          `}
                        />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">New User Registrations</h3>
                        <p className="text-xs text-gray-500">Get notified when new users register</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleNotification('newUsers')}
                        className={`
                          relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full
                          cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none
                          ${notificationSettings.newUsers ? 'bg-primary-500' : 'bg-gray-200'}
                        `}
                      >
                        <span
                          className={`
                            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow
                            transform ring-0 transition ease-in-out duration-200
                            ${notificationSettings.newUsers ? 'translate-x-5' : 'translate-x-0'}
                          `}
                        />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">New Orders</h3>
                        <p className="text-xs text-gray-500">Get notified about new orders</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleNotification('newOrders')}
                        className={`
                          relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full
                          cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none
                          ${notificationSettings.newOrders ? 'bg-primary-500' : 'bg-gray-200'}
                        `}
                      >
                        <span
                          className={`
                            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow
                            transform ring-0 transition ease-in-out duration-200
                            ${notificationSettings.newOrders ? 'translate-x-5' : 'translate-x-0'}
                          `}
                        />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">System Updates</h3>
                        <p className="text-xs text-gray-500">Get notified about system updates</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleNotification('systemUpdates')}
                        className={`
                          relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full
                          cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none
                          ${notificationSettings.systemUpdates ? 'bg-primary-500' : 'bg-gray-200'}
                        `}
                      >
                        <span
                          className={`
                            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow
                            transform ring-0 transition ease-in-out duration-200
                            ${notificationSettings.systemUpdates ? 'translate-x-5' : 'translate-x-0'}
                          `}
                        />
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button type="submit" className="btn btn-primary">
                      Save Preferences
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* API Settings */}
            {activeTab === 'api' && (
              <div>
                <h2 className="text-lg font-bold mb-4">API Integration Settings</h2>
                <form onSubmit={handleApiUpdate} className="space-y-4">
                  <div>
                    <label htmlFor="weather-api" className="block text-sm font-medium text-gray-700 mb-1">
                      Weather API Key
                    </label>
                    <input
                      type="text"
                      id="weather-api"
                      value={apiSettings.weatherApiKey}
                      onChange={(e) => setApiSettings({ ...apiSettings, weatherApiKey: e.target.value })}
                      className="input w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Used for weather forecasts and alerts. Get from <a href="#" className="text-primary-600 hover:underline">Tomorrow.io</a>
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="deepleaf-api" className="block text-sm font-medium text-gray-700 mb-1">
                      DeepLeaf API Key
                    </label>
                    <input
                      type="password"
                      id="deepleaf-api"
                      value={apiSettings.deepLeafApiKey}
                      onChange={(e) => setApiSettings({ ...apiSettings, deepLeafApiKey: e.target.value })}
                      className="input w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Used for crop disease detection. <a href="#" className="text-primary-600 hover:underline">Get API key</a>
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="whatsapp-id" className="block text-sm font-medium text-gray-700 mb-1">
                      WhatsApp Business ID
                    </label>
                    <input
                      type="text"
                      id="whatsapp-id"
                      value={apiSettings.whatsappBusinessId}
                      onChange={(e) => setApiSettings({ ...apiSettings, whatsappBusinessId: e.target.value })}
                      className="input w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Your WhatsApp Business API account ID
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <button type="submit" className="btn btn-primary">
                      Save API Settings
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Admins Settings */}
            {activeTab === 'admins' && (
              <div>
                <h2 className="text-lg font-bold mb-4">Manage Administrators</h2>
                
                <div className="space-y-4">
                  <button className="btn btn-primary w-full sm:w-auto">
                    Add New Admin
                  </button>
                  
                  <div className="mt-6">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Role
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {mockAdmins.map((admin) => (
                            <tr key={admin.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{admin.email}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  admin.role === 'super_admin' 
                                    ? 'bg-primary-100 text-primary-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button className="text-primary-600 hover:text-primary-900">
                                  Edit
                                </button>
                                <button className="ml-4 text-error-600 hover:text-error-900">
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;