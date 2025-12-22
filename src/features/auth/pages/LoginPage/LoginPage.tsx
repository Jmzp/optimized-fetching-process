import { useState, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import {
  LockOutlined,
  EmailOutlined,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { observer } from 'mobx-react';
import { authStore } from '../../stores';
import * as styles from './LoginPage.styles.css';

interface LocationState {
  from?: {
    pathname: string;
  };
}

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    const success = await authStore.login(email, password);
    if (success) {
      // Redirect to the page they tried to visit, or /home
      const from = state?.from?.pathname || '/home';
      navigate(from, { replace: true });
    }
  };

  return (
    <Box className={styles.container}>
      <Card className={styles.formCard} elevation={0}>
        <Box className={styles.logoContainer}>
          <Box className={styles.logo}>
            <LockOutlined sx={{ fontSize: 40, color: 'white' }} />
          </Box>
        </Box>

        <Typography variant="h4" className={styles.title}>
          Welcome
        </Typography>
        <Typography variant="body2" className={styles.subtitle}>
          Enter your credentials to continue
        </Typography>

        <form onSubmit={handleSubmit} className={styles.form}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            autoComplete="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined sx={{ color: '#9ca3af' }} />
                </InputAdornment>
              ),
            }}
            className={styles.textField}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined sx={{ color: '#9ca3af' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ color: '#9ca3af' }} />
                    ) : (
                      <Visibility sx={{ color: '#9ca3af' }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            className={styles.textField}
          />

          {error && (
            <Alert severity="error" sx={{ borderRadius: '12px' }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={authStore.isLoading}
            fullWidth
            className={styles.button}
          >
            {authStore.isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Login'
            )}
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default observer(LoginPage);
