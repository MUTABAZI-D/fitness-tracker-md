import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout, setIsLoading } from '../store/authFeature/authSlice.js';

export const AuthSync = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(login());
    }
    dispatch(setIsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'token') {
        if (event.newValue) {
          dispatch(login());
        } else {
          dispatch(logout());
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [dispatch]);

  return null;
};
