import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

// POST: Upload a GPC file (Zen script)
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file');
  const userId = formData.get('userId');
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }
  // Upload to Supabase Storage (bucket: zen-gpc)
  const { data, error } = await supabase.storage.from('zen-gpc').upload(`${userId}/${file.name}`, file, { upsert: true });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ url: data.path });
}

// GET: List all GPC files (OWNER only)
export async function GET(req: NextRequest) {
  // In production, check for OWNER role using session/auth
  const { data, error } = await supabase.storage.from('zen-gpc').list('', { limit: 100 });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
