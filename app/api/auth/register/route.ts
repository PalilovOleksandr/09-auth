import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { parse } from 'cookie';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const apiRegister = await api.post('/auth/register', body);
    const cookiesStore = cookies();
    const setCookie = apiRegister.headers['set-cookie'];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);
        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          maxAge: Number(parsed['Max-Age']),
        };
        if (parsed.accessToken) {
          (await cookiesStore).set('accessToken', parsed.accessToken, options);
        }
        if (parsed.refreshToken) {
          (await cookiesStore).set(
            'refreshToken',
            parsed.refreshToken,
            options
          );
        }
      }
    }
    return NextResponse.json(apiRegister.data);
  } catch {
    return NextResponse.json({
      status: '401',
      message: 'Unable to register user. Please try again.',
      error: 'Unauthorized',
    });
  }
}
