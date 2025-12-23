import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../../test/test-utils';
import LoginPage from './LoginPage';
import { authStore } from '../../stores';

// Mock authStore methods
vi.spyOn(authStore, 'login');

describe('LoginPage', () => {
  it('renders login form correctly', () => {
    render(<LoginPage />);

    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows error when submitting empty form', async () => {
    render(<LoginPage />);

    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    expect(
      await screen.findByText('Please enter email and password'),
    ).toBeInTheDocument();
  });

  it('calls login method with credentials', async () => {
    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    expect(authStore.login).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});
