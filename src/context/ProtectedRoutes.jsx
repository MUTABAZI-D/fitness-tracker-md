import { Navigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  selectIsAuthChecked,
  selectIsAuthenticated,
} from '../store/authFeature/authSelector';
import { CircularProgress } from '@mui/material';

export const ProtectedRoutes = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  if (!isAuthChecked) {
    return <CircularProgress sx={{ textAlign: 'center' }} />;
  } else {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  }
};
ProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
