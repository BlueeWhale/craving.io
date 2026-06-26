import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, hasRole } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-slate-200 border-t-brand-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    // Forward user out to login but preserve entry intent context parameters
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !hasRole(allowedRoles)) {
    // Session lacks specified clearances
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;