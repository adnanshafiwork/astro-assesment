import { invalidateCache } from '../../utils/cache';

export async function post() {
  try {
    await invalidateCache('products');
    return new Response(JSON.stringify({ message: 'Cache invalidated' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
