/**
 * Helper to dynamically resolve static asset paths in Vite.
 * Prepends the correct base URL (e.g. '/' or './' or '/subpath/') 
 * to ensure images work in any hosting environment like Netlify, Vercel, or local.
 */
export function getAssetUrl(url: string | undefined): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  
  // @ts-ignore
  const base = import.meta.env.BASE_URL || '/';
  const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
  const baseUrl = base.endsWith('/') ? base : `${base}/`;
  
  return `${baseUrl}${cleanUrl}`;
}
