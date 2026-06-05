import { WebhookKeysApi } from '../../api/webhook-keys-api';
import { Configuration } from '../../configuration';
import { RequiredError } from '../../base';
import { createMockAxios, mockSuccessResponse } from './helpers/mock-axios';
import { createMockConfiguration } from './helpers/contract-validators';

describe('WebhookKeysApi - Contract Tests', () => {
  let webhookKeysApi: WebhookKeysApi;
  let mockAxios: ReturnType<typeof createMockAxios>;

  beforeEach(() => {
    const config = new Configuration(createMockConfiguration());
    mockAxios = createMockAxios();
    webhookKeysApi = new WebhookKeysApi(config, 'https://api.digitalfemsa.io', mockAxios as any);
  });

  describe('createWebhookKey', () => {
    it('should work without parameters', async () => {
      const mockResponse = mockSuccessResponse({ id: 'key_123' });
      mockAxios.request.mockResolvedValue(mockResponse);
      await expect(webhookKeysApi.createWebhookKey()).resolves.toBeDefined();
    });
  });

  describe('getWebhookKeys', () => {
    it('should work without parameters', async () => {
      const mockResponse = mockSuccessResponse({ data: [] });
      mockAxios.request.mockResolvedValue(mockResponse);
      await expect(webhookKeysApi.getWebhookKeys()).resolves.toBeDefined();
    });
  });

  describe('deleteWebhookKey', () => {
    it('should require id parameter', async () => {
      await expect(webhookKeysApi.deleteWebhookKey(null as any)).rejects.toThrow(RequiredError);
    });

    it('should accept valid id', async () => {
      const mockResponse = mockSuccessResponse({ deleted: true });
      mockAxios.request.mockResolvedValue(mockResponse);
      await expect(webhookKeysApi.deleteWebhookKey('key_123')).resolves.toBeDefined();
    });
  });
});
