import axios from 'axios';
import cookie from 'cookie';

export function getToken(request) {
  const cookies = cookie.parse(request.headers.get('cookie') || '');
  return cookies.token || null;
}

export async function getUser(request) {
  const token = getToken(request);
  if (!token) return null;

  try {
    const response = await axios.get('http://localhost:1337/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch {
    return null;
  }
}
