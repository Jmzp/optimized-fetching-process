import { useInfiniteQuery } from '@tanstack/react-query';
import { usersService } from '../services/users.service';
import type { User } from '../types/user.types';

const USERS_QUERY_KEY = 'users';
const PAGE_SIZE = 50;
const MAX_USERS = 2000;
const STALE_TIME = 5 * 60 * 1000;
const CACHE_TIME = 10 * 60 * 1000;

export const useInfiniteUsers = () => {
  const query = useInfiniteQuery({
    queryKey: [USERS_QUERY_KEY],
    queryFn: ({ pageParam = 1 }) =>
      usersService.fetchUsers({
        page: pageParam,
        results: PAGE_SIZE,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.length * PAGE_SIZE;
      if (totalFetched >= MAX_USERS) {
        return undefined;
      }
      return lastPage.info.page + 1;
    },
    initialPageParam: 1,
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const allUsers: User[] = query.data?.pages.flatMap((page) => page.results) ?? [];

  const totalUsers = allUsers.length;
  const hasMore = query.hasNextPage && totalUsers < MAX_USERS;

  return {
    users: allUsers,
    totalUsers,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: hasMore,
    fetchNextPage: query.fetchNextPage,
    error: query.error,
    isError: query.isError,
    refetch: query.refetch,
  };
};
