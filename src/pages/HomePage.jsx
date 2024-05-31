import { Box, Button, Stack, Typography } from '@mui/material';
import { Home } from '@mui/icons-material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMyData } from '../store/sampleFeature/selectors';
import { getMyData } from '../store/sampleFeature/slice';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authFeature/authSlice';

export const HomePage = () => {
  const dispatch = useDispatch();
  const myData = useSelector(selectMyData);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getMyData());
  }, []);

  function handleLogOut() {
    dispatch(logout());
    navigate('/login');
  }

  return (
    <Stack alignItems="center" spacing={4} p={3}>
      <Typography
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          fontWeight: 'bold',
        }}
        variant="body1"
        textAlign="center"
        color="primary.main"
      >
        <Home />
        HomePage
      </Typography>

      <Box>
        {myData.map((item) => (
          <p key={item.id}>{`${item.name} ${item.id}`}</p>
        ))}
      </Box>
      <Box>
        <Button
          variant="contained"
          onClick={handleLogOut}
          sx={{ textTransform: 'none' }}
        >
          Log out
        </Button>
      </Box>
    </Stack>
  );
};
