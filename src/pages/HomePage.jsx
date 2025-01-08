import { Box, Stack, Typography } from '@mui/material';
import { Sidebar } from '../components/layout/Sidebar.jsx';
import { HandleLogout } from '../components/dashboard/HandleLogout.jsx';
import { Cards } from '../components/dashboard/Cards.jsx';

export const HomePage = () => {
  return (
    <div>
      <Stack direction={'row'} spacing={4}>
        <Box width={'20%'}>
          <Sidebar />
        </Box>
        <Box width={'98%'} sx={{ px: 4 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 2,
            }}
          >
            <Typography
              sx={{
                textTransform: 'uppercase',
                fontWeight: 'bold',
              }}
            >
              Dashboard
            </Typography>
            <HandleLogout />
          </Box>
          <Cards />
        </Box>
      </Stack>
    </div>
  );
};
