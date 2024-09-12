import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AdbIcon from '@mui/icons-material/Adb';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: 'primary.dark',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        },
      }}
    >
      <Box
        p={2}
        role="presentation"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <AdbIcon sx={{ color: 'primary.light', marginRight: '3px' }} />
        <Typography
          variant="h6"
          component={'div'}
          color={'primary.contrastText'}
        >
          FITNESS TRACKER
        </Typography>
      </Box>
      <List sx={{ width: '100%' }}>
        <ListItem component={Link} to="/home" sx={{ padding: 0 }}>
          <ListItemButton
            sx={{
              width: '100%',
              bgcolor: isActive('/home') ? 'primary.contrastText' : 'inherit',
              '&:hover': {
                backgroundColor: isActive('/home')
                  ? 'primary.contrastText'
                  : 'action.hover',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: '36px' }}>
              <PersonalVideoIcon
                sx={{ fontSize: '20px', color: 'info.main' }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Dashboard"
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '14px',
                  color: 'primary.light',
                },
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem component={Link} to="/users" sx={{ padding: 0 }}>
          <ListItemButton
            sx={{
              width: '100%',
              backgroundColor: isActive('/users')
                ? 'primary.contrastText'
                : 'inherit',
              '&:hover': {
                backgroundColor: isActive('/users')
                  ? 'primary.contrastText'
                  : 'action.hover',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: '36px' }}>
              <PersonIcon sx={{ fontSize: '20px', color: 'info.main' }} />
            </ListItemIcon>
            <ListItemText
              primary="Users"
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '14px',
                  color: 'primary.light',
                },
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem component={Link} to="/workouts" sx={{ padding: 0 }}>
          <ListItemButton
            sx={{
              width: '100%',
              backgroundColor: isActive('/workouts')
                ? 'primary.contrastText'
                : 'inherit',
              '&:hover': {
                backgroundColor: isActive('/workouts')
                  ? 'primary.contrastText'
                  : 'action.hover',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: '36px' }}>
              <FitnessCenterIcon
                sx={{ fontSize: '20px', color: 'info.main' }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Workouts"
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '14px',
                  color: 'primary.light',
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
