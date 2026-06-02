import { PaymentMethodsApi } from '../../api/payment-methods-api';
import { Configuration } from '../../configuration';
import { RequiredError } from '../../base';
import { createMockAxios, mockSuccessResponse } from './helpers/mock-axios';
import { createMockConfiguration } from './helpers/contract-validators';

describe('PaymentMethodsApi - Contract Tests', () => {
  let paymentMethodsApi: PaymentMethodsApi;
  let mockAxios: ReturnType<typeof createMockAxios>;
  let config: Configuration;

  beforeEach(() => {
    config = new Configuration(createMockConfiguration());
    mockAxios = createMockAxios();
    paymentMethodsApi = new PaymentMethodsApi(config, 'https://api.digitalfemsa.io', mockAxios as any);
  });

  describe('getCustomerPaymentMethods', () => {
    it('should require id parameter', async () => {
      await expect(
        paymentMethodsApi.getCustomerPaymentMethods(null as any)
      ).rejects.toThrow(RequiredError);

      await expect(
        paymentMethodsApi.getCustomerPaymentMethods(undefined as any)
      ).rejects.toThrow(RequiredError);
    });

    it('should accept valid id parameter', async () => {
      const mockResponse = mockSuccessResponse({
        data: [],
        has_more: false,
        object: 'list',
      });
      mockAxios.request.mockResolvedValue(mockResponse);

      await expect(
        paymentMethodsApi.getCustomerPaymentMethods('cus_123')
      ).resolves.toBeDefined();
    });

    it('should call correct endpoint with GET method', async () => {
      const mockResponse = mockSuccessResponse({ data: [] });
      mockAxios.request.mockResolvedValue(mockResponse);

      await paymentMethodsApi.getCustomerPaymentMethods('cus_123');

      expect(mockAxios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'GET',
          url: expect.stringContaining('/customers/cus_123/payment_sources'),
        })
      );
    });
  });

  describe('createCustomerPaymentMethods', () => {
    const validPaymentMethod = {
      type: 'card',
      token_id: 'tok_test_visa_4242',
    };

    it('should require id parameter', async () => {
      await expect(
        paymentMethodsApi.createCustomerPaymentMethods(null as any, validPaymentMethod)
      ).rejects.toThrow(RequiredError);
    });

    it('should require createCustomerPaymentMethodsRequest parameter', async () => {
      await expect(
        paymentMethodsApi.createCustomerPaymentMethods('cus_123', null as any)
      ).rejects.toThrow(RequiredError);
    });

    it('should accept valid parameters', async () => {
      const mockResponse = mockSuccessResponse({
        id: 'src_123',
        type: 'card',
      });
      mockAxios.request.mockResolvedValue(mockResponse);

      await expect(
        paymentMethodsApi.createCustomerPaymentMethods('cus_123', validPaymentMethod)
      ).resolves.toBeDefined();
    });

    it('should call correct endpoint with POST method', async () => {
      const mockResponse = mockSuccessResponse({ id: 'src_123' });
      mockAxios.request.mockResolvedValue(mockResponse);

      await paymentMethodsApi.createCustomerPaymentMethods('cus_123', validPaymentMethod);

      expect(mockAxios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'POST',
          url: expect.stringContaining('/customers/cus_123/payment_sources'),
        })
      );
    });
  });

  describe('updateCustomerPaymentMethods', () => {
    const validUpdate = {
      name: 'Updated Card Name',
    };

    it('should require id parameter', async () => {
      await expect(
        paymentMethodsApi.updateCustomerPaymentMethods(null as any, 'src_123', validUpdate)
      ).rejects.toThrow(RequiredError);
    });

    it('should require payment_method_id parameter', async () => {
      await expect(
        paymentMethodsApi.updateCustomerPaymentMethods('cus_123', null as any, validUpdate)
      ).rejects.toThrow(RequiredError);
    });

    it('should require updatePaymentMethods parameter', async () => {
      await expect(
        paymentMethodsApi.updateCustomerPaymentMethods('cus_123', 'src_123', null as any)
      ).rejects.toThrow(RequiredError);
    });

    it('should accept valid parameters', async () => {
      const mockResponse = mockSuccessResponse({ id: 'src_123' });
      mockAxios.request.mockResolvedValue(mockResponse);

      await expect(
        paymentMethodsApi.updateCustomerPaymentMethods('cus_123', 'src_123', validUpdate)
      ).resolves.toBeDefined();
    });
  });

  describe('deleteCustomerPaymentMethods', () => {
    it('should require id parameter', async () => {
      await expect(
        paymentMethodsApi.deleteCustomerPaymentMethods(null as any, 'src_123')
      ).rejects.toThrow(RequiredError);
    });

    it('should require payment_method_id parameter', async () => {
      await expect(
        paymentMethodsApi.deleteCustomerPaymentMethods('cus_123', null as any)
      ).rejects.toThrow(RequiredError);
    });

    it('should accept valid parameters', async () => {
      const mockResponse = mockSuccessResponse({
        id: 'src_123',
        deleted: true,
      });
      mockAxios.request.mockResolvedValue(mockResponse);

      await expect(
        paymentMethodsApi.deleteCustomerPaymentMethods('cus_123', 'src_123')
      ).resolves.toBeDefined();
    });

    it('should call correct endpoint with DELETE method', async () => {
      const mockResponse = mockSuccessResponse({ id: 'src_123' });
      mockAxios.request.mockResolvedValue(mockResponse);

      await paymentMethodsApi.deleteCustomerPaymentMethods('cus_123', 'src_123');

      expect(mockAxios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'DELETE',
          url: expect.stringContaining('/customers/cus_123/payment_sources/src_123'),
        })
      );
    });
  });
});
