"use client";
import { useState } from 'react';

export default function PromoteOwner() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handlePromote = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    const res = await fetch('/api/promote-owner', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (res.ok) {
      setStatus('User promoted to OWNER!');
    } else {
      const data = await res.json();
      setStatus(data.error || 'Failed to promote');
    }
  };

  return (
    <form onSubmit={handlePromote} className="flex flex-col gap-2 mt-8">
      <input
        type="email"
        placeholder="Owner email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="p-2 border border-gold rounded bg-black text-gold"
        required
      />
      <button type="submit" className="bg-gold text-graphite font-bold py-1 px-3 rounded hover:bg-yellow-400 transition">
        Promote to OWNER
      </button>
      {status && <div className="text-sm opacity-70">{status}</div>}
    </form>
  );
}
