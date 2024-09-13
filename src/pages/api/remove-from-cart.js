import axios from 'axios';

export async function post({ request }) {
  try {
    const data = await request.json();
    const response = await axios.post('http://127.0.0.1:1337/cart/remove', data, {
      headers: {
        Authorization: `Bearer ${request.headers.get('Authorization')}`,
      },
    });
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.response.data }), { status: error.response.status });
  }
}
