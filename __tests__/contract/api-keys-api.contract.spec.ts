import { ApiKeysApi } from '../../api/api-keys-api';
import { Configuration } from '../../configuration';
import { RequiredError } from '../../base';
import { ApiKeyRequest } from '../../model';
import { createMockAxios, mockSuccessResponse } from './helpers/mock-axios';
import { createMockConfiguration } from './helpers/contract-validators';

describe('ApiKeysApi - Contract Tests', () => {
  let apiKeysApi: ApiKeysApi;
  let mockAxios: ReturnType<typeof createMockAxios>;
  let config: Configuration;

  beforeEach(() => {
    config = new Configuration(createMockConfiguration());
    mockAxios = createMockAxios();
    apiKeysApi = new ApiKeysApi(config, 'https://api.digitalfemsa.io', mockAxios as any);
  });

  describe('createApiKey', () => {
    const validApiKey: ApiKeyRequest = {
      role: 'private',
      description: 'Test API Key',
    };

    it('should require apiKeyRequest parameter', async () => {
      await expect(apiKeysApi.createApiKey(null as any)).rejects.toThrow(RequiredError);
    });

    it('should accept valid ApiKeyRequest', async () => {
      const mockResponse = mockSuccessResponse({ id: 'key_123' });
      mockAxios.request.mockResolvedValue(mockResponse);
      await expect(apiKeysApi.createApiKey(validApiKey)).resolves.toBeDefined();
    });
  });

  describe('getApiKeys', () => {
    it('should work without parameters', async () => {
      const mockResponse = mockSuccessResponse({ data: [] });
      mockAxios.request.mockResolvedValue(mockResponse);
      await expect(apiKeysApi.getApiKeys()).resolves.toBeDefined();
    });
  });

  describe('deleteApiKey', () => {
    it('should require id parameter', async () => {
      await expect(apiKeysApi.deleteApiKey(null as any)).rejects.toThrow(RequiredError);
    });

    it('should accept valid id', async () => {
      const mockResponse = mockSuccessResponse({ deleted: true });
      mockAxios.request.mockResolvedValue(mockResponse);
      await expect(apiKeysApi.deleteApiKey('key_123')).resolves.toBeDefined();
    });
  });
});
