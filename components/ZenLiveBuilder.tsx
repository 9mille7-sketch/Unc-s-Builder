"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from '../components/UserContext';

export default function ZenLiveBuilder() {
  const { user, role } = useUser();
  const [weapons, setWeapons] = useState<any[]>([]);
  const [combos, setCombos] = useState<any[]>([]);
  const [selectedWeapon, setSelectedWeapon] = useState('');
  const [selectedCombo, setSelectedCombo] = useState('');
  const [tuning, setTuning] = useState({ vertical_recoil: 0, horizontal_recoil: 0, timing: 0, notes: '' });
  const [script, setScript] = useState('');
  const [status, setStatus] = useState('');
  const [featureFlags, setFeatureFlags] = useState<{ [key: string]: boolean }>({});
  const [addons, setAddons] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchAll() {
      setLoading(true);
      const weaponsRes = await fetch('/api/weapons');
      const weaponsData = await weaponsRes.json();
      if (!cancelled) setWeapons(weaponsData.filter((w: any) => w.platform === 'zen'));
      const featuresRes = await fetch('/api/premium-features');
      const featuresData = await featuresRes.json();
      if (!cancelled) setFeatureFlags(featuresData);
      if (user?.id) {
        const addonsRes = await fetch(`/api/user-addons?user_id=${user.id}`);
        const addonsData = await addonsRes.json();
        if (!cancelled) setAddons(addonsData);
      }
      setLoading(false);
    }
    fetchAll();
    return () => { cancelled = true; };
  }, [user]);

  useEffect(() => {
    if (selectedWeapon) {
      fetch(`/api/combos?weapon_id=${selectedWeapon}`)
        .then(res => res.json())
        .then(setCombos);
    } else {
      setCombos([]);
    }
  }, [selectedWeapon]);

  // Fetch tuning if exists
  useEffect(() => {
    if (selectedWeapon && user?.id) {
      let url = `/api/tuning?weapon_id=${selectedWeapon}&user_id=${user.id}`;
      if (selectedCombo) url += `&combo_id=${selectedCombo}`;
      fetch(url)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) setTuning(data[0]);
          else setTuning({ vertical_recoil: 0, horizontal_recoil: 0, timing: 0, notes: '' });
        });
    }
  }, [selectedWeapon, selectedCombo, user]);

  // Generate GPC script (simple example)
  useEffect(() => {
    if (selectedWeapon) {
      setScript(`// Zen GPC Script\n// Weapon: ${weapons.find((w: any) => w.id === selectedWeapon)?.name || ''}\n// Combo: ${combos.find((c: any) => c.id === selectedCombo)?.name || ''}\n// Vertical: ${tuning.vertical_recoil}\n// Horizontal: ${tuning.horizontal_recoil}\n// Timing: ${tuning.timing}\nmain {\n  // ...insert anti-recoil logic here...\n}`);
    } else {
      setScript('');
    }
  }, [selectedWeapon, selectedCombo, tuning, weapons, combos]);

  // Save tuning
  const hasDevice = !!addons['device'] || role === 'OWNER';
  const saveTuning = async () => {
    setStatus('Saving...');
    const res = await fetch('/api/tuning', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        weapon_id: selectedWeapon,
        combo_id: selectedCombo,
        user_id: user.id,
        ...tuning
      })
    });
    if (res.ok) setStatus('Saved!');
    else setStatus('Failed to save');
  };

  // Gating logic for UI
  const isPremium = (role === 'PREMIUM' || role === 'OWNER') && featureFlags['zen_live_tuning'];
  const hasPro = !!addons['pro'] || role === 'OWNER';

  let content: React.ReactNode = null;
  if (loading) {
    content = <div>Loading...</div>;
  } else if (!isPremium) {
    content = (
      <>
        <h1 className="text-2xl font-bold mb-4">Zen Live Builder (Premium Only)</h1>
        <div className="text-red-500 mb-4">Live tuning is a Premium feature. Upgrade to unlock.</div>
      </>
    );
  } else if (!hasPro) {
    content = (
      <>
        <h1 className="text-2xl font-bold mb-4">Zen Live Builder (Pro Add-On Required)</h1>
        <div className="text-red-500 mb-4">This feature requires the Pro Add-On. Contact the owner to upgrade.</div>
      </>
    );
  } else {
    content = (
      <>
        <h1 className="text-2xl font-bold mb-4">Zen Live Builder</h1>
        {!hasDevice && <div className="text-yellow-500 mb-4">Hardware flashing is locked. Device Add-On required.</div>}
        <div className="flex flex-col gap-4 max-w-md">
          <select value={selectedWeapon} onChange={e => setSelectedWeapon(e.target.value)} className="p-2 rounded border border-gold bg-black text-gold">
            <option value="">Select Weapon</option>
            {weapons.map((w: any) => <option key={w.id} value={w.id}>{w.name}</option>)}
          </select>
          <select value={selectedCombo} onChange={e => setSelectedCombo(e.target.value)} className="p-2 rounded border border-gold bg-black text-gold">
            <option value="">Select Combo (optional)</option>
            {combos.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <label>Vertical Recoil
            <input type="range" min="-100" max="100" value={tuning.vertical_recoil} onChange={e => setTuning(t => ({ ...t, vertical_recoil: +e.target.value }))} className="w-full" />
          </label>
          <label>Horizontal Recoil
            <input type="range" min="-100" max="100" value={tuning.horizontal_recoil} onChange={e => setTuning(t => ({ ...t, horizontal_recoil: +e.target.value }))} className="w-full" />
          </label>
          <label>Timing
            <input type="range" min="0" max="100" value={tuning.timing} onChange={e => setTuning(t => ({ ...t, timing: +e.target.value }))} className="w-full" />
          </label>
          <textarea placeholder="Notes" value={tuning.notes} onChange={e => setTuning(t => ({ ...t, notes: e.target.value }))} className="p-2 rounded border border-gold bg-black text-gold" />
          <button onClick={saveTuning} className="bg-gold text-graphite font-bold py-2 rounded hover:bg-yellow-400 transition">Save Tuning</button>
          {status && <div className="text-sm opacity-70">{status}</div>}
          <h2 className="text-lg font-bold mt-4">Generated GPC Script</h2>
          <pre className="bg-black text-gold p-2 rounded border border-gold overflow-x-auto">{script}</pre>
        </div>
      </>
    );
  }

  return <div className="p-8">{content}</div>;
}
