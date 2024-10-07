import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { DeleteUserModal } from './DeleteUserModal.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserToEdit } from '../../store/usersFeature/usersSelectors.js';
import { setUserToEdit } from '../../store/usersFeature/usersSlice.js';

const options = ['Edit', 'Delete', 'Details'];

export const UserActionMenu = ({ userId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();
  const userToEdit = useSelector(selectUserToEdit);
  const dispatch = useDispatch();

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
  const handleUserEdit = () => {
    dispatch(setUserToEdit(userId));
    handleClose();
  };

  const handleDetails = () => {
    navigate(`/users/details/${userId}`);
    handleClose();
  };

  const handleOptions = (option) => {
    if (option === 'Delete') {
      return handleDelete;
    } else if (option === 'Edit') {
      return handleUserEdit;
    } else if (option === 'Details') {
      return handleDetails;
    }
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
            onClick={handleOptions(option)}
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
};
