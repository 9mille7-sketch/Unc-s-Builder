import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';

// List of all premium features in the app
const PREMIUM_FEATURES = [
  { key: 'zen_live_tuning', label: 'Zen Live Tuning' },
  { key: 'xim_live_tuning', label: 'XIM Matrix Live Tuning' },
  // Add more premium features here as needed
];

export default function PremiumFeatureManager() {
  const { user, role } = useUser();
  const [featureFlags, setFeatureFlags] = useState<{ [key: string]: boolean }>({});
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Fetch current feature flags from API
    fetch('/api/premium-features')
      .then(res => res.json())
      .then(setFeatureFlags);
  }, []);

  const handleToggle = async (key: string) => {
    const updated = { ...featureFlags, [key]: !featureFlags[key] };
    setFeatureFlags(updated);
    setStatus('Saving...');
    const res = await fetch('/api/premium-features', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    setStatus(res.ok ? 'Saved!' : 'Failed to save');
  };

  if (role !== 'OWNER') return null;

  return (
    <div className="my-8 p-4 border border-gold rounded bg-black text-gold">
      <h2 className="text-xl font-bold mb-2">Premium Feature Manager</h2>
      <div className="flex flex-col gap-2">
        {PREMIUM_FEATURES.map(f => (
          <label key={f.key} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={!!featureFlags[f.key]}
              onChange={() => handleToggle(f.key)}
            />
            {f.label}
          </label>
        ))}
      </div>
      {status && <div className="text-sm mt-2">{status}</div>}
    </div>
  );
}
