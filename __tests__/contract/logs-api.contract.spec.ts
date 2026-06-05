import { LogsApi } from '../../api/logs-api';
import { Configuration } from '../../configuration';
import { RequiredError } from '../../base';
import { createMockAxios, mockSuccessResponse } from './helpers/mock-axios';
import { createMockConfiguration } from './helpers/contract-validators';

describe('LogsApi - Contract Tests', () => {
  let logsApi: LogsApi;
  let mockAxios: ReturnType<typeof createMockAxios>;

  beforeEach(() => {
    const config = new Configuration(createMockConfiguration());
    mockAxios = createMockAxios();
    logsApi = new LogsApi(config, 'https://api.digitalfemsa.io', mockAxios as any);
  });

  describe('getLogs', () => {
    it('should work without parameters', async () => {
      const mockResponse = mockSuccessResponse({ data: [] });
      mockAxios.request.mockResolvedValue(mockResponse);
      await expect(logsApi.getLogs()).resolves.toBeDefined();
    });
  });

  describe('getLogById', () => {
    it('should require id parameter', async () => {
      await expect(logsApi.getLogById(null as any)).rejects.toThrow(RequiredError);
    });

    it('should accept valid id', async () => {
      const mockResponse = mockSuccessResponse({ id: 'log_123' });
      mockAxios.request.mockResolvedValue(mockResponse);
      await expect(logsApi.getLogById('log_123')).resolves.toBeDefined();
    });
  });
});
