import axios from 'axios';

export async function get({ params }) {
  try {
    const { id } = params;
    const response = await axios.get(`http://localhost:1337/products/${id}`);
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.response.data }), { status: error.response.status });
  }
}
