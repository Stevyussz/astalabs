# CTF Platform 🎯

A production-ready **Capture The Flag** web platform built with Next.js 16, TypeScript (strict), TailwindCSS 4, MongoDB Atlas, NextAuth v5, and Zod. Clean Architecture with API → Service → Repository → Model flow.

---

## ✨ Features

- 🔐 **Auth** — Register/Login with bcrypt password hashing, JWT sessions
- 🎯 **Challenges** — Filter by category & difficulty, search, pagination
- 🚩 **Flag Submission** — SHA-256 hashed flags, duplicate-solve prevention, cooldown
- 🏆 **Scoreboard** — Real-time rankings with 60s in-memory cache
- 🛡️ **Security** — Rate limiting, timing-safe flag comparison, flagHash never exposed
- 💅 **UI** — Cyberpunk dark mode, JetBrains Mono, animations, responsive

---

## 🏗️ Architecture

```
Request → API Route (thin) → Service (business logic) → Repository (DB) → MongoDB
                ↓
         Zod Validation
         Rate Limiting
         NextAuth Middleware
```

```
src/
├── app/
│   ├── (auth)/login/            # Login page + form
│   ├── (auth)/register/         # Register page + form
│   ├── (dashboard)/challenges/  # Challenge list + detail
│   ├── (dashboard)/profile/     # User profile
│   ├── scoreboard/              # Public scoreboard
│   └── api/                     # Thin API routes only
├── components/
│   ├── ui/                  # Design system (Button, Input, Badge, Card)
│   ├── layout/              # Navbar, Footer
│   └── features/            # Business components
├── lib/                     # db.ts, auth.ts, utils.ts, rate-limit.ts
├── models/                  # Mongoose schemas (User, Challenge, Submission)
├── repositories/            # DB interaction layer
├── services/                # Business logic layer
├── types/                   # TypeScript interfaces
├── validations/             # Zod schemas
└── scripts/seed.ts          # Database seeder
```

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <your-repo>
cd ctf-yusril
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# MongoDB Atlas URI (required)
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ctf?retryWrites=true&w=majority

# Generate with: openssl rand -base64 32
AUTH_SECRET=your-super-secret-key-here

AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Seed the Database

```bash
npm run seed
```

This creates 12 sample challenges with flags, hints, and categories.

### 4. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deploy to Vercel

1. Push to GitHub
2. Import to [vercel.com](https://vercel.com)
3. Set environment variables in Vercel dashboard:
   - `MONGODB_URI` — your Atlas connection string
   - `AUTH_SECRET` — `openssl rand -base64 32`
   - `AUTH_URL` — your production domain
   - `NEXT_PUBLIC_APP_URL` — same as AUTH_URL
4. Deploy!

---

## 🔒 Security Architecture

| Concern | Approach |
|---|---|
| Flag storage | SHA-256 hash — never stored in plaintext |
| Password storage | bcrypt (cost 12) — slow hash by design |
| Flag in API | `flagHash` field has `select: false` in Mongoose schema |
| Submission brute-force | 5s cooldown per user/challenge |
| Rate limiting | Sliding window — 10 req/min on submission, 5/hr on register |
| Input validation | Zod on all API routes |
| Auth | NextAuth v5 JWT — httpOnly cookie |
| Timing attacks | `timingSafeEqual` via Buffer comparison |

---

## 📊 MongoDB Indexes

```javascript
// User
{ score: -1, createdAt: 1 }  // Scoreboard

// Challenge
{ category: 1, difficulty: 1, isActive: 1 }  // Filtered list
{ title: 'text', description: 'text' }        // Full-text search

// Submission
{ userId: 1, challengeId: 1 }  // Duplicate solve check (compound)
{ userId: 1, createdAt: -1 }   // User submission history
```

---

## 🧪 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run seed     # Seed the database with sample challenges
```

---

## 📝 Adding Challenges

Use the service layer to create challenges — the flag is hashed automatically:

```typescript
import { challengeService } from '@/services/challenge.service';

await challengeService.createChallenge({
  title: 'My Challenge',
  category: 'web',
  difficulty: 'medium',
  description: 'Challenge description...',
  flag: 'CTF{my_secret_flag}',  // Hashed automatically — never stored plaintext!
  points: 300,
  hints: [{ content: 'A helpful hint', cost: 25 }],
});
```

---

Built with ❤️ — production-ready for real CTF competitions.
