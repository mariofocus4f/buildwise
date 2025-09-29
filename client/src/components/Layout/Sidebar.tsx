import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Construction as ConstructionIcon,
  Assignment as AssignmentIcon,
  Description as DescriptionIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon,
  Home as HomeIcon,
  AccountBalance as BudgetIcon,
  Timeline as TimelineIcon,
  PersonAdd as ContractorsIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useUserType } from '../../contexts/UserTypeContext';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const drawerWidth = 240;

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { userType } = useUserType();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Menu dla Kierownika budowy - pełne funkcje
  const managerMenuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard',
    },
    {
      text: 'Harmonogram',
      icon: <TimelineIcon />,
      path: '/timeline',
    },
    {
      text: 'Budżet',
      icon: <BudgetIcon />,
      path: '/budget',
    },
    {
      text: 'Wykonawcy',
      icon: <ContractorsIcon />,
      path: '/contractors',
    },
    {
      text: 'Dokumenty',
      icon: <DescriptionIcon />,
      path: '/documents',
    },
    {
      text: 'Analytics',
      icon: <AnalyticsIcon />,
      path: '/analytics',
    },
  ];

  // Menu dla Inwestora - uproszczone
  const investorMenuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard',
    },
    {
      text: 'Timeline projektu',
      icon: <TimelineIcon />,
      path: '/timeline',
    },
    {
      text: 'Budżet',
      icon: <BudgetIcon />,
      path: '/budget',
    },
    {
      text: 'Dokumenty',
      icon: <DescriptionIcon />,
      path: '/documents',
    },
  ];

  // Wybierz odpowiednie menu
  const menuItems = userType === 'manager' ? managerMenuItems : investorMenuItems;

  // Admin only menu items
  const adminMenuItems = [
    {
      text: 'Użytkownicy',
      icon: <PeopleIcon />,
      path: '/users',
    },
    {
      text: 'Ustawienia',
      icon: <SettingsIcon />,
      path: '/settings',
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo/Brand */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <HomeIcon sx={{ color: 'primary.main', fontSize: 28 }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          BuildWise
        </Typography>
      </Box>

      {/* Main Navigation */}
      <List sx={{ flexGrow: 1, pt: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={isActive(item.path)}
              sx={{
                mx: 1,
                borderRadius: 1,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive(item.path) ? 'white' : 'text.secondary',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Admin Section */}
      {user?.role === 'admin' && (
        <>
          <Divider />
          <List>
            <ListItem>
              <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                Administracja
              </Typography>
            </ListItem>
            {adminMenuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  selected={isActive(item.path)}
                  sx={{
                    mx: 1,
                    borderRadius: 1,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'white',
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive(item.path) ? 'white' : 'text.secondary',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}

      {/* User Info */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="body2" color="text.secondary" noWrap>
          {user?.firstName} {user?.lastName}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap>
          {user?.company || 'BuildWise'}
        </Typography>
        <Box sx={{ 
          mt: 1, 
          px: 1, 
          py: 0.5, 
          bgcolor: userType === 'manager' ? '#FF6B35' : '#FFA726',
          borderRadius: 1,
        }}>
          <Typography variant="caption" sx={{ color: 'white', fontWeight: 600 }}>
            {userType === 'manager' ? '👷 Kierownik budowy' : '🏠 Inwestor'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
