import { ChargesApi } from '../../api/charges-api';
import { Configuration } from '../../configuration';
import { RequiredError } from '../../base';
import { createMockAxios, mockSuccessResponse } from './helpers/mock-axios';
import { createMockConfiguration } from './helpers/contract-validators';

describe('ChargesApi - Contract Tests', () => {
  let chargesApi: ChargesApi;
  let mockAxios: ReturnType<typeof createMockAxios>;

  beforeEach(() => {
    const config = new Configuration(createMockConfiguration());
    mockAxios = createMockAxios();
    chargesApi = new ChargesApi(config, 'https://api.digitalfemsa.io', mockAxios as any);
  });

  describe('getCharges', () => {
    it('should work without parameters', async () => {
      const mockResponse = mockSuccessResponse({ data: [] });
      mockAxios.request.mockResolvedValue(mockResponse);
      await expect(chargesApi.getCharges()).resolves.toBeDefined();
    });
  });

  describe('ordersCreateCharge', () => {
    it('should require id parameter', async () => {
      await expect(chargesApi.ordersCreateCharge(null as any, {} as any)).rejects.toThrow(RequiredError);
    });

    it('should require chargeRequest parameter', async () => {
      await expect(chargesApi.ordersCreateCharge('ord_123', null as any)).rejects.toThrow(RequiredError);
    });
  });

  describe('updateCharge', () => {
    it('should require id parameter', async () => {
      await expect(chargesApi.updateCharge(null as any, {} as any)).rejects.toThrow(RequiredError);
    });
  });
});
