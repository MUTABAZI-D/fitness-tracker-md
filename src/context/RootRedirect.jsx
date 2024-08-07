import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/authFeature/authSelector';

export const RootRedirect = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? (
    <Navigate to="/home" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};
