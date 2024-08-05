import PropTypes from 'prop-types';
import { UserActionMenu } from './UserActionMenu.jsx';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack,
} from '@mui/material';

export const DisplayWorkoutsTable = ({
  currentWorkouts,
  editWorkout,
  workoutToEdit,
}) => {
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
              <TableCell>{workout.userId}</TableCell>
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
                  <UserActionMenu
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
