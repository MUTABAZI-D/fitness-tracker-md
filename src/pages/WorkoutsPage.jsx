import { Sidebar } from '../components/layout/Sidebar.jsx';
import { WorkoutsTable } from '../components/workouts/WorkoutsTable.jsx';
import { Stack, Box } from '@mui/material';
import { SearchWorkoutBar } from '../components/layout/SearchWorkoutBar.jsx';
import { useState } from 'react';
import { WorkoutsHeader } from '../components/layout/WorkoutsHeader.jsx';

export const WorkoutsPage = () => {
  const [query, setQuery] = useState('');
  return (
    <Stack spacing={2} direction={'row'}>
      <Box sx={{ width: '20%' }}>
        <Sidebar />
      </Box>
      <Box sx={{ width: '98%' }}>
        <WorkoutsHeader />
        <Box sx={{ flexGrow: 1, p: 2, m: 4, marginTop: 5 }}>
          <SearchWorkoutBar query={query} setQuery={setQuery} />
          <WorkoutsTable query={query} />
        </Box>
      </Box>
    </Stack>
  );
};
