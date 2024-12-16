import { Box, Stack } from '@mui/material';
import { CardComponent } from './CardComponent.jsx';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../store/usersFeature/usersSelectors.js';
import { SelectWorkouts } from '../../store/workoutsFeature/workoutsSelectors.js';

export const Cards = () => {
  const users = useSelector(selectUsers);
  const workouts = useSelector(SelectWorkouts);
  return (
    <Stack>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          mt: 10,
        }}
      >
        <CardComponent data={users} title="Users" />
        <CardComponent data={workouts} title="Workouts" />
      </Box>
    </Stack>
  );
};
