
"use client";
import withRoleGuard from '../../components/withRoleGuard';
import OwnerPanel from './OwnerPanel';
const GuardedOwnerPanel = withRoleGuard(OwnerPanel, ['OWNER']);

export default function Admin() {
  return <GuardedOwnerPanel />;
}
