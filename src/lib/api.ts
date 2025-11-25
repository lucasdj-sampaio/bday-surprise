export async function fetchStrapi<T = any>(
  path: string,
  opts?: { revalidate?: number }
): Promise<T> {
  const base = process.env.STRAPI_BASEURL!;
  const url = new URL(path.startsWith('http') ? path : `/api/${path}`, base);

  const res = await fetch(url, {
    next: opts?.revalidate ? { revalidate: opts.revalidate } : undefined,
  });

  if (!res.ok) {
    console.error('fetchStrapi error', { url, status: res.status });
    throw new Error(`Failed to fetch ${url} (status ${res.status})`);
  }

  return (await res.json()) as T;
}
