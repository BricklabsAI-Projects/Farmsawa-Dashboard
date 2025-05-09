import React from 'react';
import { Users, Store, ShoppingBag, FileText } from 'lucide-react';

// Components
import StatCard from '../components/dashboard/StatCard';
import RequestsChart from '../components/dashboard/RequestsChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';

// Mock data
import { mockTransactions } from '../lib/mockData';
import { getStatistics, getChartData } from '../lib/mockData';

const Dashboard: React.FC = () => {
  const stats = getStatistics();
  const chartData = getChartData();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        
        <div className="flex gap-3">
          <button className="btn btn-secondary">
            Export Report
          </button>
          <button className="btn btn-primary">
            Refresh Data
          </button>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers.toLocaleString()} 
          icon={Users}
          color="primary"
          change={12}
        />
        <StatCard 
          title="Suppliers" 
          value={stats.totalSuppliers.toLocaleString()} 
          icon={Store}
          color="secondary"
          change={8}
        />
        <StatCard 
          title="Total Orders" 
          value={stats.transactionsByStatus.completed.toLocaleString()} 
          icon={ShoppingBag}
          color="success"
          change={15}
        />
        <StatCard 
          title="Total Requests" 
          value={stats.totalRequests.toLocaleString()}
          icon={FileText}
          color="warning"
          change={23}
        />
      </div>
      
      {/* Charts section */}
      <div className="grid grid-cols-1 gap-6">
        <RequestsChart data={chartData.dailyRequests} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Request types breakdown */}
          <div className="card lg:col-span-1">
            <h2 className="text-lg font-bold mb-4">Request Types</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Crop Diagnosis</span>
                  <span className="font-medium">{stats.requestsByType.crop_diagnosis}</span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-500 rounded-full" 
                    style={{ width: `${(stats.requestsByType.crop_diagnosis / stats.totalRequests) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Market Price</span>
                  <span className="font-medium">{stats.requestsByType.market_price}</span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-secondary-500 rounded-full" 
                    style={{ width: `${(stats.requestsByType.market_price / stats.totalRequests) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Advisory</span>
                  <span className="font-medium">{stats.requestsByType.advisory}</span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-success-500 rounded-full" 
                    style={{ width: `${(stats.requestsByType.advisory / stats.totalRequests) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Orders</span>
                  <span className="font-medium">{stats.requestsByType.order}</span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-warning-500 rounded-full" 
                    style={{ width: `${(stats.requestsByType.order / stats.totalRequests) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-neutral-200">
              <div className="flex justify-between">
                <span className="text-neutral-500">Total Requests</span>
                <span className="font-medium">{stats.totalRequests}</span>
              </div>
            </div>
          </div>
          
          {/* Transaction status */}
          <div className="card lg:col-span-2">
            <h2 className="text-lg font-bold mb-4">Sales Overview</h2>
            
            <div className="flex flex-col lg:flex-row gap-4 items-stretch">
              <div className="flex-1 flex flex-col justify-between bg-primary-50 rounded-lg p-4">
                <div>
                  <h3 className="text-sm font-medium text-neutral-500">Total Sales</h3>
                  <p className="text-2xl font-bold mt-1">KES {stats.totalSales.toLocaleString()}</p>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-primary-100">
                  <span className="text-sm text-neutral-600">This Month</span>
                  <span className="text-sm font-medium text-success-700">+18.3%</span>
                </div>
              </div>
              
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="bg-success-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-neutral-500">Completed</h3>
                  <p className="text-xl font-bold mt-1">{stats.transactionsByStatus.completed}</p>
                  <p className="text-xs mt-2 text-neutral-500">Orders completed</p>
                </div>
                
                <div className="bg-warning-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-neutral-500">Pending</h3>
                  <p className="text-xl font-bold mt-1">{stats.transactionsByStatus.pending}</p>
                  <p className="text-xs mt-2 text-neutral-500">Orders in progress</p>
                </div>
                
                <div className="col-span-2 bg-error-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-neutral-500">Cancelled</h3>
                  <p className="text-xl font-bold mt-1">{stats.transactionsByStatus.cancelled}</p>
                  <p className="text-xs mt-2 text-neutral-500">Orders cancelled</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent transactions */}
      <RecentTransactions transactions={mockTransactions} />
    </div>
  );
};

export default Dashboard;