import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUsers } from '../../store/usersFeature/usersThunk';
import { toast } from 'react-toastify';

export const DeleteUserModal = ({ userId, setDeleteModal }) => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    setDeleteModal(false);
  };

  const handleDelete = () => {
    dispatch(deleteUsers(userId));
    toast.success('User deleted!');
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
          {'Do you want to delete this user?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting this user will remove them permanently from your records.
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

DeleteUserModal.propTypes = {
  setDeleteModal: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};
