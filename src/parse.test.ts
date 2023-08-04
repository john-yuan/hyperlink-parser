import { parse } from './parse';
import { Hyperlink } from './Hyperlink';

describe('parse', () => {
  it('should parse url correctly', () => {
    const actual = parse('https://user:pass@example.com:8080/search?keyword=javascript#results');
    const expected: Hyperlink = {
      href: 'https://user:pass@example.com:8080/search?keyword=javascript#results',
      protocol: 'https:',
      username: 'user',
      password: 'pass',
      hostname: 'example.com',
      port: '8080',
      host: 'example.com:8080',
      pathname: '/search',
      search: '?keyword=javascript',
      hash: '#results',
      origin: 'https://example.com:8080'
    };

    expect(actual).toStrictEqual(expected);
  });

  it('should parse protocol correctly', () => {
    expect(parse('https://example.com').protocol).toBe('https:');

    expect(parse('example.com').protocol).toBe('');
    expect(parse('//example.com').protocol).toBe('');
  });

  it('should parse username correctly', () => {
    expect(parse('https://example.com').username).toBe('');
    expect(parse('https://user@example.com').username).toBe('user');
    expect(parse('https://user:pass@example.com').username).toBe('user');

    expect(parse('https://@example.com').username).toBe('');
  });

  it('should parse password correctly', () => {
    expect(parse('https://example.com').password).toBe('');
    expect(parse('https://user@example.com').password).toBe('');
    expect(parse('https://user:pass@example.com').password).toBe('pass');
  });

  it('should parse hostname correctly', () => {
    expect(parse('https://localhost').hostname).toBe('localhost');
    expect(parse('https://example.com').hostname).toBe('example.com');
    expect(parse('https://www.example.com').hostname).toBe('www.example.com');
    expect(parse('https://example.com/blog').hostname).toBe('example.com');
    expect(parse('https://example.com:80').hostname).toBe('example.com');
    expect(parse('https://user@example.com').hostname).toBe('example.com');

    expect(parse('/blog').hostname).toBe('');
    expect(parse('example.com').hostname).toBe('example.com');
    expect(parse('//example.com').hostname).toBe('example.com');
  });

  it('should parse port correctly', () => {
    expect(parse('https://example.com').port).toBe('');
    expect(parse('https://example.com:80').port).toBe('80');
    expect(parse('https://example.com:80/blog').port).toBe('80');
  });

  it('should parse host correctly', () => {
    expect(parse('https://example.com').host).toBe('example.com');
    expect(parse('https://example.com').host).toBe('example.com');
    expect(parse('https://example.com:80').host).toBe('example.com:80');
    expect(parse('https://example.com:80/blog').host).toBe('example.com:80');
    expect(parse('https://user@example.com:80').host).toBe('example.com:80');
  });

  it('should parse origin correctly', () => {
    expect(parse('https://example.com').origin).toBe('https://example.com');
    expect(parse('https://user@example.com').origin).toBe('https://example.com');
    expect(parse('https://user:pass@example.com').origin).toBe('https://example.com');
    expect(parse('https://example.com:80').origin).toBe('https://example.com:80');
    expect(parse('https://example.com:80/blog').origin).toBe('https://example.com:80');
    expect(parse('https://user:pass@example.com:80/blog').origin).toBe('https://example.com:80');

    expect(parse('example.com').origin).toBe('//example.com');
  });

  it('should parse pathname correctly', () => {
    expect(parse('https://example.com').pathname).toBe('/');
    expect(parse('https://example.com/').pathname).toBe('/');
    expect(parse('https://example.com/path').pathname).toBe('/path');
    expect(parse('https://example.com/path/to').pathname).toBe('/path/to');
  });

  it('should parse search correctly', () => {
    expect(parse('https://example.com').search).toBe('');
    expect(parse('https://example.com/search').search).toBe('');
    expect(parse('https://example.com/search?').search).toBe('?');
    expect(parse('https://example.com/search?key').search).toBe('?key');
    expect(parse('https://example.com/search?key=javascript').search).toBe('?key=javascript');
    expect(parse('https://example.com/search?key=javascript#results').search).toBe('?key=javascript');
    expect(parse('https://example.com/search?key=javascript#results?search').search).toBe('?key=javascript');
  });

  it('should parse hash correctly', () => {
    expect(parse('https://example.com').hash).toBe('');
    expect(parse('https://example.com/').hash).toBe('');
    expect(parse('https://example.com/#').hash).toBe('#');
    expect(parse('https://example.com/#results').hash).toBe('#results');
    expect(parse('https://example.com/?key=javascript#results').hash).toBe('#results');
    expect(parse('https://example.com/?key=javascript#results?search').hash).toBe('#results?search');
  });

  it('should generate href correctly', () => {
    expect(parse('https://example.com').href).toBe('https://example.com/');
    expect(parse('https://example.com?search').href).toBe('https://example.com/?search');
    expect(parse('https://example.com#results').href).toBe('https://example.com/#results');
  });

  it('should parse relative url correctly', () => {
    expect(parse('/the/pathname?search=keyword#results')).toStrictEqual({
      href: '/the/pathname?search=keyword#results',
      origin: '',
      protocol: '',
      username: '',
      password: '',
      host: '',
      hostname: '',
      port: '',
      pathname: '/the/pathname',
      search: '?search=keyword',
      hash: '#results'
    });

    expect(parse('//example.com/the/pathname?search=keyword#results')).toStrictEqual({
      href: '//example.com/the/pathname?search=keyword#results',
      origin: '//example.com',
      protocol: '',
      username: '',
      password: '',
      host: 'example.com',
      hostname: 'example.com',
      port: '',
      pathname: '/the/pathname',
      search: '?search=keyword',
      hash: '#results'
    });
  });
});
