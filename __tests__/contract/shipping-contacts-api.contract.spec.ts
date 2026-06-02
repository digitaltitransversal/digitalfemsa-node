import { ShippingContactsApi } from '../../api/shipping-contacts-api';
import { Configuration } from '../../configuration';
import { RequiredError } from '../../base';
import { createMockAxios, mockSuccessResponse } from './helpers/mock-axios';
import { createMockConfiguration } from './helpers/contract-validators';

describe('ShippingContactsApi - Contract Tests', () => {
  let shippingContactsApi: ShippingContactsApi;
  let mockAxios: ReturnType<typeof createMockAxios>;

  beforeEach(() => {
    const config = new Configuration(createMockConfiguration());
    mockAxios = createMockAxios();
    shippingContactsApi = new ShippingContactsApi(config, 'https://api.digitalfemsa.io', mockAxios as any);
  });

  describe('createCustomerShippingContacts', () => {
    it('should require id and customerShippingContacts parameters', async () => {
      await expect(shippingContactsApi.createCustomerShippingContacts(null as any, {} as any)).rejects.toThrow(RequiredError);
      await expect(shippingContactsApi.createCustomerShippingContacts('cus_123', null as any)).rejects.toThrow(RequiredError);
    });
  });

  describe('deleteCustomerShippingContacts', () => {
    it('should require id and shipping_contacts_id parameters', async () => {
      await expect(shippingContactsApi.deleteCustomerShippingContacts(null as any, 'ship_123')).rejects.toThrow(RequiredError);
      await expect(shippingContactsApi.deleteCustomerShippingContacts('cus_123', null as any)).rejects.toThrow(RequiredError);
    });
  });

  describe('updateCustomerShippingContacts', () => {
    it('should require id, shipping_contacts_id and customerUpdateShippingContacts parameters', async () => {
      await expect(shippingContactsApi.updateCustomerShippingContacts(null as any, 'ship_123', {} as any)).rejects.toThrow(RequiredError);
      await expect(shippingContactsApi.updateCustomerShippingContacts('cus_123', null as any, {} as any)).rejects.toThrow(RequiredError);
      await expect(shippingContactsApi.updateCustomerShippingContacts('cus_123', 'ship_123', null as any)).rejects.toThrow(RequiredError);
    });
  });
});
