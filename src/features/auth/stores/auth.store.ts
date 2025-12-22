import { makeAutoObservable, runInAction } from 'mobx';

const FAKE_TOKEN = 'fake-jwt-token-12345';
const TOKEN_KEY = 'auth_token';

class AuthStore {
  isAuthenticated = false;
  isLoading = false;
  user: { email: string } | null = null;

  constructor() {
    makeAutoObservable(this);
    this.checkAuth();
  }

  private checkAuth(): void {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token === FAKE_TOKEN) {
      this.isAuthenticated = true;
      this.user = { email: 'user@example.com' };
    }
  }

  async login(email: string, _password: string): Promise<boolean> {
    this.isLoading = true;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    runInAction(() => {
      localStorage.setItem(TOKEN_KEY, FAKE_TOKEN);
      this.isAuthenticated = true;
      this.user = { email };
      this.isLoading = false;
    });

    return true;
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.isAuthenticated = false;
    this.user = null;
  }
}

export const authStore = new AuthStore();
export default authStore;
