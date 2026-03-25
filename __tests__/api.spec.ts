import { Configuration } from '../configuration';
import { ApiKeysApi } from '../api/api-keys-api';
import { BalancesApi } from '../api/balances-api';
import { ChargesApi } from '../api/charges-api';
import { CompaniesApi } from '../api/companies-api';
import { CustomersApi } from '../api/customers-api';
import { DiscountsApi } from '../api/discounts-api';
import { EventsApi } from '../api/events-api';
import { LogsApi } from '../api/logs-api';
import { OrdersApi } from '../api/orders-api';
import { PaymentLinkApi } from '../api/payment-link-api';
import { PaymentMethodsApi } from '../api/payment-methods-api';
import { ProductsApi } from '../api/products-api';
import { ShippingContactsApi } from '../api/shipping-contacts-api';
import { ShippingsApi } from '../api/shippings-api';
import { TaxesApi } from '../api/taxes-api';
import { TransactionsApi } from '../api/transactions-api';
import { TransfersApi } from '../api/transfers-api';
import { WebhookKeysApi } from '../api/webhook-keys-api';
import { WebhooksApi } from '../api/webhooks-api';

const config = new Configuration({ apiKey: 'test-key', basePath: 'https://api.digitalfemsa.io' });

describe('API classes instantiation', () => {
  it('ApiKeysApi should instantiate', () => {
    expect(new ApiKeysApi(config)).toBeInstanceOf(ApiKeysApi);
  });

  it('BalancesApi should instantiate', () => {
    expect(new BalancesApi(config)).toBeInstanceOf(BalancesApi);
  });

  it('ChargesApi should instantiate', () => {
    expect(new ChargesApi(config)).toBeInstanceOf(ChargesApi);
  });

  it('CompaniesApi should instantiate', () => {
    expect(new CompaniesApi(config)).toBeInstanceOf(CompaniesApi);
  });

  it('CustomersApi should instantiate', () => {
    expect(new CustomersApi(config)).toBeInstanceOf(CustomersApi);
  });

  it('DiscountsApi should instantiate', () => {
    expect(new DiscountsApi(config)).toBeInstanceOf(DiscountsApi);
  });

  it('EventsApi should instantiate', () => {
    expect(new EventsApi(config)).toBeInstanceOf(EventsApi);
  });

  it('LogsApi should instantiate', () => {
    expect(new LogsApi(config)).toBeInstanceOf(LogsApi);
  });

  it('OrdersApi should instantiate', () => {
    expect(new OrdersApi(config)).toBeInstanceOf(OrdersApi);
  });

  it('PaymentLinkApi should instantiate', () => {
    expect(new PaymentLinkApi(config)).toBeInstanceOf(PaymentLinkApi);
  });

  it('PaymentMethodsApi should instantiate', () => {
    expect(new PaymentMethodsApi(config)).toBeInstanceOf(PaymentMethodsApi);
  });

  it('ProductsApi should instantiate', () => {
    expect(new ProductsApi(config)).toBeInstanceOf(ProductsApi);
  });

  it('ShippingContactsApi should instantiate', () => {
    expect(new ShippingContactsApi(config)).toBeInstanceOf(ShippingContactsApi);
  });

  it('ShippingsApi should instantiate', () => {
    expect(new ShippingsApi(config)).toBeInstanceOf(ShippingsApi);
  });

  it('TaxesApi should instantiate', () => {
    expect(new TaxesApi(config)).toBeInstanceOf(TaxesApi);
  });

  it('TransactionsApi should instantiate', () => {
    expect(new TransactionsApi(config)).toBeInstanceOf(TransactionsApi);
  });

  it('TransfersApi should instantiate', () => {
    expect(new TransfersApi(config)).toBeInstanceOf(TransfersApi);
  });

  it('WebhookKeysApi should instantiate', () => {
    expect(new WebhookKeysApi(config)).toBeInstanceOf(WebhookKeysApi);
  });

  it('WebhooksApi should instantiate', () => {
    expect(new WebhooksApi(config)).toBeInstanceOf(WebhooksApi);
  });
});
