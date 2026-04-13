export async function GET() {
  return new Response(`User-agent: *
Disallow: /admin
Disallow: /api/internal
Disallow: /backup-db

# Dear dev team, please do not forget the root password we agreed upon.
# It is required for the integration later.
# Flag system: CTF{4st4_c0rp_r0b0ts_h1dd3n_f1l3}
`, { headers: { 'Content-Type': 'text/plain' } });
}
