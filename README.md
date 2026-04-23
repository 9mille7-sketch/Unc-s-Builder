# UNC Builder

## Overview
A Next.js 16 (App Router) platform for staff-to-user script injection, hardware flashing, and meta management for Zen/XIM devices. Built with TypeScript, Tailwind CSS (Industrial Black & Gold), Supabase, and Render hosting.

## Directory Structure
- `/app/admin` — Owner Only: Meta Management, User Approval
- `/app/staff` — Staff Only: Direct Injector, User Logs
- `/app/dashboard` — User Workstations: XIM & Zen
- `/app/api/compile/zen` — GPC to Binary Engine
- `/app/api/compile/xim` — Smart Action Generator
- `/app/api/inject` — Staff-to-User Payload Bridge
- `/components/hardware` — WebUSB Flashing Logic
- `/components/ui` — Industrial Components
- `/components/AccessGate.tsx` — Premium/HWID Verification
- `/lib/compiler` — Recoil Math & Multi-Stage Logic
- `/lib/supabaseClient.ts` — DB Configuration
- `/types` — Hardware & User Interfaces

## Setup
1. Create `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
2. Install dependencies: `npm install`
3. Run the dev server: `npm run dev`

## Database Schema (Supabase SQL)
See project documentation for SQL to initialize tables: `profiles`, `game_metas`, `user_injections`.

## Theme
- Gold: `#D4AF37`
- Graphite: `#1A1A1A`

## Security
- HWID lock via `middleware.ts` (browser fingerprint check)
- No scripts stored as text files on user drives

## Hardware
- WebUSB API for Cronus Zen (Vendor ID: 0x2508)

## Revenue Loop
- Free users see "Meta Pulse"
- Upsell: Zen/XIM access
- Retention: Staff manual injection
- Security: Server-side only
