"use client";
import React from 'react';
import GPCUpload from '../../components/GPCUpload';
import { useUser } from '../../components/UserContext';
import withRoleGuard from '../../components/withRoleGuard';

function CreatorPanel() {
  const { user } = useUser();
  const userId = user?.id || '';
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Creator Panel</h1>
      <ul className="list-disc ml-6 space-y-2">
        <li>Submit and manage scripts</li>
        <li>View script usage analytics</li>
        <li>Access to testing sandbox</li>
        <li>Collaborate with staff and owner</li>
      </ul>
      <GPCUpload userId={userId} />
      <div className="mt-8 text-sm opacity-70">All features are available to the CREATOR role. Use the navigation to access each section.</div>
    </div>
  );
}

export default withRoleGuard(CreatorPanel, ['CREATOR']);
