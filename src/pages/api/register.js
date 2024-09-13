import axios from 'axios';
import cookie from 'cookie';

export async function POST({ request }) {
  try {
    const data = await request.json();
    console.log('Received data in /api/register:', data);

    // Forward the request to Strapi
    const response = await axios.post('http://127.0.0.1:1337/api/auth/local/register', data);

    // Log response from Strapi
    console.log('Response from Strapi:', response.data);

    const token = response.data.jwt;
    const headers = {
      'Set-Cookie': cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24,
        path: '/',
      }),
      'Content-Type': 'application/json',
    };

    return new Response(JSON.stringify({ user: response.data.user }), { status: 200, headers });
  } catch (error) {
    console.error('Error in /api/register:', error.response?.data || error.message);
    const errorMsg = error.response?.data?.error?.message || error.message;
    return new Response(JSON.stringify({ error: errorMsg }), {
      status: error.response?.status || 500,
    });
  }
}
