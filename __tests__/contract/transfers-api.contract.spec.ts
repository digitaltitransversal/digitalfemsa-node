import { TransfersApi } from '../../api/transfers-api';
import { Configuration } from '../../configuration';
import { RequiredError } from '../../base';
import { createMockAxios, mockSuccessResponse } from './helpers/mock-axios';
import { createMockConfiguration } from './helpers/contract-validators';

describe('TransfersApi - Contract Tests', () => {
  let transfersApi: TransfersApi;
  let mockAxios: ReturnType<typeof createMockAxios>;

  beforeEach(() => {
    const config = new Configuration(createMockConfiguration());
    mockAxios = createMockAxios();
    transfersApi = new TransfersApi(config, 'https://api.digitalfemsa.io', mockAxios as any);
  });

  describe('getTransfers', () => {
    it('should work without parameters', async () => {
      const mockResponse = mockSuccessResponse({ data: [] });
      mockAxios.request.mockResolvedValue(mockResponse);
      await expect(transfersApi.getTransfers()).resolves.toBeDefined();
    });
  });

  describe('getTransfer', () => {
    it('should require id parameter', async () => {
      await expect(transfersApi.getTransfer(null as any)).rejects.toThrow(RequiredError);
    });

    it('should accept valid id', async () => {
      const mockResponse = mockSuccessResponse({ id: 'transfer_123' });
      mockAxios.request.mockResolvedValue(mockResponse);
      await expect(transfersApi.getTransfer('transfer_123')).resolves.toBeDefined();
    });
  });
});
