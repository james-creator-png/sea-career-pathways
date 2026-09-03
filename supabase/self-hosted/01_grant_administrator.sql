-- Grant the administrator role to an existing Supabase Auth user.
-- 1. Supabase Dashboard -> Authentication -> Users -> Add user
--    (email: contact@crewghpsmanagement.org, set a strong password, auto-confirm)
-- 2. Run this query, replacing the email below if needed.

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'administrator'::public.app_role
FROM auth.users
WHERE email = 'contact@crewghpsmanagement.org'
ON CONFLICT (user_id, role) DO NOTHING;

INSERT INTO public.admin_profiles (id, full_name)
SELECT id, 'GHPs Administrator'
FROM auth.users
WHERE email = 'contact@crewghpsmanagement.org'
ON CONFLICT (id) DO NOTHING;

-- Verify
SELECT u.email, r.role, p.full_name
FROM auth.users u
LEFT JOIN public.user_roles r ON r.user_id = u.id
LEFT JOIN public.admin_profiles p ON p.id = u.id;
