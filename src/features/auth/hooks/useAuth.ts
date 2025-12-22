import { authStore } from '../stores';

export const useAuth = () => {
  return {
    isAuthenticated: authStore.isAuthenticated,
    isLoading: authStore.isLoading,
    user: authStore.user,
    login: authStore.login.bind(authStore),
    logout: authStore.logout.bind(authStore),
  };
};

export default useAuth;
