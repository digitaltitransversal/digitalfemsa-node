import * as models from '../model';

describe('Model exports', () => {
  const requiredExports = [
    'OrderResponseObjectEnum',
    'CustomerResponseObjectEnum',
    'TransactionResponseStatusEnum',
    'TransactionResponseTypeEnum',
  ];

  it.each(requiredExports)('should export enum: %s', (name) => {
    expect(models).toHaveProperty(name);
    expect(models[name as keyof typeof models]).toBeDefined();
  });

  it('should export ApiKeyRequestRoleEnum', () => {
    expect(models).toHaveProperty('ApiKeyRequestRoleEnum');
    expect(models.ApiKeyRequestRoleEnum).toBeDefined();
  });

  it('should NOT export removed antifraud models', () => {
    const keys = Object.keys(models);
    const antifraudKeys = keys.filter(k => k.toLowerCase().includes('antifraud'));
    expect(antifraudKeys).toHaveLength(0);
  });

  it('should NOT export removed SmsCheckoutRequest', () => {
    expect(models).not.toHaveProperty('SmsCheckoutRequest');
  });

  it('should NOT export removed OrderNextActionResponse', () => {
    expect(models).not.toHaveProperty('OrderNextActionResponse');
  });
});

describe('Package version', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pkg = require('../package.json');

  it('should be v2.0.0', () => {
    expect(pkg.version).toBe('2.0.0');
  });

  it('should use axios >= 1.13.0', () => {
    const axiosVersion: string = pkg.dependencies.axios;
    const major = parseInt(axiosVersion.replace(/[^0-9.]/g, '').split('.')[0], 10);
    const minor = parseInt(axiosVersion.replace(/[^0-9.]/g, '').split('.')[1], 10);
    expect(major > 1 || (major === 1 && minor >= 13)).toBe(true);
  });

  it('should not have tsc as a dependency', () => {
    expect(pkg.dependencies).not.toHaveProperty('tsc');
  });
});
