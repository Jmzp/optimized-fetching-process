import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../../test/test-utils';
import UsersPage from './UsersPage';
import { authStore } from '../../../auth';

// Mock components to avoid deep rendering
vi.mock('../../components/UserList', () => ({
  default: () => <div data-testid="user-list">User List Component</div>,
}));

// Mock authStore
vi.mock('../../../auth', async () => {
  const actual =
    await vi.importActual<typeof import('../../../auth')>('../../../auth');
  return {
    ...actual,
    authStore: {
      logout: vi.fn(),
      user: { email: 'test@tenpo.cl' },
    },
  };
});

// Mock navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('UsersPage', () => {
  it('renders correctly with user info', () => {
    render(<UsersPage />);

    expect(screen.getByText('Tenpo Challenge')).toBeInTheDocument();
    expect(screen.getByText('test@tenpo.cl')).toBeInTheDocument();
    expect(screen.getByTestId('user-list')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('handles logout correctly', () => {
    render(<UsersPage />);

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);

    expect(authStore.logout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
