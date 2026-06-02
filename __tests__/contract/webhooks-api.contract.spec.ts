import { WebhooksApi } from '../../api/webhooks-api';
import { Configuration } from '../../configuration';
import { RequiredError } from '../../base';
import { WebhookRequest, WebhookUpdateRequest } from '../../model';
import { createMockAxios, mockSuccessResponse } from './helpers/mock-axios';
import { createMockConfiguration } from './helpers/contract-validators';

describe('WebhooksApi - Contract Tests', () => {
  let webhooksApi: WebhooksApi;
  let mockAxios: ReturnType<typeof createMockAxios>;
  let config: Configuration;

  beforeEach(() => {
    config = new Configuration(createMockConfiguration());
    mockAxios = createMockAxios();
    webhooksApi = new WebhooksApi(config, 'https://api.digitalfemsa.io', mockAxios as any);
  });

  describe('createWebhook', () => {
    const validWebhook: WebhookRequest = {
      url: 'https://example.com/webhook',
      synchronous: false,
    };

    it('should require webhookRequest parameter', async () => {
      await expect(
        webhooksApi.createWebhook(null as any)
      ).rejects.toThrow(RequiredError);

      await expect(
        webhooksApi.createWebhook(undefined as any)
      ).rejects.toThrow(RequiredError);
    });

    it('should accept valid WebhookRequest', async () => {
      const mockResponse = mockSuccessResponse({
        id: 'webhook_123',
        url: validWebhook.url,
        status: 'active',
      });
      mockAxios.request.mockResolvedValue(mockResponse);

      await expect(webhooksApi.createWebhook(validWebhook)).resolves.toBeDefined();
    });

    it('should call correct endpoint with POST method', async () => {
      const mockResponse = mockSuccessResponse({ id: 'webhook_123' });
      mockAxios.request.mockResolvedValue(mockResponse);

      await webhooksApi.createWebhook(validWebhook);

      expect(mockAxios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'POST',
          url: expect.stringContaining('/webhooks'),
        })
      );
    });
  });

  describe('getWebhook', () => {
    it('should require id parameter', async () => {
      await expect(
        webhooksApi.getWebhook(null as any)
      ).rejects.toThrow(RequiredError);

      await expect(
        webhooksApi.getWebhook(undefined as any)
      ).rejects.toThrow(RequiredError);
    });

    it('should accept valid id parameter', async () => {
      const mockResponse = mockSuccessResponse({
        id: 'webhook_123',
        url: 'https://example.com/webhook',
      });
      mockAxios.request.mockResolvedValue(mockResponse);

      await expect(webhooksApi.getWebhook('webhook_123')).resolves.toBeDefined();
    });

    it('should call correct endpoint with GET method', async () => {
      const mockResponse = mockSuccessResponse({ id: 'webhook_123' });
      mockAxios.request.mockResolvedValue(mockResponse);

      await webhooksApi.getWebhook('webhook_123');

      expect(mockAxios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'GET',
          url: expect.stringContaining('/webhooks/webhook_123'),
        })
      );
    });
  });

  describe('updateWebhook', () => {
    const validUpdate: WebhookUpdateRequest = {
      url: 'https://example.com/webhook-updated',
    };

    it('should require id parameter', async () => {
      await expect(
        webhooksApi.updateWebhook(null as any, validUpdate)
      ).rejects.toThrow(RequiredError);
    });

    it('should require webhookUpdateRequest parameter', async () => {
      await expect(
        webhooksApi.updateWebhook('webhook_123', null as any)
      ).rejects.toThrow(RequiredError);
    });

    it('should accept valid parameters', async () => {
      const mockResponse = mockSuccessResponse({ id: 'webhook_123' });
      mockAxios.request.mockResolvedValue(mockResponse);

      await expect(
        webhooksApi.updateWebhook('webhook_123', validUpdate)
      ).resolves.toBeDefined();
    });

    it('should call correct endpoint with PUT method', async () => {
      const mockResponse = mockSuccessResponse({ id: 'webhook_123' });
      mockAxios.request.mockResolvedValue(mockResponse);

      await webhooksApi.updateWebhook('webhook_123', validUpdate);

      expect(mockAxios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'PUT',
          url: expect.stringContaining('/webhooks/webhook_123'),
        })
      );
    });
  });

  describe('deleteWebhook', () => {
    it('should require id parameter', async () => {
      await expect(
        webhooksApi.deleteWebhook(null as any)
      ).rejects.toThrow(RequiredError);
    });

    it('should accept valid id parameter', async () => {
      const mockResponse = mockSuccessResponse({
        id: 'webhook_123',
        deleted: true,
      });
      mockAxios.request.mockResolvedValue(mockResponse);

      await expect(webhooksApi.deleteWebhook('webhook_123')).resolves.toBeDefined();
    });

    it('should call correct endpoint with DELETE method', async () => {
      const mockResponse = mockSuccessResponse({ id: 'webhook_123' });
      mockAxios.request.mockResolvedValue(mockResponse);

      await webhooksApi.deleteWebhook('webhook_123');

      expect(mockAxios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'DELETE',
          url: expect.stringContaining('/webhooks/webhook_123'),
        })
      );
    });
  });

  describe('getWebhooks', () => {
    it('should work without parameters (all optional)', async () => {
      const mockResponse = mockSuccessResponse({
        data: [],
        has_more: false,
        object: 'list',
      });
      mockAxios.request.mockResolvedValue(mockResponse);

      await expect(webhooksApi.getWebhooks()).resolves.toBeDefined();
    });

    it('should accept optional pagination parameters', async () => {
      const mockResponse = mockSuccessResponse({ data: [], has_more: false });
      mockAxios.request.mockResolvedValue(mockResponse);

      await expect(
        webhooksApi.getWebhooks(undefined, undefined, 10, 'search_term')
      ).resolves.toBeDefined();
    });
  });

  describe('testWebhook', () => {
    it('should require id parameter', async () => {
      await expect(
        webhooksApi.testWebhook(null as any)
      ).rejects.toThrow(RequiredError);
    });

    it('should accept valid id parameter', async () => {
      const mockResponse = mockSuccessResponse({
        id: 'webhook_123',
        test_sent: true,
      });
      mockAxios.request.mockResolvedValue(mockResponse);

      await expect(webhooksApi.testWebhook('webhook_123')).resolves.toBeDefined();
    });
  });
});
