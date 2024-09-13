import axios from 'axios';
import { getToken } from '../../utils/auth';

export async function get({ request }) {
  try {
    const token = getToken(request);
    if (!token) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const response = await axios.get('http://127.0.0.1:1337/api/cart', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.response.data }), { status: error.response.status });
  }
}
