import { useEffect, useState } from 'react';
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
  Box,
  MenuItem,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  addWorkouts,
  updateWorkouts,
} from '../../store/workoutsFeature/workoutsThunks';
import { selectUsers } from '../../store/usersFeature/usersSelectors';

const workoutTypes = ['Cardio', 'Strength', 'Flexibility'];

export const AddWorkoutModal = ({
  nextId,
  incrementId,
  workoutToEdit,
  clearWorkoutEdit,
}) => {
  const users = useSelector(selectUsers);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const formatDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const defaultValues = {
    name: '',
    type: '',
    duration: '',
    caloriesBurned: '',
    user: {
      userName: '',
      phone: '',
    },
    datePerformed: formatDate(),
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ defaultValues });

  useEffect(() => {
    if (workoutToEdit) {
      reset(workoutToEdit);
      setOpen(true);
    }
  }, [workoutToEdit, reset]);

  const handleClose = () => {
    setOpen(false);
    reset(defaultValues);
    clearWorkoutEdit();
  };

  const handleCancel = () => {
    handleClose();
  };

  const onSubmit = (data) => {
    if (workoutToEdit) {
      dispatch(updateWorkouts({ ...workoutToEdit, ...data }));
      handleClose();
      toast.success('Workout edited!');
    } else {
      const newWorkout = {
        id: String(nextId),
        ...data,
      };
      dispatch(addWorkouts(newWorkout));
      incrementId();
      handleClose();
      toast.success('Workout added!');
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        sx={{
          margin: 2,
          '&:hover': {
            opacity: 0.8,
          },
        }}
      >
        {workoutToEdit ? 'Edit workout' : 'Add Workout'}
      </Button>
      <Dialog
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle id="dialog-title">
          {workoutToEdit ? 'Edit workout' : 'Add Workout'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            Please fill out the form and click add or edit. If not, you can
            cancel the action.
          </DialogContentText>
          <Stack spacing={2} marginTop={2}>
            <Stack direction="row" spacing={2}>
              <Box width="250px">
                <Controller
                  name="user"
                  control={control}
                  rules={{ required: 'User ID is required' }}
                  render={({ field }) => (
                    <TextField
                      select
                      fullWidth
                      label="User"
                      error={!!errors.user}
                      helperText={errors.user?.message}
                      value={field.value.userName || ''}
                      onChange={(e) => {
                        const selectedUserName = e.target.value;
                        const selectedUser = users.find(
                          (user) => user.name === selectedUserName
                        );
                        field.onChange({
                          userName: selectedUser.name,
                          phone: selectedUser.phone,
                        });
                      }}
                    >
                      {users.map((user) => (
                        <MenuItem value={user.name} key={user.id}>
                          {user.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Box>
              <TextField
                variant="outlined"
                label="Name"
                name="name"
                type="text"
                {...register('name', { required: 'Name is required' })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <Box width="250px">
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: 'Type is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Type"
                      type="text"
                      select
                      fullWidth
                      error={!!errors.type}
                      helperText={errors.type?.message}
                    >
                      {workoutTypes.map((workout) => (
                        <MenuItem value={workout} key={workout}>
                          {workout}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Box>
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Duration"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">min</InputAdornment>
                  ),
                }}
                name="duration"
                type="number"
                {...register('duration', {
                  required: 'Duration is required',
                  min: {
                    value: 10,
                    message: 'Duration must be at least 10 minutes',
                  },
                })}
                error={!!errors.duration}
                helperText={errors.duration?.message}
              />
              <TextField
                label="Calories Burned"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">kcal</InputAdornment>
                  ),
                }}
                name="caloriesBurned"
                type="number"
                {...register('caloriesBurned', {
                  required: 'Calories Burned is required',
                  min: {
                    value: 50,
                    message: 'Calories burned must be at least 50 Kcal',
                  },
                })}
                error={!!errors.caloriesBurned}
                helperText={errors.caloriesBurned?.message}
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
            {workoutToEdit ? 'Edit' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

AddWorkoutModal.propTypes = {
  nextId: PropTypes.number.isRequired,
  incrementId: PropTypes.func.isRequired,
  workoutToEdit: PropTypes.object,
  clearWorkoutEdit: PropTypes.func.isRequired,
};
