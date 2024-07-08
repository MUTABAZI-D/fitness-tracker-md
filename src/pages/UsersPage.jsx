import { Stack, Box } from '@mui/material';
import { Sidebar } from '../components/layout/Sidebar.jsx';
import { UsersTable } from '../components/common/UsersTable.jsx';
import { SearchAppBar } from '../components/layout/SearchAppBar.jsx';
import { useState } from 'react';

export const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <Stack spacing={2} direction={'row'}>
      <Box sx={{ width: '20%' }}>
        <Sidebar />
      </Box>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <SearchAppBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <UsersTable searchQuery={searchQuery} />
      </Box>
    </Stack>
  );
};
