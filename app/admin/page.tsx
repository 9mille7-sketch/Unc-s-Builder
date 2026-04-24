import { cookies } from 'next/headers';
import OwnerPanel from './OwnerPanel';

export default async function Admin() {
  const cookieStore = cookies();
  const role = (await cookieStore.get?.('user_role'))?.value || 'ADMIN';
  if (role === 'OWNER') {
    return <OwnerPanel />;
  }
  return <div className="p-8">Admin Panel (Meta Management, User Approval)</div>;
}
