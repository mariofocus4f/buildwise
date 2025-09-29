import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Badge,
  Switch,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Settings,
  Logout,
  Engineering as ManagerIcon,
  Home as InvestorIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useUserType } from '../../contexts/UserTypeContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { userType, toggleUserType } = useUserType();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationAnchor(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleMenuClose();
  };

  const handleProfile = () => {
    navigate('/profile');
    handleMenuClose();
  };

  const handleSettings = () => {
    navigate('/settings');
    handleMenuClose();
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onMenuClick}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #FF6B35, #F7931E)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          BuildWise
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* User Type Switch */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            bgcolor: 'rgba(255,255,255,0.1)',
            borderRadius: 2,
            px: 2,
            py: 0.5,
          }}>
            <Tooltip title="Inwestor indywidualny">
              <InvestorIcon sx={{ color: userType === 'investor' ? '#FFA726' : '#9E9E9E' }} />
            </Tooltip>
            <Switch
              checked={userType === 'manager'}
              onChange={toggleUserType}
              sx={{
                '& .MuiSwitch-thumb': {
                  bgcolor: userType === 'manager' ? '#FF6B35' : '#FFA726',
                },
                '& .MuiSwitch-track': {
                  bgcolor: '#fff',
                },
              }}
            />
            <Tooltip title="Kierownik budowy">
              <ManagerIcon sx={{ color: userType === 'manager' ? '#FF6B35' : '#9E9E9E' }} />
            </Tooltip>
          </Box>

          <Chip 
            label={userType === 'manager' ? 'Kierownik' : 'Inwestor'}
            size="small"
            sx={{ 
              bgcolor: userType === 'manager' ? '#FF6B35' : '#FFA726',
              color: 'white',
              fontWeight: 600,
            }}
          />

          {/* Notifications */}
          <IconButton
            size="large"
            aria-label="show notifications"
            color="inherit"
            onClick={handleNotificationMenuOpen}
          >
            <Badge badgeContent={0} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Profile Menu */}
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            {user?.avatar ? (
              <Avatar src={user.avatar} sx={{ width: 32, height: 32 }} />
            ) : (
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                {user ? getInitials(user.firstName, user.lastName) : 'U'}
              </Avatar>
            )}
          </IconButton>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleProfile}>
            <AccountCircle sx={{ mr: 1 }} />
            Profil
          </MenuItem>
          <MenuItem onClick={handleSettings}>
            <Settings sx={{ mr: 1 }} />
            Ustawienia
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Logout sx={{ mr: 1 }} />
            Wyloguj
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationAnchor}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(notificationAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary">
              Brak nowych powiadomień
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
