import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  InputAdornment,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUsers, updateUsers } from '../../store/usersFeature/usersThunk';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const AddUserModal = ({
  nextId,
  incrementId,
  userToEdit,
  removeUserToEdit,
}) => {
  const [open, setOpen] = useState(false);

  const defaultValues = {
    name: '',
    age: '',
    weight: '',
    height: '',
    location: '',
    phone: '',
    email: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues });
  const dispatch = useDispatch();

  useEffect(() => {
    if (userToEdit) {
      setOpen(true);
      reset(userToEdit);
    }
  }, [userToEdit, reset]);

  const handleClose = () => {
    setOpen(false);
    reset(defaultValues);
    removeUserToEdit();
  };

  const handleCancel = () => {
    handleClose();
  };
  const onSubmit = (data) => {
    if (userToEdit) {
      dispatch(updateUsers({ ...userToEdit, ...data }));
      toast.success(' User edited!');
      handleClose();
    } else {
      const newUser = {
        id: String(nextId),
        ...data,
      };
      dispatch(addUsers(newUser));
      toast.success('New user added!');
      incrementId();
    }
    handleClose();
  };
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        sx={{ margin: 2 }}
      >
        {userToEdit ? 'Edit user' : 'Add User'}
      </Button>
      <Dialog
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle id="dialog-title">
          {userToEdit ? 'Edit user' : 'Add User'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            Please fill out the form and click add or edit . if not you can
            cancel the action
          </DialogContentText>
          <Stack spacing={2} marginTop={2}>
            <Stack direction={'row'} spacing={2}>
              <TextField
                variant="outlined"
                label="Name"
                name="name"
                type="text"
                {...register('name', { required: 'Name is required' })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                variant="outlined"
                label="Age"
                name="age"
                type="number"
                {...register('age', {
                  required: 'Age is required',
                  min: { value: 1, message: 'Enter a valid age' },
                  max: { value: 150, message: 'Enter a valid age' },
                })}
                error={!!errors.age}
                helperText={errors.age?.message}
              />
              <TextField
                label="Weight"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">kg</InputAdornment>
                  ),
                }}
                name="weight"
                type="number"
                {...register('weight', {
                  required: 'Weight is required',
                  min: { value: 1, message: 'Enter a valid weight' },
                })}
                error={!!errors.weight}
                helperText={errors.weight?.message}
              />
            </Stack>
            <Stack direction={'row'} spacing={2}>
              <TextField
                label="Height"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">cm</InputAdornment>
                  ),
                }}
                name="height"
                type="number"
                {...register('height', {
                  required: 'Height is required',
                  min: { value: 1, message: 'Enter a valid height' },
                })}
                error={!!errors.height}
                helperText={errors.height?.message}
              />
              <TextField
                variant="outlined"
                label="Location"
                name="location"
                type="text"
                {...register('location', { required: 'Location is required' })}
                error={!!errors.location}
                helperText={errors.location?.message}
              />
              <TextField
                variant="outlined"
                label="Phone"
                name="phone"
                type="text"
                {...register('phone', { required: 'Phone is required' })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Stack>
            <Stack direction={'row'} spacing={2}>
              <TextField
                variant="outlined"
                label="Email"
                name="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address',
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancel}
            variant="outlined"
            sx={{ bgcolor: 'secondary.main' }}
          >
            Cancel
          </Button>
          <Button
            autoFocus
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            sx={{ bgcolor: 'success.main' }}
          >
            {userToEdit ? 'Edit' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

AddUserModal.propTypes = {
  nextId: PropTypes.number.isRequired,
  incrementId: PropTypes.func.isRequired,
  userToEdit: PropTypes.object,
  removeUserToEdit: PropTypes.func.isRequired,
};
