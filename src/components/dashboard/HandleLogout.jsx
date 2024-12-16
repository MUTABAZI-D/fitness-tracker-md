import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Typography, Button } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteToken, logout } from '../../store/authFeature/authSlice';
import { useNavigate } from 'react-router-dom';

export const HandleLogout = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutFunction = () => {
    dispatch(logout());
    dispatch(deleteToken());
    navigate('/login');
  };

  return (
    <div>
      <Button
        disableTouchRipple
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          '&:hover': {
            backgroundColor: 'inherit',
          },
          display: 'flex',
          alignItems: 'center',
          gap: 1.2,
          textDecoration: 'none',
          textTransform: 'none',
          cursor: 'pointer',
          '&:hover .button-text': {
            color: 'secondary.main',
          },
        }}
      >
        <Avatar alt="Mutabazi Dieudonne" src="/avatar.jpeg" />
        <Typography color={'primary.contrastText'} className="button-text">
          Mutabazi Dieudonne
        </Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={logoutFunction}>Logout</MenuItem>
      </Menu>
    </div>
  );
};
