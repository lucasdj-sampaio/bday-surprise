export async function fetchStrapi<T = any>(
  path: string,
  opts?: {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: any;
    headers?: Record<string, string>;
    revalidate?: number;
    noStore?: boolean;
  }
): Promise<T> {
  const base = process.env.STRAPI_BASEURL!;
  const url = new URL(path.startsWith('http') ? path : `/api/${path}`, base);

  const method = opts?.method ?? 'GET';

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...opts?.headers,
    },
    cache: opts?.noStore ? 'no-store' : undefined,
    next: opts?.revalidate ? { revalidate: opts.revalidate } : undefined,
  };

  if (method !== 'GET' && opts?.body) {
    fetchOptions.body =
      typeof opts.body === 'string' ? opts.body : JSON.stringify(opts.body);
  }

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    console.error('fetchStrapi error', url.toString(), res.status);
    throw new Error(`Failed to fetch Strapi (${res.status})`);
  }

  return res.json() as Promise<T>;
}
