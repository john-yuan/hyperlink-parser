import { Hyperlink } from './Hyperlink';

export const stringify = (hyperlink: Partial<Hyperlink>): string => {
  const {
    protocol, username, password, hostname,
    port, pathname, search, hash,
  } = hyperlink;

  let url = '';

  if (protocol) {
    url = url + protocol + '//';
  } else if (hostname) {
    url += '//';
  }

  if (username) {
    url += username;
    if (password) {
      url = url + ':' + password;
    }
    url += '@';
  }

  if (hostname) {
    url += hostname;
    if (port) {
      url = url + ':' + port;
    }
  }

  url += (pathname || '/');

  if (search) {
    url += search;
  }

  if (hash) {
    url += hash;
  }

  return url;
};
