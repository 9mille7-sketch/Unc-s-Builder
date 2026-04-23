import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  return NextResponse.json({ status: 'ok', message: 'XIM compile endpoint' });
}
