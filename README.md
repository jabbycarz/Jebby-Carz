# Jebby Carz production website

This is a Next.js website wired to Supabase Auth + Supabase Storage for a real online before/after job gallery.

## Setup
1. Install Node.js 20+.
2. Run `npm install`.
3. `.env.local` is already configured with the Jebby Carz Supabase project URL and publishable key supplied by the owner. Do not commit `.env.local`.
4. In Supabase Authentication > Users, create the administrator account with a strong password. Disable public sign-ups if you don't want visitors creating accounts.
5. Open Supabase SQL Editor and run `supabase/schema.sql`.
6. In the final commented SQL lines, replace the admin email and run the INSERT to add that Auth user to `admin_users`.
7. Run `npm run dev` and open the local URL.

## Production hosting
Deploy this Next.js project to a Next.js-compatible host such as Vercel. Add the same two NEXT_PUBLIC_* environment variables in the host's project settings. No custom domain is required initially; the host supplies a free project URL. A custom domain can be connected later.

## Security
Only the Supabase publishable key is included in browser code. Never put a Supabase secret/service-role key in `.env.local` or client code. Admin access is enforced by Supabase Auth plus the `admin_users` table and RLS policies. The public gallery has read-only access to published jobs and public read access to the `job-photos` bucket; uploads/deletes require an authenticated admin.
