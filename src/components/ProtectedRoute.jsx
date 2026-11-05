import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({children}) => {
  
  const isAuthenticated = Boolean(localStorage.getItem('token')); 

  return isAuthenticated ? children  : <Navigate to="/login" replace />;
};