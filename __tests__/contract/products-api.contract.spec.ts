import { ProductsApi } from '../../api/products-api';
import { Configuration } from '../../configuration';
import { RequiredError } from '../../base';
import { createMockAxios, mockSuccessResponse } from './helpers/mock-axios';
import { createMockConfiguration } from './helpers/contract-validators';

describe('ProductsApi - Contract Tests', () => {
  let productsApi: ProductsApi;
  let mockAxios: ReturnType<typeof createMockAxios>;

  beforeEach(() => {
    const config = new Configuration(createMockConfiguration());
    mockAxios = createMockAxios();
    productsApi = new ProductsApi(config, 'https://api.digitalfemsa.io', mockAxios as any);
  });

  describe('ordersCreateProduct', () => {
    it('should require id and product parameters', async () => {
      await expect(productsApi.ordersCreateProduct(null as any, {} as any)).rejects.toThrow(RequiredError);
      await expect(productsApi.ordersCreateProduct('ord_123', null as any)).rejects.toThrow(RequiredError);
    });
  });

  describe('ordersDeleteProduct', () => {
    it('should require id and line_item_id parameters', async () => {
      await expect(productsApi.ordersDeleteProduct(null as any, 'item_123')).rejects.toThrow(RequiredError);
      await expect(productsApi.ordersDeleteProduct('ord_123', null as any)).rejects.toThrow(RequiredError);
    });
  });

  describe('ordersUpdateProduct', () => {
    it('should require id, line_item_id and updateProduct parameters', async () => {
      await expect(productsApi.ordersUpdateProduct(null as any, 'item_123', {} as any)).rejects.toThrow(RequiredError);
      await expect(productsApi.ordersUpdateProduct('ord_123', null as any, {} as any)).rejects.toThrow(RequiredError);
      await expect(productsApi.ordersUpdateProduct('ord_123', 'item_123', null as any)).rejects.toThrow(RequiredError);
    });
  });
});
