import { Stack, Box } from '@mui/material';
import { Sidebar } from '../components/layout/Sidebar.jsx';
import { DisplayDetails } from '../components/userDetails/DisplayDetails.jsx';
import { UserDetailsHeader } from '../components/layout/UserDetailsHeader.jsx';

export const UserDetailsPage = () => {
  return (
    <Stack direction={'row'}>
      <Box sx={{ width: '20%' }}>
        <Sidebar />
      </Box>
      <Box sx={{ width: '91%' }}>
        <UserDetailsHeader />
        <DisplayDetails />
      </Box>
    </Stack>
  );
};
