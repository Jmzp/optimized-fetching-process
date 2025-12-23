import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen } from '../../../../test/test-utils';
import UserList from './UserList';
import * as useInfiniteUsersHook from '../../hooks/useInfiniteUsers';
import type { User } from '../../types/user.types';

// Mock the hook
vi.mock('../../hooks/useInfiniteUsers', () => ({
  useInfiniteUsers: vi.fn(),
}));

// Mock react-window to just render children properly or simpler
vi.mock('react-window', async () => {
  const actual =
    await vi.importActual<typeof import('react-window')>('react-window');
  return {
    ...actual,
    List: ({
      rowComponent: Row,
      rowCount,
      rowProps,
    }: {
      rowComponent: React.ElementType;
      rowCount: number;
      rowProps: object;
    }) => (
      <div>
        {Array.from({ length: rowCount }).map((_, index) => (
          <div key={index}>
            <Row index={index} style={{}} {...rowProps} />
          </div>
        ))}
      </div>
    ),
  };
});

// Mock react-intersection-observer
vi.mock('react-intersection-observer', () => ({
  useInView: () => ({
    ref: vi.fn(),
    inView: false,
  }),
}));

describe('UserList', () => {
  it('renders loading state correctly', () => {
    vi.spyOn(useInfiniteUsersHook, 'useInfiniteUsers').mockReturnValue({
      users: [],
      totalUsers: 0,
      isLoading: true,
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: vi.fn(),
      error: null,
      isError: false,
      refetch: vi.fn(),
      isFetching: true,
    });

    render(<UserList />);
    expect(screen.getByText(/loading users.../i)).toBeInTheDocument();
  });

  it('renders users correctly', () => {
    const mockUsers: Partial<User>[] = [
      {
        email: 'test1@example.com',
        gender: 'male',
        name: { title: 'Mr', first: 'John', last: 'Doe' },
        picture: { large: 'url', medium: 'url', thumbnail: 'url' },
        location: {
          city: 'City',
          country: 'Country',
          state: 'State',
          street: { number: 1, name: 'St' },
          postcode: '123',
          coordinates: { latitude: '0', longitude: '0' },
          timezone: { offset: '0', description: '' },
        },
        phone: '1234567890',
        login: {
          uuid: '1',
          username: 'user',
          password: 'pass',
          salt: 'salt',
          md5: 'md5',
          sha1: 'sha1',
          sha256: 'sha256',
        },
        dob: { date: 'date', age: 30 },
        registered: { date: 'date', age: 1 },
        id: { name: 'id', value: '1' },
        cell: '0987654321',
        nat: 'US',
      },
    ];

    vi.spyOn(useInfiniteUsersHook, 'useInfiniteUsers').mockReturnValue({
      users: mockUsers as User[],
      totalUsers: 1,
      isLoading: false,
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: vi.fn(),
      error: null,
      isError: false,
      refetch: vi.fn(),
      isFetching: false,
    });

    render(<UserList />);

    // Use regex for partial match or full text
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/test1@example\.com/)).toBeInTheDocument();
  });

  it('renders empty state when no users', () => {
    vi.spyOn(useInfiniteUsersHook, 'useInfiniteUsers').mockReturnValue({
      users: [],
      totalUsers: 0,
      isLoading: false,
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: vi.fn(),
      error: null,
      isError: false,
      refetch: vi.fn(),
      isFetching: false,
    });

    render(<UserList />);
    expect(screen.getByText(/no users found/i)).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    vi.spyOn(useInfiniteUsersHook, 'useInfiniteUsers').mockReturnValue({
      users: [],
      totalUsers: 0,
      isLoading: false,
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: vi.fn(),
      error: new Error('Failed to fetch'),
      isError: true,
      refetch: vi.fn(),
      isFetching: false,
    });

    render(<UserList />);
    expect(screen.getByText(/error loading users/i)).toBeInTheDocument();
    expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
  });
});
