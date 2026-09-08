INSERT INTO public.user_roles (user_id, role)
VALUES ('2056ed7e-0ef9-4ef0-84fc-4332692a221c'::uuid, 'administrator'::public.app_role)
ON CONFLICT (user_id, role) DO NOTHING;

INSERT INTO public.admin_profiles (id, full_name)
VALUES ('2056ed7e-0ef9-4ef0-84fc-4332692a221c'::uuid, 'James — GHPs Administrator')
ON CONFLICT (id) DO NOTHING;