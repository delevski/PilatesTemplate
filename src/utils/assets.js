export function assetUrl(path, baseUrl = import.meta.env.BASE_URL) {
  return `${baseUrl.replace(/\/?$/, '/')}${path.replace(/^\/+/, '')}`;
}
