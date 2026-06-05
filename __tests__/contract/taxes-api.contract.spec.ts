import { TaxesApi } from '../../api/taxes-api';
import { Configuration } from '../../configuration';
import { RequiredError } from '../../base';
import { createMockAxios, mockSuccessResponse } from './helpers/mock-axios';
import { createMockConfiguration } from './helpers/contract-validators';

describe('TaxesApi - Contract Tests', () => {
  let taxesApi: TaxesApi;
  let mockAxios: ReturnType<typeof createMockAxios>;

  beforeEach(() => {
    const config = new Configuration(createMockConfiguration());
    mockAxios = createMockAxios();
    taxesApi = new TaxesApi(config, 'https://api.digitalfemsa.io', mockAxios as any);
  });

  describe('ordersCreateTaxes', () => {
    it('should require id and orderTaxRequest parameters', async () => {
      await expect(taxesApi.ordersCreateTaxes(null as any, {} as any)).rejects.toThrow(RequiredError);
      await expect(taxesApi.ordersCreateTaxes('ord_123', null as any)).rejects.toThrow(RequiredError);
    });
  });

  describe('ordersDeleteTaxes', () => {
    it('should require id and tax_id parameters', async () => {
      await expect(taxesApi.ordersDeleteTaxes(null as any, 'tax_123')).rejects.toThrow(RequiredError);
      await expect(taxesApi.ordersDeleteTaxes('ord_123', null as any)).rejects.toThrow(RequiredError);
    });
  });

  describe('ordersUpdateTaxes', () => {
    it('should require id, tax_id and updateOrderTaxRequest parameters', async () => {
      await expect(taxesApi.ordersUpdateTaxes(null as any, 'tax_123', {} as any)).rejects.toThrow(RequiredError);
      await expect(taxesApi.ordersUpdateTaxes('ord_123', null as any, {} as any)).rejects.toThrow(RequiredError);
      await expect(taxesApi.ordersUpdateTaxes('ord_123', 'tax_123', null as any)).rejects.toThrow(RequiredError);
    });
  });
});
