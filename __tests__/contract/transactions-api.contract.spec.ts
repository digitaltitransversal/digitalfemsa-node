import { TransactionsApi } from '../../api/transactions-api';
import { Configuration } from '../../configuration';
import { RequiredError } from '../../base';
import { createMockAxios, mockSuccessResponse } from './helpers/mock-axios';
import { createMockConfiguration } from './helpers/contract-validators';

describe('TransactionsApi - Contract Tests', () => {
  let transactionsApi: TransactionsApi;
  let mockAxios: ReturnType<typeof createMockAxios>;

  beforeEach(() => {
    const config = new Configuration(createMockConfiguration());
    mockAxios = createMockAxios();
    transactionsApi = new TransactionsApi(config, 'https://api.digitalfemsa.io', mockAxios as any);
  });

  describe('getTransactions', () => {
    it('should work without parameters', async () => {
      const mockResponse = mockSuccessResponse({ data: [] });
      mockAxios.request.mockResolvedValue(mockResponse);
      await expect(transactionsApi.getTransactions()).resolves.toBeDefined();
    });
  });

  describe('getTransaction', () => {
    it('should require id parameter', async () => {
      await expect(transactionsApi.getTransaction(null as any)).rejects.toThrow(RequiredError);
    });

    it('should accept valid id', async () => {
      const mockResponse = mockSuccessResponse({ id: 'txn_123' });
      mockAxios.request.mockResolvedValue(mockResponse);
      await expect(transactionsApi.getTransaction('txn_123')).resolves.toBeDefined();
    });
  });
});
