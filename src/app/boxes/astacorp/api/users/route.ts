import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newUser = {
      id: Math.floor(Math.random() * 1000),
      username: body.username,
      // VULNERABILITY: Object injection / Mass Assignment
      // Menerima parameter role secara mentah dari request
      role: body.role || "user", 
      status: "active"
    };

    if (newUser.role === 'admin' || newUser.role === 'administrator') {
      return NextResponse.json({
        message: "User created with administrative privileges!",
        user: newUser,
        flag: "CTF{m4ss_4ss1gnm3nt_4dm1n_cr34t3d}"
      });
    }

    return NextResponse.json({
      message: "Standard user created.",
      user: newUser
    });
    
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
