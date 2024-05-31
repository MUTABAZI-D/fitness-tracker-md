import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { HomePage } from './pages/HomePage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { ProtectedRoutes } from './context/ProtectedRoutes.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { handleToken } from './store/authFeature/authSlice.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleToken());
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="home"
            element={
              <ProtectedRoutes>
                <HomePage />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </Router>
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
