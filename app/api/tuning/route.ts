import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

// GET: List all tuning for a weapon/combo/user
export async function GET(req: NextRequest) {
  const weapon_id = req.nextUrl.searchParams.get('weapon_id');
  const combo_id = req.nextUrl.searchParams.get('combo_id');
  const user_id = req.nextUrl.searchParams.get('user_id');
  let query = supabase.from('tuning').select('*');
  if (weapon_id) query = query.eq('weapon_id', weapon_id);
  if (combo_id) query = query.eq('combo_id', combo_id);
  if (user_id) query = query.eq('user_id', user_id);
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST: Add or update tuning
export async function POST(req: NextRequest) {
  const { weapon_id, combo_id, user_id, vertical_recoil, horizontal_recoil, timing, notes } = await req.json();
  // Upsert tuning for this user/weapon/combo
  const { data, error } = await supabase.from('tuning').upsert([
    { weapon_id, combo_id, user_id, vertical_recoil, horizontal_recoil, timing, notes }
  ]).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}
