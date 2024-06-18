import { Navigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/authFeature/authSelector';

export const ProtectedRoutes = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};
ProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
