import axios, { AxiosResponse } from 'axios';

import { APIResponse } from './types';
import { NetworkErrorCode } from '@talknest/errors/network';

export async function apiRequest<T, U extends string>(
  request: () => Promise<AxiosResponse<APIResponse<T, U>>>,
): Promise<APIResponse<T, U | NetworkErrorCode>> {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response.data as APIResponse<T, U>;
      }

      if (error.code === 'ECONNABORTED') {
        return {
          data: null,
          success: false,
          error: {
            message: 'Request timed out',
            code: 'TIMEOUT_ERROR',
          },
        };
      }

      if (error.request) {
        return {
          success: false,
          data: null,
          error: {
            message: 'No response received from server',
            code: 'NETWORK_ERROR',
          },
        };
      }

      return {
        success: false,
        data: null,
        error: { message: error.message, code: 'REQUEST_ERROR' },
      };
    }

    return {
      success: false,
      data: null,
      error: { message: 'Unexpected error', code: 'UNKNOWN_ERROR' },
    };
  }
}
