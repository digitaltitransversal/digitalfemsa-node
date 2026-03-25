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
});

describe('Package version', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pkg = require('../package.json');
});
