import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { ProtectedRoutes } from './context/ProtectedRoutes.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthSync } from './context/AuthSync.jsx';
import { UsersPage } from './pages/UsersPage.jsx';
import { WorkoutsPage } from './pages/WorkoutsPage.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectUsersStatus } from './store/usersFeature/usersSelectors.js';
import { fetchUsers } from './store/usersFeature/usersThunk.js';
import { RootRedirect } from './context/RootRedirect.jsx';
import { UserDetailsPage } from './pages/UserDetailsPage.jsx';
import { SelectWorkoutsStatus } from './store/workoutsFeature/workoutsSelectors.js';
import { fetchWorkouts } from './store/workoutsFeature/workoutsThunks.js';

function App() {
  const usersStatus = useSelector(selectUsersStatus);
  const workoutsStatus = useSelector(SelectWorkoutsStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [usersStatus, dispatch]);

  useEffect(() => {
    if (workoutsStatus === 'idle') {
      dispatch(fetchWorkouts());
    }
  }, [workoutsStatus, dispatch]);

  return (
    <>
      <AuthSync />
      <Router>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="/" element={<RootRedirect />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="home" element={<HomePage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="workouts" element={<WorkoutsPage />} />
            <Route path="users/details/:id" element={<UserDetailsPage />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
