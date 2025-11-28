export async function GET(req: Request, props: any) {
  const params = await props.params;
  const base = process.env.STRAPI_BASEURL!;
  const url = new URL(req.url);

  const path = params.slug.join('/');

  const finalUrl = new URL(`/api/${path}`, base);
  finalUrl.search = url.search;

  const res = await fetch(finalUrl, { cache: 'no-store' });
  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
