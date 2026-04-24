import React from 'react';

export default function OwnerPanel() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Owner Control Panel</h1>
      <ul className="list-disc ml-6 space-y-2">
        <li>Meta Management (all games, all users)</li>
        <li>User Approval & Role Assignment</li>
        <li>Staff Panel Access (Direct Injector, User Logs)</li>
        <li>Dashboard Access (XIM & Zen Workstations)</li>
        <li>Hardware Flashing (WebUSB, Cronus Zen)</li>
        <li>Full Supabase Integration & Settings</li>
        <li>HWID Lock & Security Controls</li>
      </ul>
      <div className="mt-8 text-sm opacity-70">All features are available to the OWNER role. Use the navigation to access each section.</div>
    </div>
  );
}
