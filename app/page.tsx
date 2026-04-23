import Logo from '../components/Logo';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-graphite text-gold">
      <Logo />
      <h1 className="text-5xl font-extrabold tracking-wide mt-4 mb-2 drop-shadow-lg" style={{letterSpacing: '0.05em'}}>UNC Builder Platform</h1>
      <p className="text-xl font-medium mb-8 opacity-80">Industrial Black & Gold Edition</p>
    </main>
  );
}
