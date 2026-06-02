import { BalancesApi } from '../../api/balances-api';
import { Configuration } from '../../configuration';
import { createMockAxios, mockSuccessResponse } from './helpers/mock-axios';
import { createMockConfiguration } from './helpers/contract-validators';

describe('BalancesApi - Contract Tests', () => {
  let balancesApi: BalancesApi;
  let mockAxios: ReturnType<typeof createMockAxios>;

  beforeEach(() => {
    const config = new Configuration(createMockConfiguration());
    mockAxios = createMockAxios();
    balancesApi = new BalancesApi(config, 'https://api.digitalfemsa.io', mockAxios as any);
  });

  describe('getBalance', () => {
    it('should work without parameters', async () => {
      const mockResponse = mockSuccessResponse({ available: [], pending: [] });
      mockAxios.request.mockResolvedValue(mockResponse);
      await expect(balancesApi.getBalance()).resolves.toBeDefined();
    });
  });
});
