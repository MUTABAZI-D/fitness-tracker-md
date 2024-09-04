import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { DeleteWorkoutModal } from './DeleteWorkoutModal.jsx';

const options = ['Edit', 'Delete'];

export const WorkoutActionMenu = ({
  workoutId,
  editWorkout,
  workoutToEdit,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
    handleClose();
  };
  const handleEdit = () => {
    editWorkout(workoutId);
    handleClose();
  };

  return (
    <>
      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          disabled={!!workoutToEdit}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              selected={option === 'Pyxis'}
              onClick={option === 'Delete' ? handleDelete : handleEdit}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
      {showDeleteModal && (
        <DeleteWorkoutModal
          setShowDeleteModal={setShowDeleteModal}
          workoutId={workoutId}
        />
      )}
    </>
  );
};

WorkoutActionMenu.propTypes = {
  workoutId: PropTypes.string.isRequired,
  editWorkout: PropTypes.func.isRequired,
  workoutToEdit: PropTypes.object,
};
