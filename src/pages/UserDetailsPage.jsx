import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUsers,
  selectUsersStatus,
} from '../store/usersFeature/usersSelectors.js';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Grid,
  Box,
  Container,
  Divider,
  CircularProgress,
} from '@mui/material';
import { setUserToEdit } from '../store/usersFeature/usersSlice.js';
import { AddUserModal } from '../components/users/AddUserModaL.jsx';

export const UserDetailsPage = () => {
  const status = useSelector(selectUsersStatus);
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  const { id } = useParams();
  const userDetails = users.find((user) => user.id === id);

  const handleUserEdit = () => {
    dispatch(setUserToEdit(id));
  };

  if (status !== 'succeeded') {
    return <CircularProgress />;
  }
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Grid container spacing={2} sx={{ maxWidth: 1000 }}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
              <Avatar
                sx={{ width: 100, height: 100, margin: '0 auto 16px' }}
                src="/api/placeholder/100/100"
                alt={`${userDetails.name}`}
              />
              <Typography variant="h5" component="div" gutterBottom>
                {userDetails.name}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                Full Stack Developer
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {userDetails.location}
              </Typography>
              <Box mt={2}>
                <Button
                  variant="contained"
                  sx={{
                    mr: 1,
                    bgcolor: 'info.main',
                    '&:hover': {
                      bgcolor: 'info.dark',
                    },
                    textTransform: 'none',
                  }}
                >
                  Follow
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    mr: 1,
                    '&:hover': {
                      bgcolor: 'info.main',
                    },
                    textTransform: 'none',
                  }}
                >
                  Message
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {[
                  { label: 'Full Name', value: userDetails.name },
                  { label: 'Email', value: userDetails.email },
                  { label: 'Phone', value: userDetails.phone },
                  { label: 'Address', value: userDetails.location },
                ].map((item, index) => (
                  <React.Fragment key={index}>
                    <Grid item xs={12} sm={4}>
                      <Typography
                        color={'primary.contastText'}
                        sx={{ fontWeight: 'bold' }}
                      >
                        {item.label}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Typography color="text.secondary">
                        {item.value}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </CardContent>
            <Box sx={{ p: 2, alignSelf: 'flex-start' }}>
              <Button
                sx={{
                  bgcolor: '#00ACC1',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#00ACC1',
                    opacity: 0.8,
                  },
                  textTransform: 'none',
                }}
                onClick={handleUserEdit}
              >
                Edit
              </Button>

              <AddUserModal showButton={false} />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
