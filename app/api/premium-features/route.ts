import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

// Table: premium_features (key: text primary key, enabled: boolean)

export async function GET() {
  // Fetch all premium feature flags
  const { data, error } = await supabase.from('premium_features').select('*');
  if (error) return NextResponse.json({}, { status: 500 });
  const flags: Record<string, boolean> = {};
  for (const row of (data || []) as any[]) flags[row.key] = row.enabled;
  return NextResponse.json(flags);
}

export async function POST(req: NextRequest) {
  const updates = await req.json();
  // Upsert all feature flags
  const rows = Object.entries(updates).map(([key, enabled]) => ({ key, enabled }));
  const { error } = await supabase.from('premium_features').upsert(rows, { onConflict: 'key' });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ status: 'ok' });
}
