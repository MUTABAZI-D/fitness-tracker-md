import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUsers } from '../../store/usersFeature/usersThunk';

const options = ['Edit', 'Delete'];

export const MenuButton = ({ userId, editUser, userToEdit }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    dispatch(deleteUsers(userId));
    handleClose();
  };
  const handleEdit = () => {
    editUser(userId);
    // console.log(typeof editUser);
    // console.log(userToEdit);
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
    </div>
  );
};

MenuButton.propTypes = {
  userId: PropTypes.string.isRequired,
  editUser: PropTypes.func.isRequired,
  userToEdit: PropTypes.object,
};
