import PropTypes from 'prop-types';
import { WorkoutActionMenu } from './WorkoutActionMenu.jsx';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack,
  Typography,
  Box,
} from '@mui/material';

export const DisplayWorkoutsTable = ({
  currentWorkouts,
  editWorkout,
  workoutToEdit,
}) => {
  if (!currentWorkouts.length) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '200px',
        }}
      >
        <Typography variant="h6" color="secondary.main">
          No workouts found!
        </Typography>
      </Box>
    );
  }
  return (
    <>
      {' '}
      <Table aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Calories Burned</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>User Phone</TableCell>
            <TableCell>Date Performed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentWorkouts.map((workout) => (
            <TableRow key={workout.id}>
              <TableCell>{workout.id}</TableCell>
              <TableCell>{workout.name}</TableCell>
              <TableCell>{workout.type}</TableCell>
              <TableCell>{workout.duration}</TableCell>
              <TableCell>{workout.caloriesBurned}</TableCell>
              <TableCell>{workout.user.userId}</TableCell>
              <TableCell>{workout.user.userName}</TableCell>
              <TableCell>{workout.user.phone}</TableCell>
              <TableCell>
                {' '}
                <Stack
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {workout.datePerformed}{' '}
                  <WorkoutActionMenu
                    workoutId={workout.id}
                    editWorkout={editWorkout}
                    workoutToEdit={workoutToEdit}
                  />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

DisplayWorkoutsTable.propTypes = {
  currentWorkouts: PropTypes.array.isRequired,
  editWorkout: PropTypes.func.isRequired,
  workoutToEdit: PropTypes.object,
};
