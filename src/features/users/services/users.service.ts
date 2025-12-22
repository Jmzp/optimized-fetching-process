import { httpClient } from '../../../core/api';
import type { ApiError } from '../../../core/api';
import type { UsersApiResponse, UsersQueryParams, User } from '../types/user.types';

const URL_DATA = 'https://randomuser.me/api/?results=2000';
const DEFAULT_PAGE_SIZE = 50;

interface CachedData {
  results: User[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

// Cache to store downloaded data
let cachedData: CachedData | null = null;

export class UsersServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown,
  ) {
    super(message);
    this.name = 'UsersServiceError';
  }
}

export const usersService = {
  async fetchUsers(params: UsersQueryParams = {}): Promise<UsersApiResponse> {
    try {
      const pageSize = params.results || DEFAULT_PAGE_SIZE;
      const page = params.page || 1;

      // If we don't have cached data, download it using httpClient
      if (!cachedData) {
        const response = await httpClient.get<CachedData>(URL_DATA);

        if (!response.data || !response.data.results) {
          throw new UsersServiceError('Invalid response format', response.status);
        }

        cachedData = response.data;
      }

      // Verify that data is available
      if (!cachedData) {
        throw new UsersServiceError('Failed to load users data.');
      }

      // Simulate network delay to maintain realistic UX
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Calculate indices for pagination
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      // Get users for current page
      const paginatedResults = cachedData.results.slice(startIndex, endIndex);

      // If no results, return empty array
      if (paginatedResults.length === 0 && page > 1) {
        return {
          results: [],
          info: {
            ...cachedData.info,
            page,
            results: 0,
          },
        };
      }

      return {
        results: paginatedResults,
        info: {
          ...cachedData.info,
          page,
          results: paginatedResults.length,
        },
      };
    } catch (error) {
      // httpClient already handles axios errors and returns ApiError
      const apiError = error as ApiError;
      throw new UsersServiceError(
        apiError.message || 'Failed to load users data.',
        apiError.status,
        error,
      );
    }
  },
};
