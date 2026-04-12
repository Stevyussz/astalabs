// src/types/next-auth.d.ts
import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id: string;
    score?: number;
  }

  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      score: number;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    username: string;
    score: number;
  }
}
