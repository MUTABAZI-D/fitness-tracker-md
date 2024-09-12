import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { DeleteUserModal } from './DeleteUserModal.jsx';

const options = ['Edit', 'Delete'];

export const UserActionMenu = ({ userId, editUser, userToEdit }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [deleteModal, setDeleteModal] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    setDeleteModal(true);
    handleClose();
  };
  const handleEdit = () => {
    editUser(userId);
    handleClose();
  };
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        disabled={!!userToEdit}
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
      {deleteModal && (
        <DeleteUserModal userId={userId} setDeleteModal={setDeleteModal} />
      )}
    </div>
  );
};

UserActionMenu.propTypes = {
  userId: PropTypes.string.isRequired,
  editUser: PropTypes.func.isRequired,
  userToEdit: PropTypes.object,
};
