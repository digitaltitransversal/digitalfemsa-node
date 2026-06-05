import { ShippingsApi } from '../../api/shippings-api';
import { Configuration } from '../../configuration';
import { RequiredError } from '../../base';
import { createMockAxios, mockSuccessResponse } from './helpers/mock-axios';
import { createMockConfiguration } from './helpers/contract-validators';

describe('ShippingsApi - Contract Tests', () => {
  let shippingsApi: ShippingsApi;
  let mockAxios: ReturnType<typeof createMockAxios>;

  beforeEach(() => {
    const config = new Configuration(createMockConfiguration());
    mockAxios = createMockAxios();
    shippingsApi = new ShippingsApi(config, 'https://api.digitalfemsa.io', mockAxios as any);
  });

  describe('ordersCreateShipping', () => {
    it('should require id and shippingRequest parameters', async () => {
      await expect(shippingsApi.ordersCreateShipping(null as any, {} as any)).rejects.toThrow(RequiredError);
      await expect(shippingsApi.ordersCreateShipping('ord_123', null as any)).rejects.toThrow(RequiredError);
    });
  });

  describe('ordersDeleteShipping', () => {
    it('should require id and shipping_id parameters', async () => {
      await expect(shippingsApi.ordersDeleteShipping(null as any, 'ship_123')).rejects.toThrow(RequiredError);
      await expect(shippingsApi.ordersDeleteShipping('ord_123', null as any)).rejects.toThrow(RequiredError);
    });
  });

  describe('ordersUpdateShipping', () => {
    it('should require id, shipping_id and shippingRequest parameters', async () => {
      await expect(shippingsApi.ordersUpdateShipping(null as any, 'ship_123', {} as any)).rejects.toThrow(RequiredError);
      await expect(shippingsApi.ordersUpdateShipping('ord_123', null as any, {} as any)).rejects.toThrow(RequiredError);
      await expect(shippingsApi.ordersUpdateShipping('ord_123', 'ship_123', null as any)).rejects.toThrow(RequiredError);
    });
  });
});
