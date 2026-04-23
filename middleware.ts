// middleware.ts - HWID lock via browser fingerprint
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Example: Check locked_hwid cookie vs. browser fingerprint (placeholder logic)
  const lockedHwid = request.cookies.get('locked_hwid')?.value;
  const browserFingerprint = request.headers.get('user-agent'); // Replace with real fingerprinting

  if (lockedHwid && lockedHwid !== browserFingerprint) {
    return NextResponse.redirect('/access-denied');
  }
  return NextResponse.next();
}
