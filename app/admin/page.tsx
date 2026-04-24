import { cookies } from 'next/headers';
import OwnerPanel from './OwnerPanel';

export default function Admin() {
  const cookieStore = cookies();
  const role = cookieStore.get('user_role')?.value || 'ADMIN';
  if (role === 'OWNER') {
    return <OwnerPanel />;
  }
  return <div className="p-8">Admin Panel (Meta Management, User Approval)</div>;
}
