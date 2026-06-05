import { EventsApi } from '../../api/events-api';
import { Configuration } from '../../configuration';
import { RequiredError } from '../../base';
import { createMockAxios, mockSuccessResponse } from './helpers/mock-axios';
import { createMockConfiguration } from './helpers/contract-validators';

describe('EventsApi - Contract Tests', () => {
  let eventsApi: EventsApi;
  let mockAxios: ReturnType<typeof createMockAxios>;

  beforeEach(() => {
    const config = new Configuration(createMockConfiguration());
    mockAxios = createMockAxios();
    eventsApi = new EventsApi(config, 'https://api.digitalfemsa.io', mockAxios as any);
  });

  describe('getEvents', () => {
    it('should work without parameters', async () => {
      const mockResponse = mockSuccessResponse({ data: [] });
      mockAxios.request.mockResolvedValue(mockResponse);
      await expect(eventsApi.getEvents()).resolves.toBeDefined();
    });
  });

  describe('getEvent', () => {
    it('should require id parameter', async () => {
      await expect(eventsApi.getEvent(null as any)).rejects.toThrow(RequiredError);
    });

    it('should accept valid id', async () => {
      const mockResponse = mockSuccessResponse({ id: 'event_123' });
      mockAxios.request.mockResolvedValue(mockResponse);
      await expect(eventsApi.getEvent('event_123')).resolves.toBeDefined();
    });
  });

  describe('resendEvent', () => {
    it('should require event_id parameter', async () => {
      await expect(eventsApi.resendEvent(null as any, 'log_123')).rejects.toThrow(RequiredError);
    });

    it('should require webhook_log_id parameter', async () => {
      await expect(eventsApi.resendEvent('event_123', null as any)).rejects.toThrow(RequiredError);
    });

    it('should accept valid parameters', async () => {
      const mockResponse = mockSuccessResponse({ success: true });
      mockAxios.request.mockResolvedValue(mockResponse);
      await expect(eventsApi.resendEvent('event_123', 'log_123')).resolves.toBeDefined();
    });
  });
});
