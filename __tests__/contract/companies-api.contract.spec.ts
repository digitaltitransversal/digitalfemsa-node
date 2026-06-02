import { CompaniesApi } from '../../api/companies-api';
import { Configuration } from '../../configuration';
import { RequiredError } from '../../base';
import { createMockAxios, mockSuccessResponse } from './helpers/mock-axios';
import { createMockConfiguration } from './helpers/contract-validators';

describe('CompaniesApi - Contract Tests', () => {
  let companiesApi: CompaniesApi;
  let mockAxios: ReturnType<typeof createMockAxios>;

  beforeEach(() => {
    const config = new Configuration(createMockConfiguration());
    mockAxios = createMockAxios();
    companiesApi = new CompaniesApi(config, 'https://api.digitalfemsa.io', mockAxios as any);
  });

  describe('getCompanies', () => {
    it('should work without parameters', async () => {
      const mockResponse = mockSuccessResponse({ data: [] });
      mockAxios.request.mockResolvedValue(mockResponse);
      await expect(companiesApi.getCompanies()).resolves.toBeDefined();
    });
  });

  describe('getCompany', () => {
    it('should require id parameter', async () => {
      await expect(companiesApi.getCompany(null as any)).rejects.toThrow(RequiredError);
    });

    it('should accept valid id', async () => {
      const mockResponse = mockSuccessResponse({ id: 'comp_123' });
      mockAxios.request.mockResolvedValue(mockResponse);
      await expect(companiesApi.getCompany('comp_123')).resolves.toBeDefined();
    });
  });
});
