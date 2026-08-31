import axios, { AxiosResponse } from 'axios';

import type { APIResponse } from './types';
import {
  type NetworkErrorCode,
  networkErrorCodes,
} from '@talknest/errors/network';

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
            code: networkErrorCodes.timeoutError,
          },
        };
      }

      if (error.request) {
        return {
          success: false,
          data: null,
          error: {
            code: networkErrorCodes.networkError,
            message: 'No response received from server',
          },
        };
      }

      return {
        success: false,
        data: null,
        error: {
          code: networkErrorCodes.requestError,
          message: error.message,
        },
      };
    }

    return {
      success: false,
      data: null,
      error: {
        code: networkErrorCodes.unknownError,
        message: 'Unexpected error',
      },
    };
  }
}
