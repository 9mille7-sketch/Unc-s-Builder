import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';

const ADDONS = [
  { key: 'pro', label: 'Pro Add-On (AI tuning, analytics, support)' },
  { key: 'device', label: 'Device Add-On (hardware flashing, integration)' },
  { key: 'community', label: 'Community Add-On (sharing, rating)' },
  { key: 'early_access', label: 'Early Access Add-On (beta features)' },
  { key: 'custom', label: 'Custom Add-On (owner-defined)' },
];

export default function UserAddonManager() {
  const { user, role } = useUser();
  const [selectedUser, setSelectedUser] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [addons, setAddons] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (role === 'OWNER') {
      fetch('/api/users')
        .then(res => res.json())
        .then(setUsers);
    }
  }, [role]);

  useEffect(() => {
    if (selectedUser) {
      fetch(`/api/user-addons?user_id=${selectedUser}`)
        .then(res => res.json())
        .then(setAddons);
    } else {
      setAddons({});
    }
  }, [selectedUser]);

  const handleToggle = async (key: string) => {
    if (!selectedUser) return;
    setStatus('Saving...');
    const res = await fetch('/api/user-addons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: selectedUser, addon_key: key, enabled: !addons[key] })
    });
    if (res.ok) {
      setAddons(a => ({ ...a, [key]: !a[key] }));
      setStatus('Saved!');
    } else {
      setStatus('Failed to save');
    }
  };

  if (role !== 'OWNER') return null;

  return (
    <div className="my-8 p-4 border border-gold rounded bg-black text-gold">
      <h2 className="text-xl font-bold mb-2">User Add-On Manager</h2>
      <select
        className="mb-4 p-2 rounded border border-gold bg-black text-gold"
        value={selectedUser}
        onChange={e => setSelectedUser(e.target.value)}
      >
        <option value="">Select User or Creator</option>
        {users.map((u: any) => (
          <option key={u.id} value={u.id}>{u.username || u.email} ({u.standing})</option>
        ))}
      </select>
      {selectedUser && (
        <div className="flex flex-col gap-2">
          {ADDONS.map(a => (
            <label key={a.key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!addons[a.key]}
                onChange={() => handleToggle(a.key)}
              />
              {a.label}
            </label>
          ))}
        </div>
      )}
      {status && <div className="text-sm mt-2">{status}</div>}
    </div>
  );
}
