"use client";
import GPCUpload from '../../components/GPCUpload';
import { useUser } from '../../components/UserContext';
import withRoleGuard from '../../components/withRoleGuard';
import ZenLiveBuilder from '../../components/ZenLiveBuilder';

function Dashboard() {
  const { user } = useUser();
  const userId = user?.id || '';
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
      <div>XIM & Zen Workstations</div>
      <GPCUpload userId={userId} />
      <ZenLiveBuilder />
    </div>
  );
}

export default withRoleGuard(Dashboard, ['USER', 'PREMIUM', 'GUEST']);
