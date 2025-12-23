import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, AppBar, Toolbar } from '@mui/material';
import { LogoutOutlined } from '@mui/icons-material';
import { observer } from 'mobx-react';
import { authStore } from '../../../auth';
import UserList from '../../components/UserList';
import * as styles from './UsersPage.styles.css';

const UsersPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authStore.logout();
    navigate('/login');
  };

  return (
    <Box className={styles.container}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: 'transparent',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 2, px: 3 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'white' }}>
              Tenpo Challenge
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.95, color: 'white' }}>
              {authStore.user?.email}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<LogoutOutlined />}
            onClick={handleLogout}
            sx={{
              backgroundColor: 'white',
              color: '#11998e',
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              py: 1,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              '&:hover': {
                backgroundColor: '#f8f9fa',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <UserList />
    </Box>
  );
};

export default observer(UsersPage);
