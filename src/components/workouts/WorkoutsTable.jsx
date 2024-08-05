import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  CircularProgress,
  Paper,
  TableContainer,
  Typography,
  Pagination,
} from '@mui/material';
import {
  SelectWorkouts,
  SelectWorkoutsError,
  SelectWorkoutsStatus,
} from '../../store/workoutsFeature/workoutsSelectors.js';
import { useState, useEffect } from 'react';
import { fetchWorkouts } from '../../store/workoutsFeature/workoutsThunks.js';
import { AddWorkoutModal } from './AddWorkoutModal.jsx';
import { DisplayWorkoutsTable } from './DisplayWorkoutsTable.jsx';
import PropTypes from 'prop-types';

export const WorkoutsTable = ({ query }) => {
  const status = useSelector(SelectWorkoutsStatus);
  const workouts = useSelector(SelectWorkouts);
  const error = useSelector(SelectWorkoutsError);

  const [isInitialized, setIsInitialized] = useState(false);
  const [nextId, setNextId] = useState(1);
  const [workoutToEdit, setWorkoutToEdit] = useState(null);

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(3);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchWorkouts());
    }
  }, [status, dispatch]);
  useEffect(() => {
    if (workouts.length && !isInitialized) {
      const maxId = Math.max(...workouts.map((workout) => workout.id));
      setNextId(maxId + 1);
      setIsInitialized(true);
    }
  }, [workouts, isInitialized]);

  const incrementId = () => {
    setNextId((prevId) => prevId + 1);
  };

  const editWorkout = (workoutId) => {
    const workout = workouts.find((workout) => workout.id === workoutId);
    setWorkoutToEdit(workout);
  };
  const clearWorkoutEdit = () => {
    setWorkoutToEdit(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setPage(1);
  }, [query]);

  const filteredWorkouts = workouts.filter((workout) =>
    workout.name.toLowerCase().includes(query.toLowerCase())
  );

  const indexOfLastRow = page * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentWorkouts = filteredWorkouts.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  return (
    <Box component={Paper} paddingBottom={2}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h5"
          component={'h2'}
          textAlign={'center'}
          gutterBottom
          color={'primary.contrastText'}
          sx={{ marginLeft: 2 }}
        >
          WORKOUTS
        </Typography>
        <AddWorkoutModal
          nextId={nextId}
          incrementId={incrementId}
          workoutToEdit={workoutToEdit}
          clearWorkoutEdit={clearWorkoutEdit}
        />
      </Box>

      <TableContainer component={Paper} sx={{ margin: 2, maxWidth: '96%' }}>
        {status === 'loading' && <CircularProgress />}
        {status === 'failed' && (
          <Typography color={'error.main'}>{error}</Typography>
        )}
        {status === 'succeeded' && (
          <DisplayWorkoutsTable
            currentWorkouts={currentWorkouts}
            editWorkout={editWorkout}
            workoutToEdit={workoutToEdit}
          />
        )}
      </TableContainer>
      <Pagination
        count={Math.ceil(filteredWorkouts.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 2,
        }}
      />
    </Box>
  );
};
WorkoutsTable.propTypes = {
  query: PropTypes.string,
};
