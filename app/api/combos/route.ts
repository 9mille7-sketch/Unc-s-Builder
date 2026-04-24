import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

// GET: List all combos for a weapon
export async function GET(req: NextRequest) {
  const weapon_id = req.nextUrl.searchParams.get('weapon_id');
  if (!weapon_id) return NextResponse.json({ error: 'weapon_id required' }, { status: 400 });
  const { data, error } = await supabase.from('combos').select('*').eq('weapon_id', weapon_id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST: Add a new combo
export async function POST(req: NextRequest) {
  const { weapon_id, name, description } = await req.json();
  const { data, error } = await supabase.from('combos').insert([{ weapon_id, name, description }]).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}
