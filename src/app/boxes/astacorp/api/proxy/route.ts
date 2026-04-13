import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetHost = searchParams.get('url');

  if (!targetHost) {
    return NextResponse.json({ error: "Missing 'url' parameter for proxy cache." }, { status: 400 });
  }

  // Vulnerability: Blind SSRF
  if (targetHost.includes('127.0.0.1') || targetHost.includes('localhost') || targetHost.includes('0.0.0.0')) {
    return new NextResponse(`INTERNAL PORT SCAN DETECTED!
Server Cache Proxy successfully accessed internal administrative localport.
Data Exposed: 
CTF{ssrf_1nt3rn4l_p0rt_sc4nn1ng}`, { status: 200 });
  }

  return new NextResponse(`Proxy failed to fetch external resource: ${targetHost}`, { status: 502 });
}
