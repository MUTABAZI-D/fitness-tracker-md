import { Box, Stack, Typography } from '@mui/material';
import { Home } from '@mui/icons-material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMyData } from '../store/sampleFeature/selectors';
import { getMyData } from '../store/sampleFeature/slice';

const HomePage = () => {
  const dispatch = useDispatch();
  const myData = useSelector(selectMyData);

  useEffect(() => {
    dispatch(getMyData());
  }, []);

  return (
    <Stack alignItems="center" gap={4} p={3}>
      <Typography
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          fontWeight: 'bold',
        }}
        variant="body1"
        textAlign="center"
      >
        <Home />
        HomePage
      </Typography>

      <Box>
        {myData.map((item) => (
          <p key={item.id}>{`${item.name} ${item.id}`}</p>
        ))}
      </Box>
    </Stack>
  );
};

export default HomePage;
