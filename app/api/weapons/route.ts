import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

// GET: List all weapons
export async function GET() {
  const { data, error } = await supabase.from('weapons').select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST: Add a new weapon
export async function POST(req: NextRequest) {
  const { name, platform } = await req.json();
  const { data, error } = await supabase.from('weapons').insert([{ name, platform }]).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}
