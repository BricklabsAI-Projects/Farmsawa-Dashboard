import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './lib/authContext';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Users from './pages/Users';
import Suppliers from './pages/Suppliers';
import Transactions from './pages/Transactions';
import GptUpload from './pages/GptUpload';
import MarketPrices from './pages/MarketPrices';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// Layout components
import DashboardLayout from './components/layout/DashboardLayout';

// Protected route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-16 w-16 bg-primary-300 rounded-full"></div>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#333',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
              borderRadius: '0.5rem',
              padding: '0.75rem 1rem',
            },
            success: {
              icon: '✅',
              style: {
                border: '1px solid #4CAF50',
              },
            },
            error: {
              icon: '❌',
              style: {
                border: '1px solid #F44336',
              },
            },
          }}
        />
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="gpt-upload" element={<GptUpload />} />
            <Route path="market-prices" element={<MarketPrices />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;