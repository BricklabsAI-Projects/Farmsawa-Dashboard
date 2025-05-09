import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-6">
      <div className="text-center">
        <div className="flex justify-center">
          <div className="bg-white p-4 rounded-full shadow-md">
            <Leaf className="h-16 w-16 text-primary-500" />
          </div>
        </div>
        
        <h1 className="mt-8 text-6xl font-bold text-primary-800">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-800">Page Not Found</h2>
        <p className="mt-2 text-xl text-gray-600">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="mt-8">
          <Link to="/" className="btn btn-primary inline-flex items-center">
            <Home className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;