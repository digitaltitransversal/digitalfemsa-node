import { DiscountsApi } from '../../api/discounts-api';
import { Configuration } from '../../configuration';
import { RequiredError } from '../../base';
import { createMockAxios, mockSuccessResponse } from './helpers/mock-axios';
import { createMockConfiguration } from './helpers/contract-validators';

describe('DiscountsApi - Contract Tests', () => {
  let discountsApi: DiscountsApi;
  let mockAxios: ReturnType<typeof createMockAxios>;

  beforeEach(() => {
    const config = new Configuration(createMockConfiguration());
    mockAxios = createMockAxios();
    discountsApi = new DiscountsApi(config, 'https://api.digitalfemsa.io', mockAxios as any);
  });

  describe('ordersCreateDiscountLine', () => {
    it('should require id parameter', async () => {
      await expect(discountsApi.ordersCreateDiscountLine(null as any, {} as any)).rejects.toThrow(RequiredError);
    });

    it('should require orderDiscountLinesRequest parameter', async () => {
      await expect(discountsApi.ordersCreateDiscountLine('ord_123', null as any)).rejects.toThrow(RequiredError);
    });
  });

  describe('ordersDeleteDiscountLines', () => {
    it('should require id and discount_lines_id parameters', async () => {
      await expect(discountsApi.ordersDeleteDiscountLines(null as any, 'disc_123')).rejects.toThrow(RequiredError);
      await expect(discountsApi.ordersDeleteDiscountLines('ord_123', null as any)).rejects.toThrow(RequiredError);
    });
  });

  describe('ordersGetDiscountLine', () => {
    it('should require id and discount_lines_id parameters', async () => {
      await expect(discountsApi.ordersGetDiscountLine(null as any, 'disc_123')).rejects.toThrow(RequiredError);
      await expect(discountsApi.ordersGetDiscountLine('ord_123', null as any)).rejects.toThrow(RequiredError);
    });
  });
});
