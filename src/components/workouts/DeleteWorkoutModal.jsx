import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteWorkouts } from '../../store/workoutsFeature/workoutsThunks';
import { toast } from 'react-toastify';

export const DeleteWorkoutModal = ({ setShowDeleteModal, workoutId }) => {
  const [open, setOpen] = useState(true);

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    setShowDeleteModal(false);
  };

  const handleDelete = () => {
    dispatch(deleteWorkouts(workoutId));
    toast.success('Workout deleted!');
    handleClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Do you want to delete this workout?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting this workout will remove it permanently from your records.
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
DeleteWorkoutModal.propTypes = {
  setShowDeleteModal: PropTypes.func.isRequired,
  workoutId: PropTypes.string.isRequired,
};
