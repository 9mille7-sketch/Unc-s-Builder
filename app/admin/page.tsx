import { cookies } from 'next/headers';
import OwnerPanel from './OwnerPanel';

// Placeholder: In production, fetch user role from Supabase session or context
function getUserRole() {
  // Example: Read from cookie (replace with real session logic)
  const role = cookies().get('user_role')?.value;
  return role || 'ADMIN';
}

export default function Admin() {
  const role = getUserRole();
  if (role === 'OWNER') {
    return <OwnerPanel />;
  }
  return <div className="p-8">Admin Panel (Meta Management, User Approval)</div>;
}
