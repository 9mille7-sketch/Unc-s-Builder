"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '../../components/Logo';

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === "Duke2026") {
      document.cookie = `user_role=OWNER; path=/`;
      router.replace("/admin");
    } else {
      document.cookie = `user_role=USER; path=/`;
      router.replace("/dashboard");
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-graphite text-gold">
      <Logo />
      <h1 className="text-4xl font-bold mt-4 mb-2">Login</h1>
      <form className="flex flex-col gap-4 w-80" onSubmit={handleLogin}>
        <input
          type="password"
          className="p-3 rounded bg-black text-gold border border-gold focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter Owner Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gold text-graphite font-bold py-2 rounded hover:bg-yellow-400 transition"
        >
          Login
        </button>
        {error && <div className="text-red-400 text-sm">{error}</div>}
      </form>
      <div className="mt-8 text-sm opacity-70">Use the owner password to access the Owner Panel. Any other password will log in as a regular user.</div>
    </main>
  );
}
