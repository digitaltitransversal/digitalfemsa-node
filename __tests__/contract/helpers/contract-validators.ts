import { RequiredError } from '../../../base';

export const expectRequiredError = (fn: () => void, paramName: string) => {
  expect(fn).toThrow(RequiredError);
  try {
    fn();
  } catch (error) {
    if (error instanceof RequiredError) {
      expect(error.field).toBe(paramName);
      expect(error.message).toContain(paramName);
    }
  }
};

export const validateRequiredParam = async (
  apiMethod: (...args: any[]) => Promise<any>,
  paramName: string,
  validArgs: any[],
  paramIndex: number
) => {
  const argsWithNull = [...validArgs];
  argsWithNull[paramIndex] = null;

  await expect(apiMethod(...argsWithNull)).rejects.toThrow(RequiredError);

  const argsWithUndefined = [...validArgs];
  argsWithUndefined[paramIndex] = undefined;

  await expect(apiMethod(...argsWithUndefined)).rejects.toThrow(RequiredError);
};

export const createMockConfiguration = (apiKey: string = 'test_key_123') => {
  return {
    accessToken: apiKey,
    basePath: 'https://api.digitalfemsa.io',
  };
};
