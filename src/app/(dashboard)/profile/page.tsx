import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export default async function ProfileRedirect() {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/login');
  }

  // Redirect to their public hacker profile
  redirect(`/profile/${encodeURIComponent(session.user.username as string)}`);
}
