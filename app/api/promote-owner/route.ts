import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

// POST: Promote a user to OWNER by email
export async function POST(req: NextRequest) {
  const { email } = await req.json();
  // Find user by email
  const { data: user, error } = await supabase.from('users').select('id').eq('email', email).single();
  if (error || !user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  // Set standing to OWNER
  const { error: updateError } = await supabase.from('users').update({ standing: 'OWNER' }).eq('id', user.id);
  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
