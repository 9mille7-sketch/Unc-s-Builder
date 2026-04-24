import Logo from '../components/Logo';
import Link from 'next/link';
import AccessGate from '../components/AccessGate';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-graphite text-gold">
      <Logo />
      <h1 className="text-5xl font-extrabold tracking-wide mt-4 mb-2 drop-shadow-lg" style={{letterSpacing: '0.05em'}}>UNC Builder Platform</h1>
      <p className="text-xl font-medium mb-8 opacity-80">Industrial Black & Gold Edition</p>
      <nav className="flex flex-wrap gap-4 mb-8">
        <Link href="/login" className="px-8 py-3 rounded bg-gold text-graphite font-extrabold text-lg shadow hover:bg-yellow-400 transition">Login</Link>
      </nav>
      <section className="w-full max-w-2xl flex flex-col gap-6">
        <div className="bg-graphite border border-gold rounded p-4 shadow">
          <h2 className="text-2xl font-bold mb-2">Access Verification</h2>
          <AccessGate />
        </div>
        <div className="bg-graphite border border-gold rounded p-4 shadow">
          <h2 className="text-2xl font-bold mb-2">Hardware Flashing</h2>
          <p>WebUSB logic for Cronus Zen (see Staff Panel for injector tools).</p>
        </div>
        <div className="bg-graphite border border-gold rounded p-4 shadow">
          <h2 className="text-2xl font-bold mb-2">Meta Management</h2>
          <p>Manage game metas, user approvals, and more in the Admin Panel.</p>
        </div>
      </section>
    </main>
  );
}
