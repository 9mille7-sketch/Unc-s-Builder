import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

// GET: Fetch all users and their roles
export async function GET(req: NextRequest) {
  const { data, error } = await supabase.from('users').select('*');
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// PATCH: Update a user's role
export async function PATCH(req: NextRequest) {
  const { id, role } = await req.json();
  const { data, error } = await supabase.from('users').update({ standing: role }).eq('id', id).select();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
