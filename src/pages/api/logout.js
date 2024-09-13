import cookie from 'cookie';

export async function post() {
  const headers = {
    'Set-Cookie': cookie.serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0),
      path: '/',
    }),
  };

  return new Response(JSON.stringify({ message: 'Logged out' }), { status: 200, headers });
}
