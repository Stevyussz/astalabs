import { NextResponse } from 'next/server';

export async function GET() {
  const svg = `<svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>

  <!-- 
      You found it! The hidden metadata inside the file.
      Flag: CTF{st3g4n0_svg_m3t4d4t4_h1dd3n}
  -->
</svg>`;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
    },
  });
}
