import axios from 'axios';
import { getCache, setCache } from '../../utils/cache';

export async function GET() {
    console.log("cache");
  try {
    const cachedData = getCache('products');
    if (cachedData) {
      return new Response(JSON.stringify(cachedData), { status: 200 });
    }

    const response = await axios.get('http://127.0.0.1:1337/api/products?populate=*');
    setCache('products', response.data);

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        'Cache-Control': 'max-age=60',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
