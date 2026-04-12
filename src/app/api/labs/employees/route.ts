import { NextResponse } from 'next/server';

export async function GET() {
  const employees = [
    {
      id: 1,
      name: 'Budi Santoso',
      position: 'Senior Engineer',
      email: 'budi.s@astalabs.local',
      joinedAt: '2022-01-15'
    },
    {
      id: 2,
      name: 'Dewi Lestari',
      position: 'Marketing Manager',
      email: 'dewi.l@astalabs.local',
      joinedAt: '2023-05-10'
    },
    {
      id: 3,
      name: 'Yusril Admin',
      position: 'System Administrator',
      email: 'admin@astalabs.local',
      joinedAt: '2020-01-01',
      // Vulnerability: Excessive Data Exposure (Developer forgot to filter out sensitive fields)
      secret_note: 'CTF{4p1_l34k_1s_r34l_t00_r34l}',
      access_level: 'SUPER_ADMIN'
    },
    {
      id: 4,
      name: 'Andi Pratama',
      position: 'Intern',
      email: 'andi.p@astalabs.local',
      joinedAt: '2024-02-20'
    }
  ];

  // We add a synthetic delay to simulate network fetching
  await new Promise(resolve => setTimeout(resolve, 800));

  return NextResponse.json({
    status: 'success',
    count: employees.length,
    data: employees
  });
}
