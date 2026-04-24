"use client";
import React from 'react';
import withRoleGuard from '../../components/withRoleGuard';

function Staff() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Staff Panel</h1>
      <ul className="list-disc ml-6 space-y-2">
        <li>Direct Injector Access</li>
        <li>View and manage user logs</li>
        <li>Assist with user support</li>
        <li>Collaborate with creators and owner</li>
      </ul>
      <div className="mt-8 text-sm opacity-70">All features are available to the STAFF role. Use the navigation to access each section.</div>
    </div>
  );
}

export default withRoleGuard(Staff, ['STAFF']);
