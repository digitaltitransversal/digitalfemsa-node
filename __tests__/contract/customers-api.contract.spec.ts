import { CustomersApi } from '../../api/customers-api';
import { Configuration } from '../../configuration';
import { RequiredError } from '../../base';
import { Customer, UpdateCustomer, CustomerFiscalEntitiesRequest } from '../../model';
import { createMockAxios, mockSuccessResponse } from './helpers/mock-axios';
import { createMockConfiguration } from './helpers/contract-validators';

describe('CustomersApi - Contract Tests', () => {
  let customersApi: CustomersApi;
  let mockAxios: ReturnType<typeof createMockAxios>;
  let config: Configuration;

  beforeEach(() => {
    config = new Configuration(createMockConfiguration());
    mockAxios = createMockAxios();
    customersApi = new CustomersApi(config, 'https://api.digitalfemsa.io', mockAxios as any);
  });

  describe('createCustomer', () => {
    const validCustomer: Customer = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+5215555555555',
    };

    it('should require customer parameter', async () => {
      await expect(
        customersApi.createCustomer(null as any)
      ).rejects.toThrow(RequiredError);

      await expect(
        customersApi.createCustomer(undefined as any)
      ).rejects.toThrow(RequiredError);
    });

    it('should accept valid Customer with required fields', async () => {
      const mockResponse = mockSuccessResponse({
        id: 'cus_123',
        object: 'customer',
        name: validCustomer.name,
        email: validCustomer.email,
      });
      mockAxios.request.mockResolvedValue(mockResponse);

      await expect(customersApi.createCustomer(validCustomer)).resolves.toBeDefined();
    });

    it('should call correct endpoint with POST method', async () => {
      const mockResponse = mockSuccessResponse({ id: 'cus_123' });
      mockAxios.request.mockResolvedValue(mockResponse);

      await customersApi.createCustomer(validCustomer);

      expect(mockAxios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'POST',
          url: expect.stringContaining('/customers'),
        })
      );
    });
  });

  describe('getCustomerById', () => {
    it('should require id parameter', async () => {
      await expect(
        customersApi.getCustomerById(null as any)
      ).rejects.toThrow(RequiredError);

      await expect(
        customersApi.getCustomerById(undefined as any)
      ).rejects.toThrow(RequiredError);
    });

    it('should accept valid id parameter', async () => {
      const mockResponse = mockSuccessResponse({ id: 'cus_123', object: 'customer' });
      mockAxios.request.mockResolvedValue(mockResponse);

      await expect(customersApi.getCustomerById('cus_123')).resolves.toBeDefined();
    });

    it('should call correct endpoint with GET method', async () => {
      const mockResponse = mockSuccessResponse({ id: 'cus_123' });
      mockAxios.request.mockResolvedValue(mockResponse);

      await customersApi.getCustomerById('cus_123');

      expect(mockAxios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'GET',
          url: expect.stringContaining('/customers/cus_123'),
        })
      );
    });
  });

  describe('updateCustomer', () => {
    const validUpdateCustomer: UpdateCustomer = {
      name: 'John Updated',
      email: 'john.updated@example.com',
    };

    it('should require id parameter', async () => {
      await expect(
        customersApi.updateCustomer(null as any, validUpdateCustomer)
      ).rejects.toThrow(RequiredError);
    });

    it('should require updateCustomer parameter', async () => {
      await expect(
        customersApi.updateCustomer('cus_123', null as any)
      ).rejects.toThrow(RequiredError);
    });

    it('should accept valid parameters', async () => {
      const mockResponse = mockSuccessResponse({ id: 'cus_123' });
      mockAxios.request.mockResolvedValue(mockResponse);

      await expect(
        customersApi.updateCustomer('cus_123', validUpdateCustomer)
      ).resolves.toBeDefined();
    });

    it('should call correct endpoint with PUT method', async () => {
      const mockResponse = mockSuccessResponse({ id: 'cus_123' });
      mockAxios.request.mockResolvedValue(mockResponse);

      await customersApi.updateCustomer('cus_123', validUpdateCustomer);

      expect(mockAxios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'PUT',
          url: expect.stringContaining('/customers/cus_123'),
        })
      );
    });
  });

  describe('deleteCustomerById', () => {
    it('should require id parameter', async () => {
      await expect(
        customersApi.deleteCustomerById(null as any)
      ).rejects.toThrow(RequiredError);
    });

    it('should accept valid id parameter', async () => {
      const mockResponse = mockSuccessResponse({ id: 'cus_123', deleted: true });
      mockAxios.request.mockResolvedValue(mockResponse);

      await expect(customersApi.deleteCustomerById('cus_123')).resolves.toBeDefined();
    });

    it('should call correct endpoint with DELETE method', async () => {
      const mockResponse = mockSuccessResponse({ id: 'cus_123' });
      mockAxios.request.mockResolvedValue(mockResponse);

      await customersApi.deleteCustomerById('cus_123');

      expect(mockAxios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'DELETE',
          url: expect.stringContaining('/customers/cus_123'),
        })
      );
    });
  });

  describe('getCustomers', () => {
    it('should work without parameters (all optional)', async () => {
      const mockResponse = mockSuccessResponse({
        data: [],
        has_more: false,
        object: 'list',
      });
      mockAxios.request.mockResolvedValue(mockResponse);

      await expect(customersApi.getCustomers()).resolves.toBeDefined();
    });

    it('should accept optional pagination parameters', async () => {
      const mockResponse = mockSuccessResponse({ data: [], has_more: false });
      mockAxios.request.mockResolvedValue(mockResponse);

      await expect(
        customersApi.getCustomers(undefined, undefined, 10, 'search_term')
      ).resolves.toBeDefined();
    });
  });

  describe('createCustomerFiscalEntities', () => {
    const validFiscalEntity: CustomerFiscalEntitiesRequest = {
      tax_id: 'RFC123456789',
      name: 'Company Name SA de CV',
      address: {
        street1: 'Street 123',
        city: 'Mexico City',
        state: 'CDMX',
        country: 'MX',
        postal_code: '12345',
      },
    };

    it('should require id parameter', async () => {
      await expect(
        customersApi.createCustomerFiscalEntities(null as any, validFiscalEntity)
      ).rejects.toThrow(RequiredError);
    });

    it('should require customerFiscalEntitiesRequest parameter', async () => {
      await expect(
        customersApi.createCustomerFiscalEntities('cus_123', null as any)
      ).rejects.toThrow(RequiredError);
    });

    it('should accept valid parameters', async () => {
      const mockResponse = mockSuccessResponse({ id: 'fiscal_123' });
      mockAxios.request.mockResolvedValue(mockResponse);

      await expect(
        customersApi.createCustomerFiscalEntities('cus_123', validFiscalEntity)
      ).resolves.toBeDefined();
    });
  });
});
