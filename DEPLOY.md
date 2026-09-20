# Quick deployment checklist

### Supabase
- Create Auth user
- Run `supabase/schema.sql`
- Add that Auth user's ID to `public.admin_users`
- Keep only the publishable key in the app

### Hosting
- Import the project into Vercel (or another Next.js host)
- Set `NEXT_PUBLIC_SUPABASE_URL`
- Set `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- Deploy
- Visit `/login` to test admin access
- Upload a before/after job and check the public gallery

### Optional domain
You can start with the free host-provided URL. Buy/connect a custom domain later without changing the Supabase setup.
