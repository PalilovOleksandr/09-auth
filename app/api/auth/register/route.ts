import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const apiRegister = await api.post('/auth/register', body);
    if (apiRegister) return NextResponse.json(apiRegister);
  } catch {
    return NextResponse.json({
      status: '401',
      message: 'Unable to register user. Please try again.',
      error: 'Unauthorized',
    });
  }
}
