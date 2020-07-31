import { Hyperlink } from './Hyperlink';
import { stringify } from './stringify';

export const parse = (url: string): Hyperlink => {
  const hyperlink: Hyperlink = {
    href: '',
    origin: '',
    protocol: '',
    username: '',
    password: '',
    host: '',
    hostname: '',
    port: '',
    pathname: '',
    search: '',
    hash: '',
  };

  let source = url;

  const regHash = /(#.*)$/;
  const hash = source.match(regHash);

  if (hash) {
    hyperlink.hash = hash[1];
    source = source.replace(regHash, '');
  }

  const regSearch = /(\?.*)$/;
  const search = source.match(regSearch);

  if (search) {
    hyperlink.search = search[1];
    source = source.replace(regSearch, '');
  }

  const regProtocol = /^([a-z][a-z0-9\-.+]*:)?\/\//i;
  const protocol = source.match(regProtocol);

  if (protocol) {
    source = source.replace(regProtocol, '');
    hyperlink.protocol = protocol[1] || '';
  }

  const paths = source.split('/');
  const domain = paths.shift();

  hyperlink.pathname = '/' + paths.join('/');

  if (domain) {
    const userAndHost = domain.split('@');
    const hasUser = userAndHost.length > 1;
    const user = (hasUser ? (userAndHost.shift() || '') : '').split(':');
    const host = (hasUser ? userAndHost.join('@') : domain).split(':');

    hyperlink.username = user[0];
    hyperlink.password = user[1] || '';
    hyperlink.host = host.join(':');
    hyperlink.hostname = host[0];
    hyperlink.port = host[1] || '';
  }

  if (hyperlink.host) {
    hyperlink.origin = hyperlink.protocol + '//' + hyperlink.host;
  }

  hyperlink.href = stringify(hyperlink);

  return hyperlink;
};
