import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectIsAuthChecked,
  selectIsAuthenticated,
} from '../store/authFeature/authSelector';
import { CircularProgress } from '@mui/material';

export const ProtectedRoutes = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  if (!isAuthChecked) {
    return <CircularProgress />;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
