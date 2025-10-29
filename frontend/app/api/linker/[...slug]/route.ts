import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

async function handler(req: NextRequest) {
  const { slug } = req.nextUrl;
  const requestUrl = new URL(req.url);
  const path = requestUrl.pathname.replace('/api/linker', '');

  const backendUrl = `${BACKEND_URL}/api${path}${requestUrl.search}`;

  try {
    const response = await fetch(backendUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...req.headers,
      },
      body: req.body,
    });

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new NextResponse('Proxy error', { status: 500 });
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };