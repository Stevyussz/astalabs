import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get('target');

  if (!target) {
    return NextResponse.json({ error: "Missing 'target' parameter for Network Utility." }, { status: 400 });
  }

  // Vulnerability: Blind Command Injection
  if (target.includes(';') || target.includes('|') || target.includes('&') || target.includes('`')) {
    if (target.includes('cat ') && target.includes('flag')) {
      return new NextResponse(`PING result: host unreachable.
[!] FATAL INJECTION DETECTED IN CHILD_PROCESS EXEC:
bash: root-flag.txt: read success
CTF{rc3_sy5t3m_p1ng_r00t_0wn3d}`, { status: 200 });
    } else {
      return new NextResponse(`PING result: host unreachable.
[!] BASH SYNTAX ERROR OR EXECUTABLE NOT FOUND`, { status: 200 });
    }
  }

  return new NextResponse(`PING ${target}: 0 packets received, 100% packet loss.`, { status: 200 });
}
