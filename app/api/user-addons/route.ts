import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

// GET: /api/user-addons?user_id=xxx
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url!);
  const user_id = searchParams.get('user_id');
  if (!user_id) return NextResponse.json({}, { status: 400 });
  const { data, error } = await supabase.from('user_addons').select('addon_key, enabled').eq('user_id', user_id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const addons: Record<string, boolean> = {};
  for (const row of (data || []) as any[]) addons[row.addon_key] = row.enabled;
  return NextResponse.json(addons);
}

// POST: /api/user-addons { user_id, addon_key, enabled }
export async function POST(req: NextRequest) {
  const { user_id, addon_key, enabled } = await req.json();
  if (!user_id || !addon_key) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  const { error } = await supabase.from('user_addons').upsert([
    { user_id, addon_key, enabled }
  ], { onConflict: 'user_id,addon_key' });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ status: 'ok' });
}
