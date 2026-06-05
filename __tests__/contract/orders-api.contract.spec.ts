import { OrdersApi } from '../../api/orders-api';
import { Configuration } from '../../configuration';
import { RequiredError } from '../../base';
import { OrderRequest, OrderUpdateRequest, OrderRefundRequest } from '../../model';
import { createMockAxios, mockSuccessResponse } from './helpers/mock-axios';
import { createMockConfiguration } from './helpers/contract-validators';

describe('OrdersApi - Contract Tests', () => {
  let ordersApi: OrdersApi;
  let mockAxios: ReturnType<typeof createMockAxios>;
  let config: Configuration;

  beforeEach(() => {
    config = new Configuration(createMockConfiguration());
    mockAxios = createMockAxios();
    ordersApi = new OrdersApi(config, 'https://api.digitalfemsa.io', mockAxios as any);
  });

  describe('createOrder', () => {
    const validOrderRequest: OrderRequest = {
      currency: 'MXN',
      customer_info: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+5215555555555',
      },
      line_items: [
        {
          name: 'Product Test',
          unit_price: 10000,
          quantity: 1,
        },
      ],
    };

    it('should require orderRequest parameter', async () => {
      await expect(
        ordersApi.createOrder(null as any)
      ).rejects.toThrow(RequiredError);

      await expect(
        ordersApi.createOrder(undefined as any)
      ).rejects.toThrow(RequiredError);
    });

    it('should validate OrderRequest has required fields', async () => {
      const mockResponse = mockSuccessResponse({
        id: 'ord_123',
        object: 'order',
        currency: 'MXN',
        customer_info: validOrderRequest.customer_info,
        line_items: validOrderRequest.line_items,
      });

      mockAxios.request.mockResolvedValue(mockResponse);

      const response = await ordersApi.createOrder(validOrderRequest);

      expect(response.data).toHaveProperty('id');
      expect(response.data).toHaveProperty('currency');
    });

    it('should accept valid OrderRequest with all required fields', async () => {
      const mockResponse = mockSuccessResponse({ id: 'ord_123' });
      mockAxios.request.mockResolvedValue(mockResponse);

      await expect(ordersApi.createOrder(validOrderRequest)).resolves.toBeDefined();
    });

    it('should call correct endpoint with POST method', async () => {
      const mockResponse = mockSuccessResponse({ id: 'ord_123' });
      mockAxios.request.mockResolvedValue(mockResponse);

      await ordersApi.createOrder(validOrderRequest);

      expect(mockAxios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'POST',
          url: expect.stringContaining('/orders'),
        })
      );
    });
  });

  describe('getOrderById', () => {
    it('should require id parameter', async () => {
      await expect(
        ordersApi.getOrderById(null as any)
      ).rejects.toThrow(RequiredError);

      await expect(
        ordersApi.getOrderById(undefined as any)
      ).rejects.toThrow(RequiredError);
    });

    it('should accept valid id parameter', async () => {
      const mockResponse = mockSuccessResponse({ id: 'ord_123', object: 'order' });
      mockAxios.request.mockResolvedValue(mockResponse);

      await expect(ordersApi.getOrderById('ord_123')).resolves.toBeDefined();
    });

    it('should call correct endpoint with GET method', async () => {
      const mockResponse = mockSuccessResponse({ id: 'ord_123' });
      mockAxios.request.mockResolvedValue(mockResponse);

      await ordersApi.getOrderById('ord_123');

      expect(mockAxios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'GET',
          url: expect.stringContaining('/orders/ord_123'),
        })
      );
    });
  });

  describe('updateOrder', () => {
    const validUpdateRequest: OrderUpdateRequest = {
      currency: 'MXN',
      customer_info: {
        name: 'John Updated',
        email: 'john.updated@example.com',
      },
      line_items: [
        {
          name: 'Updated Product',
          unit_price: 15000,
          quantity: 2,
        },
      ],
    };

    it('should require id parameter', async () => {
      await expect(
        ordersApi.updateOrder(null as any, validUpdateRequest)
      ).rejects.toThrow(RequiredError);
    });

    it('should require orderUpdateRequest parameter', async () => {
      await expect(
        ordersApi.updateOrder('ord_123', null as any)
      ).rejects.toThrow(RequiredError);
    });

    it('should accept valid parameters', async () => {
      const mockResponse = mockSuccessResponse({ id: 'ord_123' });
      mockAxios.request.mockResolvedValue(mockResponse);

      await expect(
        ordersApi.updateOrder('ord_123', validUpdateRequest)
      ).resolves.toBeDefined();
    });

    it('should call correct endpoint with PUT method', async () => {
      const mockResponse = mockSuccessResponse({ id: 'ord_123' });
      mockAxios.request.mockResolvedValue(mockResponse);

      await ordersApi.updateOrder('ord_123', validUpdateRequest);

      expect(mockAxios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'PUT',
          url: expect.stringContaining('/orders/ord_123'),
        })
      );
    });
  });

  describe('cancelOrder', () => {
    it('should require id parameter', async () => {
      await expect(
        ordersApi.cancelOrder(null as any)
      ).rejects.toThrow(RequiredError);
    });

    it('should accept valid id parameter', async () => {
      const mockResponse = mockSuccessResponse({ id: 'ord_123', status: 'cancelled' });
      mockAxios.request.mockResolvedValue(mockResponse);

      await expect(ordersApi.cancelOrder('ord_123')).resolves.toBeDefined();
    });
  });

  describe('orderRefund', () => {
    const validRefundRequest: OrderRefundRequest = {
      amount: 5000,
      reason: 'requested_by_client',
    };

    it('should require id parameter', async () => {
      await expect(
        ordersApi.orderRefund(null as any, validRefundRequest)
      ).rejects.toThrow(RequiredError);
    });

    it('should require orderRefundRequest parameter', async () => {
      await expect(
        ordersApi.orderRefund('ord_123', null as any)
      ).rejects.toThrow(RequiredError);
    });

    it('should accept valid parameters', async () => {
      const mockResponse = mockSuccessResponse({ id: 'ord_123', refunds: [] });
      mockAxios.request.mockResolvedValue(mockResponse);

      await expect(
        ordersApi.orderRefund('ord_123', validRefundRequest)
      ).resolves.toBeDefined();
    });
  });

  describe('orderCancelRefund', () => {
    it('should require id parameter', async () => {
      await expect(
        ordersApi.orderCancelRefund(null as any, 'ref_123')
      ).rejects.toThrow(RequiredError);
    });

    it('should require refundId parameter', async () => {
      await expect(
        ordersApi.orderCancelRefund('ord_123', null as any)
      ).rejects.toThrow(RequiredError);
    });

    it('should accept valid parameters', async () => {
      const mockResponse = mockSuccessResponse({ id: 'ord_123' });
      mockAxios.request.mockResolvedValue(mockResponse);

      await expect(
        ordersApi.orderCancelRefund('ord_123', 'ref_123')
      ).resolves.toBeDefined();
    });
  });

  describe('getOrders', () => {
    it('should work without parameters (all optional)', async () => {
      const mockResponse = mockSuccessResponse({
        data: [],
        has_more: false,
        object: 'list',
      });
      mockAxios.request.mockResolvedValue(mockResponse);

      await expect(ordersApi.getOrders()).resolves.toBeDefined();
    });

    it('should accept optional pagination parameters', async () => {
      const mockResponse = mockSuccessResponse({ data: [], has_more: false });
      mockAxios.request.mockResolvedValue(mockResponse);

      await expect(
        ordersApi.getOrders(undefined, undefined, 10, 'search_term')
      ).resolves.toBeDefined();
    });
  });

  describe('ordersCreateCapture', () => {
    it('should require id parameter', async () => {
      await expect(
        ordersApi.ordersCreateCapture(null as any)
      ).rejects.toThrow(RequiredError);
    });

    it('should accept valid id with optional capture request', async () => {
      const mockResponse = mockSuccessResponse({ id: 'ord_123', status: 'captured' });
      mockAxios.request.mockResolvedValue(mockResponse);

      await expect(
        ordersApi.ordersCreateCapture('ord_123', undefined, undefined, { amount: 10000 })
      ).resolves.toBeDefined();
    });
  });
});
