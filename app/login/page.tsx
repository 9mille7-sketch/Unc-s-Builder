import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Logo from '../../components/Logo';

export default function Login() {
  // Placeholder: Simulate login and role assignment
  // In production, replace with Supabase Auth logic
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const role = params.get('role') || 'USER';
  cookies().set('user_role', role);

  // Redirect based on role
  if (role === 'OWNER') redirect('/admin');
  else if (role === 'STAFF') redirect('/staff');
  else redirect('/dashboard');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-graphite text-gold">
      <Logo />
      <h1 className="text-4xl font-bold mt-4 mb-2">Login</h1>
      <p className="mb-8">Logging in and redirecting...</p>
    </main>
  );
}
