import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new NextResponse('Error: Missing URL parameter', { status: 400 });
  }

  try {
    // --- MOCK VULNERABLE LOGIC ---
    // In real vulnerable software, developer uses curl or fetch without verifying schema/host
    // const res = await fetch(targetUrl); return res.text();
    
    // We mock it for safety so we don't accidentally attack real internal networks
    if (targetUrl.startsWith('file://')) {
      if (targetUrl === 'file:///etc/passwd') {
        return new NextResponse(`root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
games:x:5:60:games:/usr/games:/usr/sbin/nologin`, { status: 200 });
      } else if (targetUrl === 'file:///app/secret-flag.txt') {
        return new NextResponse(`DANGER! CONFIDENTIAL!
---
CTF{ssrf_l0c4l_f1l3_r34d_3xpl01t3d}
---
Ensure this file is never exposed to public routers.`, { status: 200 });
      } else {
        return new NextResponse(`file not found or access denied: ${targetUrl}`, { status: 404 });
      }
    }

    if (targetUrl.includes('localhost') || targetUrl.includes('127.0.0.1')) {
       return new NextResponse('{ "status": "internal-server", "version": "v3.1.2-beta" }', { status: 200 });
    }

    // Attempt real safe external fetch for realism
    if (targetUrl.startsWith('http://') || targetUrl.startsWith('https://')) {
        const res = await fetch(targetUrl, { signal: AbortSignal.timeout(3000) });
        const text = await res.text();
        return new NextResponse(text.slice(0, 1000) + (text.length > 1000 ? '... [TRUNCATED]' : ''));
    }

    return new NextResponse('Unsupported protocol', { status: 400 });
  } catch (error: any) {
    return new NextResponse(`Fetch failed: ${error.message}`, { status: 500 });
  }
}
