import { PaymentLinkApi } from '../../api/payment-link-api';
import { Configuration } from '../../configuration';
import { RequiredError } from '../../base';
import { createMockAxios, mockSuccessResponse } from './helpers/mock-axios';
import { createMockConfiguration } from './helpers/contract-validators';

describe('PaymentLinkApi - Contract Tests', () => {
  let paymentLinkApi: PaymentLinkApi;
  let mockAxios: ReturnType<typeof createMockAxios>;

  beforeEach(() => {
    const config = new Configuration(createMockConfiguration());
    mockAxios = createMockAxios();
    paymentLinkApi = new PaymentLinkApi(config, 'https://api.digitalfemsa.io', mockAxios as any);
  });

  describe('createCheckout', () => {
    it('should require checkoutRequest parameter', async () => {
      await expect(paymentLinkApi.createCheckout(null as any)).rejects.toThrow(RequiredError);
    });
  });

  describe('getCheckout', () => {
    it('should require id parameter', async () => {
      await expect(paymentLinkApi.getCheckout(null as any)).rejects.toThrow(RequiredError);
    });

    it('should accept valid id', async () => {
      const mockResponse = mockSuccessResponse({ id: 'checkout_123' });
      mockAxios.request.mockResolvedValue(mockResponse);
      await expect(paymentLinkApi.getCheckout('checkout_123')).resolves.toBeDefined();
    });
  });

  describe('getCheckouts', () => {
    it('should work without parameters', async () => {
      const mockResponse = mockSuccessResponse({ data: [] });
      mockAxios.request.mockResolvedValue(mockResponse);
      await expect(paymentLinkApi.getCheckouts()).resolves.toBeDefined();
    });
  });
});
