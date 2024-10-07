import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectIsAuthenticated,
  selectIsLoading,
} from '../store/authFeature/authSelector';
import { CircularProgress } from '@mui/material';

export const ProtectedRoutes = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);

  if (isLoading) {
    return <CircularProgress />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
