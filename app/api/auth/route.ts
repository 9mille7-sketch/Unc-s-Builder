import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

// POST: Login with email and password
export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
  // Fetch user profile/role
  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('id, standing')
    .eq('id', data.user.id)
    .single();
  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }
  return NextResponse.json({ user: data.user, role: profile.standing });
}
