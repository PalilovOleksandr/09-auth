import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';

export async function GET(request: NextRequest) {
  try {
    const search = request.nextUrl.searchParams.get('search') ?? '';
    const tag = request.nextUrl.searchParams.get('tag') ?? '';
    const page = Number(request.nextUrl.searchParams.get('page') ?? 1);
    const perPage = Number(request.nextUrl.searchParams.get('perPage') ?? 12);
    const selectTag = tag === 'All' ? '' : tag;

    const { data } = await api('/notes', {
      params: {
        page,
        perPage,
        ...(tag && { tag: selectTag }),
        ...(search !== '' && { search }),
      },
    });
    if (data) return NextResponse.json(data);
  } catch {
    return NextResponse.json({
      status: '500',
      message: 'Unable to retrieve notes. Please try again later.',
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data } = await api.post('/notes', body);
    if (data) return NextResponse.json(data);
  } catch {
    return NextResponse.json({
      status: '500',
      message: 'Unable to create note. Please check your data and try again.',
    });
  }
}
