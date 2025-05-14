import { env } from '../../env';

export async function api(path: string, init?: RequestInit) {
  const baseUrl = env.NEXT_PUBLIC_API_URL;
  const apiPath = '/api';
  const url = new URL(apiPath.concat(path), baseUrl);

  return await fetch(url, init);
}
