import { Component, ErrorInfo, ReactNode } from 'react';
import { Button, Typography, Box } from '@mui/material';
import * as styles from './ErrorBoundary.styles.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <div className={styles.container}>
          <Typography variant="h4" className={styles.title}>
            Oops! Something went wrong
          </Typography>
          <Typography variant="body1" className={styles.message}>
            We&apos;re sorry for the inconvenience. Please try refreshing the page or
            contact support if the problem persists.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button variant="contained" color="primary" onClick={this.handleReload}>
              Refresh Page
            </Button>
            <Button variant="outlined" color="secondary" onClick={this.handleReset}>
              Try Again
            </Button>
          </Box>
          {process.env.NODE_ENV === 'development' && error && (
            <div className={styles.details}>
              <Typography variant="subtitle2" gutterBottom>
                Error Details:
              </Typography>
              <pre>{error.toString()}</pre>
              {errorInfo && (
                <>
                  <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                    Component Stack:
                  </Typography>
                  <pre>{errorInfo.componentStack}</pre>
                </>
              )}
            </div>
          )}
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
