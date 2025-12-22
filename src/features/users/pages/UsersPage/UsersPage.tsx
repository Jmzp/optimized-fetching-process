import { Box, Container } from '@mui/material';
import UserList from '../../components/UserList';
import * as styles from './UsersPage.styles.css';

const UsersPage = () => {
  return (
    <Box className={styles.root}>
      <Container maxWidth="xl" className={styles.container}>
        <UserList />
      </Container>
    </Box>
  );
};

export default UsersPage;
