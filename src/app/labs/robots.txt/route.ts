import { NextResponse } from 'next/server';

export async function GET() {
  const robotsText = `User-agent: *
Disallow: /admin
Disallow: /api/secret
Disallow: /labs/secret-bunker-77

# HINT FOR ASTALABS OPERATIVES:
# Flag: CTF{r0b0ts_txt_1s_n0t_4_s3cr3t}
`;

  return new NextResponse(robotsText, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
