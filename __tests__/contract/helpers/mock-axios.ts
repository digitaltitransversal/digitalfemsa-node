import { AxiosInstance, AxiosResponse } from 'axios';

export const createMockAxios = (): jest.Mocked<AxiosInstance> => {
  return {
    request: jest.fn(),
    get: jest.fn(),
    delete: jest.fn(),
    head: jest.fn(),
    options: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    postForm: jest.fn(),
    putForm: jest.fn(),
    patchForm: jest.fn(),
    getUri: jest.fn(),
    defaults: {
      baseURL: 'https://api.digitalfemsa.io',
      headers: {} as any,
    },
    interceptors: {
      request: {
        use: jest.fn(),
        eject: jest.fn(),
        clear: jest.fn(),
      },
      response: {
        use: jest.fn(),
        eject: jest.fn(),
        clear: jest.fn(),
      },
    },
  } as any;
};

export const mockSuccessResponse = <T>(data: T, status: number = 200): AxiosResponse<T> => ({
  data,
  status,
  statusText: 'OK',
  headers: {},
  config: {
    headers: {} as any,
  },
});

export const mockErrorResponse = (status: number, message: string) => ({
  response: {
    status,
    statusText: message,
    data: {
      error: message,
    },
    headers: {},
    config: {
      headers: {} as any,
    },
  },
  message,
  name: 'AxiosError',
  config: {
    headers: {} as any,
  },
  isAxiosError: true,
  toJSON: () => ({}),
});
