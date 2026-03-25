import { Configuration } from '../configuration';

describe('Configuration', () => {
  it('should instantiate with no parameters', () => {
    const config = new Configuration();
    expect(config).toBeInstanceOf(Configuration);
  });

  it('should instantiate with apiKey as string', () => {
    const config = new Configuration({ apiKey: 'test-api-key' });
    expect(config).toBeInstanceOf(Configuration);
  });

  it('should instantiate with basePath', () => {
    const config = new Configuration({ basePath: 'https://api.digitalfemsa.io' });
    expect(config).toBeInstanceOf(Configuration);
  });

  it('should expose basePath when provided', () => {
    const basePath = 'https://api.digitalfemsa.io';
    const config = new Configuration({ basePath });
    expect(config.basePath).toBe(basePath);
  });
});
