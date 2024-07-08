import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { HomePage } from './pages/HomePage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { ProtectedRoutes } from './context/ProtectedRoutes.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthSync } from './context/AuthSync.jsx';
import { UsersPage } from './pages/UsersPage.jsx';
import { WorkoutsPage } from './pages/WorkoutsPage.jsx';

function App() {
  return (
    <>
      <AuthSync />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="users"
            element={
              <ProtectedRoutes>
                <UsersPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="workouts"
            element={
              <ProtectedRoutes>
                <WorkoutsPage />
              </ProtectedRoutes>
            }
          />
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
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
