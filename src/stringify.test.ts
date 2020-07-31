import { stringify } from './stringify';

describe('stringify', () => {
  it('should stringify url correctly', () => {
    expect(stringify({
      protocol: 'https:',
      username: 'user',
      password: 'password',
      hostname: 'example.com',
      port: '8080',
      pathname: '/search',
      search: '?keyword=javascript',
      hash: '#results'
    })).toBe('https://user:password@example.com:8080/search?keyword=javascript#results');

    expect(stringify({
      protocol: 'https:',
      hostname: 'example.com'
    })).toBe('https://example.com/');

    expect(stringify({
      protocol: 'https:',
      username: 'user',
      hostname: 'example.com',
    })).toBe('https://user@example.com/');

    expect(stringify({
      protocol: 'https:',
      hostname: 'example.com',
      port: '8080',
    })).toBe('https://example.com:8080/');

    expect(stringify({
      protocol: 'https:',
      hostname: 'example.com',
      pathname: '/search'
    })).toBe('https://example.com/search');
  });
});