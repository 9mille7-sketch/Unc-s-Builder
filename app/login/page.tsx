"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '../../components/Logo';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }
      // Route based on role
      // Store user and role for context
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('role', data.role);
      if (data.role === "OWNER") {
        router.replace("/admin");
      } else if (data.role === "STAFF") {
        router.replace("/staff");
      } else if (data.role === "CREATOR") {
        router.replace("/creator");
      } else {
        router.replace("/dashboard");
      }
    } catch (err) {
      setError("Network error");
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-graphite text-gold">
      <Logo />
      <h1 className="text-4xl font-bold mt-4 mb-2">Login</h1>
      <form className="flex flex-col gap-4 w-80" onSubmit={handleLogin}>
        <input
          type="email"
          className="p-3 rounded bg-black text-gold border border-gold focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="p-3 rounded bg-black text-gold border border-gold focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-gold text-graphite font-bold py-2 rounded hover:bg-yellow-400 transition"
        >
          Login
        </button>
        {error && <div className="text-red-400 text-sm">{error}</div>}
      </form>
      <div className="mt-8 text-sm opacity-70">Login with your registered email and password.</div>
    </main>
  );
}
