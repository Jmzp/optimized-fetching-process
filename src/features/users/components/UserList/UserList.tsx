import React, { useEffect, useRef } from 'react';
import { List, type RowComponentProps } from 'react-window';
import { Box, CircularProgress, Typography, Alert, Button } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import UserCard from '../UserCard';
import { useInfiniteUsers } from '../../hooks/useInfiniteUsers';
import type { User } from '../../types/user.types';
import * as styles from './UserList.styles.css';

const ITEM_HEIGHT = 180;

interface RowProps {
  users: User[];
  hasNextPage: boolean;
  loadMoreRef: React.Ref<HTMLDivElement>;
}

const RowComponent = ({
  index,
  style,
  users,
  hasNextPage,
  loadMoreRef,
}: RowComponentProps<RowProps>) => {
  const user = users[index];
  const isLastItem = index === users.length - 1;

  if (!user) {
    return <div style={style} />;
  }

  return (
    <div style={style}>
      <UserCard user={user} />
      {isLastItem && hasNextPage && <div ref={loadMoreRef} style={{ height: 1 }} />}
    </div>
  );
};

const UserList = () => {
  const {
    users,
    totalUsers,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
    isError,
    refetch,
  } = useInfiniteUsers();

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
    triggerOnce: false,
  });

  const isFetchingRef = useRef(false);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isFetchingRef.current) {
      isFetchingRef.current = true;
      fetchNextPage().finally(() => {
        // Add a small delay before allowing next fetch
        setTimeout(() => {
          isFetchingRef.current = false;
        }, 500);
      });
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <Box className={styles.centerContainer}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2, color: 'white' }}>
          Loading users...
        </Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box className={styles.centerContainer}>
        <Alert severity="error" sx={{ maxWidth: 600, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Error loading users
          </Typography>
          <Typography variant="body2">
            {error instanceof Error ? error.message : 'An unexpected error occurred'}
          </Typography>
        </Alert>
        <Button variant="contained" onClick={() => refetch()}>
          Retry
        </Button>
      </Box>
    );
  }

  if (users.length === 0) {
    return (
      <Box className={styles.centerContainer}>
        <Typography variant="h6" color="text.secondary">
          No users found
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.header}>
        <Typography variant="h5" className={styles.title}>
          Users Directory
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Showing {totalUsers} of 2000 users
        </Typography>
      </Box>

      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <List
          rowComponent={RowComponent}
          rowCount={users.length}
          rowHeight={ITEM_HEIGHT}
          rowProps={{ users, hasNextPage, loadMoreRef }}
          style={{ height: '100%', width: '100%' }}
          className={styles.list}
        />
      </Box>

      {isFetchingNextPage && (
        <Box className={styles.loadingMore}>
          <CircularProgress size={30} sx={{ color: '#11998e' }} />
          <Typography
            variant="body2"
            sx={{ ml: 2, color: '#11998e', fontWeight: 600 }}
          >
            Loading more users...
          </Typography>
        </Box>
      )}

      {!hasNextPage && totalUsers > 0 && (
        <Box className={styles.endMessage}>
          <Typography variant="body2" color="text.secondary">
            You've reached the end of the list
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default UserList;
