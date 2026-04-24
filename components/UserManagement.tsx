"use client";
import React, { useEffect, useState } from 'react';

interface User {
  id: string;
  username: string;
  standing: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState("");

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load users");
        setLoading(false);
      });
  }, []);

  const handleRoleChange = async (id: string, newRole: string) => {
    setUpdating(id);
    const res = await fetch('/api/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, role: newRole })
    });
    if (res.ok) {
      setUsers(users => users.map(u => u.id === id ? { ...u, standing: newRole } : u));
    }
    setUpdating("");
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-2">User Approval & Role Assignment</h2>
      <table className="min-w-full border border-gold text-gold">
        <thead>
          <tr className="bg-graphite">
            <th className="border border-gold px-2 py-1">Username</th>
            <th className="border border-gold px-2 py-1">Role</th>
            <th className="border border-gold px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="border border-gold px-2 py-1">{user.username}</td>
              <td className="border border-gold px-2 py-1">{user.standing}</td>
              <td className="border border-gold px-2 py-1">
                <select
                  value={user.standing}
                  onChange={e => handleRoleChange(user.id, e.target.value)}
                  disabled={updating === user.id}
                  className="bg-black text-gold border border-gold rounded px-2 py-1"
                >
                  <option value="OWNER">OWNER</option>
                  <option value="STAFF">STAFF</option>
                  <option value="CREATOR">CREATOR</option>
                  <option value="PREMIUM">PREMIUM</option>
                  <option value="USER">USER</option>
                  <option value="GUEST">GUEST</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
