import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  FormControl,
  Button,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { generateToken, login } from '../store/authFeature/authSlice.js';
import { toast } from 'react-toastify';
import { selectIsAuthenticated } from '../store/authFeature/authSelector.js';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function handleClick() {
    setShowPassword(!showPassword);
  }
  function handleMouseDown(e) {
    e.preventDefault();
  }
  const onSubmit = (data) => {
    const envUsername = import.meta.env.VITE_ADMIN_USERNAME;
    const envPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    if (envUsername === data.username && envPassword === data.password) {
      dispatch(login());
      dispatch(generateToken());
      toast.success('Login successful');
      navigate('/home', { replace: true });
    } else {
      toast.error('Login failed: Incorrect username or password');
    }
  };

  if (isAuthenticated) {
    return <Navigate to={'/home'} replace />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: '32px 80px',
          width: '500px',
          height: '400px',
        }}
      >
        <Stack spacing={2}>
          <Typography
            variant="body1"
            color={'black'}
            sx={{ fontSize: '1.5em' }}
          >
            ACCOUNT LOGIN
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl sx={{ display: 'flex', rowGap: 4 }}>
              <Box>
                <Typography sx={{ fontSize: '12px' }} gutterBottom>
                  USERNAME
                </Typography>
                <TextField
                  fullWidth
                  {...register('username', {
                    required: 'Username is required',
                  })}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              </Box>
              <Box>
                <Typography sx={{ fontSize: '12px' }} gutterBottom>
                  PASSWORD
                </Typography>
                <TextField
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibilty"
                          edge="end"
                          onClick={handleClick}
                          onMouseDown={handleMouseDown}
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  type={showPassword ? 'text' : 'password'}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Box>
            </FormControl>
            <Box>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  marginTop: '40px',
                  color: 'primary.light',
                  bgcolor: 'primary.dark',
                  borderRadius: '30px',
                  padding: '10px 40px',
                  textTransform: 'none',
                }}
              >
                Login
              </Button>
            </Box>
          </form>
        </Stack>
      </Paper>
    </Box>
  );
};
