import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const idStr = searchParams.get('id');

  if (!idStr) {
    return NextResponse.json({ error: "Missing 'id' parameter. Example: ?id=2" }, { status: 400 });
  }

  const id = parseInt(idStr);

  const users = [
    {
      id: 0,
      name: "SuperAdmin - Master",
      role: "administrator",
      email: "master@astacorp.local",
      secret: "CTF{1d0r_b4s1c_4dm1n_pr0f1l3}"
    },
    {
      id: 1,
      name: "Jon Doe",
      role: "employee",
      email: "jon@astacorp.local",
      department: "Marketing"
    },
    {
      id: 2,
      name: "System Guest",
      role: "guest",
      email: "guest@astacorp.local"
    }
  ];

  const user = users.find(u => u.id === id);

  if (user) {
    return NextResponse.json(user);
  } else {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}
