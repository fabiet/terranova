import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'President' | 'Client';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && profile?.role !== requiredRole) {
    // Redirect based on actual role
    if (profile?.role === 'President') {
      return <Navigate to="/dashboard" replace />;
    } else if (profile?.role === 'Client') {
      return <Navigate to="/invoices" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;