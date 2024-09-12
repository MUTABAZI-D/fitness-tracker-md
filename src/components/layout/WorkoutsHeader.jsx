import { Stack, Typography } from '@mui/material';

export const WorkoutsHeader = () => {
  return (
    <Stack
      sx={{
        bgcolor: 'primary.contrastText',
        position: 'fixed',
        top: '0',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: '150px',
        height: '50px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
        zIndex: 2,
      }}
    >
      <Typography
        variant="h4"
        component={'h2'}
        color={'primary.main'}
        sx={{ textTransform: 'uppercase' }}
      >
        workouts
      </Typography>
    </Stack>
  );
};
