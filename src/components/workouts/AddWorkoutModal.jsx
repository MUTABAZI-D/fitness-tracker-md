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
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  addWorkouts,
  updateWorkouts,
} from '../../store/workoutsFeature/workoutsThunks';
import { selectUsers } from '../../store/usersFeature/usersSelectors';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Africa/Kigali');

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

  const defaultValues = {
    name: '',
    type: '',
    duration: '',
    caloriesBurned: '',
    userId: '',
    datePerformed: dayjs(),
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
      const modifiedWorkoutToEdit = {
        ...workoutToEdit,
        datePerformed: dayjs(workoutToEdit.datePerformed),
      };
      reset(modifiedWorkoutToEdit);
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
    const formattedData = {
      ...data,
      datePerformed: data.datePerformed.format(),
    };

    if (workoutToEdit) {
      dispatch(updateWorkouts({ ...workoutToEdit, ...formattedData }));
      handleClose();
      toast.success('Workout edited!');
    } else {
      const newWorkout = {
        id: String(nextId),
        ...formattedData,
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
        sx={{ margin: 2 }}
      >
        {workoutToEdit ? 'Edit workout' : 'Add Workout'}
      </Button>
      <Dialog
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        open={open}
        onClose={() => setOpen(false)}
        maxWidth={false}
        PaperProps={{
          style: {
            width: '700px',
            maxWidth: '90%',
          },
        }}
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
                  name="userId"
                  control={control}
                  rules={{ required: 'User ID is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="User"
                      type="text"
                      select
                      fullWidth
                      error={!!errors.userId}
                      helperText={errors.userId?.message}
                    >
                      {users.map((user) => (
                        <MenuItem value={user.id} key={user.id}>
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
                    value: 1,
                    message: 'Duration must be at least 1 minute',
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
                    value: 1,
                    message: 'Calories burned must be at least 1 Kcal',
                  },
                })}
                error={!!errors.caloriesBurned}
                helperText={errors.caloriesBurned?.message}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="datePerformed"
                  control={control}
                  defaultValue={dayjs()}
                  rules={{ required: 'Date is required' }}
                  render={({ field }) => (
                    <DateTimePicker
                      {...field}
                      label="Date Performed"
                      slotProps={{
                        textField: {
                          fullWidth: false,
                          error: !!errors.datePerformed,
                          helperText: errors.datePerformed?.message,
                        },
                        popper: { placement: 'auto' },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
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
