import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { useAuth } from '../lib/authContext';
import { demoCredentials } from '../lib/mockData';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState(demoCredentials.email);
  const [password, setPassword] = useState(demoCredentials.password);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  
  const navigate = useNavigate();
  const { signIn, signUp, user } = useAuth();
  
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isSignUp) {
        const { data, error } = await signUp(email, password);
        
        if (error) throw new Error(error.message);
        
        if (data?.user) {
          toast.success('Account created! You can now log in.');
          setIsSignUp(false);
        }
      } else {
        const { data, error } = await signIn(email, password);
        
        if (error) throw new Error(error.message);
        
        if (data) {
          toast.success('Logged in successfully!');
          navigate('/');
        }
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4">
      <div className="bg-white rounded-xl shadow-card w-full max-w-md overflow-hidden animate-fade-in">
        <div className="bg-primary-500 p-6 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="bg-white p-3 rounded-full">
              <Leaf className="h-8 w-8 text-primary-500" />
            </div>
            <h1 className="mt-4 text-xl font-bold text-white">FarmSawa Admin</h1>
            <p className="text-primary-100 mt-1">WhatsApp Chatbot Management</p>
          </div>
        </div>
        
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {isSignUp ? 'Create an Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-600 mt-1">
            {isSignUp ? 'Create your admin account to get started' : 'Sign in to your admin account'}
          </p>
          
          {/* Demo credentials notice */}
          <div className="mt-4 p-3 bg-primary-50 text-primary-700 rounded-lg text-sm">
            <strong>Demo Credentials:</strong>
            <div>Email: {demoCredentials.email}</div>
            <div>Password: {demoCredentials.password}</div>
          </div>
          
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input w-full"
                required
              />
            </div>
            
            {!isSignUp && (
              <div className="flex justify-end">
                <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
                  Forgot password?
                </a>
              </div>
            )}
            
            <button
              type="submit"
              className="btn btn-primary w-full flex justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                isSignUp ? 'Create Account' : 'Sign In'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;