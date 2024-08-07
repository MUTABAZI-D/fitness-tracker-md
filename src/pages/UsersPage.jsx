import { Stack, Box } from '@mui/material';
import { Sidebar } from '../components/layout/Sidebar.jsx';
import { UsersTable } from '../components/users/UsersTable.jsx';
import { SearchUserBar } from '../components/layout/SearchUserBar.jsx';
import { useState } from 'react';
import { UsersHeader } from '../components/layout/UsersHeader.jsx';

export const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <Stack direction={'row'}>
      <Box sx={{ width: '20%' }}>
        <Sidebar />
      </Box>
      <Box sx={{ width: '91%' }}>
        <UsersHeader />
        <Box sx={{ flexGrow: 1, p: 2, m: 4, marginTop: 5 }}>
          <SearchUserBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <UsersTable searchQuery={searchQuery} />
        </Box>
      </Box>
    </Stack>
  );
};
