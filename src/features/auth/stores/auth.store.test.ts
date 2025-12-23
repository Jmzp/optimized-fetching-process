import { describe, it, expect, beforeEach } from 'vitest';
import { authStore } from './auth.store';

describe('AuthStore', () => {
  beforeEach(() => {
    authStore.logout();
    localStorage.clear();
  });

  it('should initialize with false authentication', () => {
    expect(authStore.isAuthenticated).toBe(false);
    expect(authStore.user).toBeNull();
  });

  it('should login successfully', async () => {
    const success = await authStore.login('test@example.com', 'password');

    expect(success).toBe(true);
    expect(authStore.isAuthenticated).toBe(true);
    expect(authStore.user?.email).toBe('test@example.com');
    expect(localStorage.getItem('auth_token')).toBeTruthy();
  });

  it('should logout successfully', async () => {
    await authStore.login('test@example.com', 'password');
    authStore.logout();

    expect(authStore.isAuthenticated).toBe(false);
    expect(authStore.user).toBeNull();
    expect(localStorage.getItem('auth_token')).toBeNull();
  });
});
