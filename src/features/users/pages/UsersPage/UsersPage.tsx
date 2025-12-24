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
      <AppBar position="static" elevation={0} className={styles.appBar}>
        <Toolbar className={styles.toolbar}>
          <Box className={styles.headerSection}>
            <Typography variant="h5" className={styles.title}>
              Tenpo Challenge
            </Typography>
            <Typography variant="body2" className={styles.subtitle}>
              {authStore.user?.email}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<LogoutOutlined className={styles.logoutIcon} />}
            onClick={handleLogout}
            className={styles.logoutButton}
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
