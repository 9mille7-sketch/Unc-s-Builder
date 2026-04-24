"use client";
import { useUser } from '../components/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function withRoleGuard(Component: any, allowedRoles: string[]) {
  return function RoleGuarded(props: any) {
    const { role, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!loading && (!role || !allowedRoles.includes(role))) {
        router.replace('/login');
      }
    }, [role, loading, router]);

    if (loading || !role || !allowedRoles.includes(role)) {
      return null;
    }
    return <Component {...props} />;
  };
}
