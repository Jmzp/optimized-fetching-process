import { makeAutoObservable, runInAction } from 'mobx';

const FAKE_TOKEN = 'fake-jwt-token-12345';
const TOKEN_KEY = 'auth_token';
const USER_EMAIL_KEY = 'user_email';

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
    const email = localStorage.getItem(USER_EMAIL_KEY);

    if (token === FAKE_TOKEN && email) {
      this.isAuthenticated = true;
      this.user = { email };
    }
  }

  async login(email: string, _password: string): Promise<boolean> {
    this.isLoading = true;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    runInAction(() => {
      localStorage.setItem(TOKEN_KEY, FAKE_TOKEN);
      localStorage.setItem(USER_EMAIL_KEY, email);
      this.isAuthenticated = true;
      this.user = { email };
      this.isLoading = false;
    });

    return true;
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_EMAIL_KEY);
    this.isAuthenticated = false;
    this.user = null;
  }
}

export const authStore = new AuthStore();
export default authStore;
