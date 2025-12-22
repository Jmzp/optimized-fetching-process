import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import type { ApiResponse, ApiError, HttpClientConfig } from './types';

class HttpClient {
  private client: AxiosInstance;
  private static instance: HttpClient;

  private constructor(config?: HttpClientConfig) {
    this.client = axios.create({
      baseURL: config?.baseURL ?? '',
      timeout: config?.timeout ?? 30000,
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    });

    this.setupInterceptors();
  }

  static getInstance(config?: HttpClientConfig): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient(config);
    }
    return HttpClient.instance;
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = this.getStoredToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error),
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError<ApiError>) => {
        console.warn('API Error:', error);

        // Network error (no response)
        if (!error.response) {
          const connectionError: ApiError = {
            message: 'Connection error. Please check your internet connection.',
            status: 0,
            code: 'NETWORK_ERROR',
          };
          return Promise.reject(connectionError);
        }

        // HTTP error with response
        const apiError: ApiError = {
          message: error.response.data?.message ?? 'An unexpected error occurred',
          status: error.response.status,
          code: error.response.data?.code,
          details: error.response.data?.details,
        };

        // Handle specific status codes
        switch (error.response.status) {
          case 401:
            // Unauthorized - clear token
            this.clearToken();
            apiError.message = 'Session expired. Please log in again.';
            break;
          case 403:
            apiError.message = 'You do not have permission to perform this action.';
            break;
          case 404:
            apiError.message = 'Resource not found.';
            break;
          case 429:
            apiError.message = 'Too many requests. Please try again later.';
            break;
          case 500:
          case 502:
          case 503:
          case 504:
            apiError.message = 'Server error. Please try again later.';
            break;
        }

        return Promise.reject(apiError);
      },
    );
  }

  private getStoredToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  clearToken(): void {
    localStorage.removeItem('auth_token');
  }

  getAxiosInstance(): AxiosInstance {
    return this.client;
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.get<T>(url, config);
    return {
      data: response.data,
      status: response.status,
      headers: response.headers as Record<string, string>,
    };
  }

  async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.client.post<T>(url, data, config);
    return {
      data: response.data,
      status: response.status,
      headers: response.headers as Record<string, string>,
    };
  }

  async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.client.put<T>(url, data, config);
    return {
      data: response.data,
      status: response.status,
      headers: response.headers as Record<string, string>,
    };
  }

  async patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.client.patch<T>(url, data, config);
    return {
      data: response.data,
      status: response.status,
      headers: response.headers as Record<string, string>,
    };
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.client.delete<T>(url, config);
    return {
      data: response.data,
      status: response.status,
      headers: response.headers as Record<string, string>,
    };
  }
}

export const httpClient = HttpClient.getInstance();
export default httpClient;
