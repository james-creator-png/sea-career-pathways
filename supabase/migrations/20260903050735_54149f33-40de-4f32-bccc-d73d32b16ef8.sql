DROP POLICY IF EXISTS "Admins can read candidate documents" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete candidate documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can read their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can read admin profiles" ON public.admin_profiles;
DROP POLICY IF EXISTS "Admins can insert their own profile" ON public.admin_profiles;
DROP POLICY IF EXISTS "Admins can update their own profile" ON public.admin_profiles;
DROP POLICY IF EXISTS "Admins can read applications" ON public.applications;
DROP POLICY IF EXISTS "Admins can update applications" ON public.applications;
DROP POLICY IF EXISTS "Admins can delete applications" ON public.applications;
DROP POLICY IF EXISTS "Admins can read notes" ON public.application_notes;
DROP POLICY IF EXISTS "Admins can create notes" ON public.application_notes;
DROP POLICY IF EXISTS "Admins can update their own notes" ON public.application_notes;
DROP POLICY IF EXISTS "Admins can delete their own notes" ON public.application_notes;

CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC;
GRANT USAGE ON SCHEMA private TO authenticated;
CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, private
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;
DROP FUNCTION public.has_role(uuid, public.app_role);

CREATE POLICY "Users can read their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);
CREATE POLICY "Admins can read admin profiles"
ON public.admin_profiles FOR SELECT TO authenticated
USING (private.has_role(auth.uid(), 'administrator'));
CREATE POLICY "Admins can insert their own profile"
ON public.admin_profiles FOR INSERT TO authenticated
WITH CHECK (auth.uid() = id AND private.has_role(auth.uid(), 'administrator'));
CREATE POLICY "Admins can update their own profile"
ON public.admin_profiles FOR UPDATE TO authenticated
USING (auth.uid() = id AND private.has_role(auth.uid(), 'administrator'))
WITH CHECK (auth.uid() = id);
CREATE POLICY "Admins can read applications"
ON public.applications FOR SELECT TO authenticated
USING (private.has_role(auth.uid(), 'administrator'));
CREATE POLICY "Admins can update applications"
ON public.applications FOR UPDATE TO authenticated
USING (private.has_role(auth.uid(), 'administrator'))
WITH CHECK (private.has_role(auth.uid(), 'administrator'));
CREATE POLICY "Admins can delete applications"
ON public.applications FOR DELETE TO authenticated
USING (private.has_role(auth.uid(), 'administrator'));
CREATE POLICY "Admins can read notes"
ON public.application_notes FOR SELECT TO authenticated
USING (private.has_role(auth.uid(), 'administrator'));
CREATE POLICY "Admins can create notes"
ON public.application_notes FOR INSERT TO authenticated
WITH CHECK (private.has_role(auth.uid(), 'administrator') AND auth.uid() = admin_id);
CREATE POLICY "Admins can update their own notes"
ON public.application_notes FOR UPDATE TO authenticated
USING (private.has_role(auth.uid(), 'administrator') AND auth.uid() = admin_id)
WITH CHECK (auth.uid() = admin_id);
CREATE POLICY "Admins can delete their own notes"
ON public.application_notes FOR DELETE TO authenticated
USING (private.has_role(auth.uid(), 'administrator') AND auth.uid() = admin_id);
CREATE POLICY "Admins can read candidate documents"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'candidate-documents' AND private.has_role(auth.uid(), 'administrator'));
CREATE POLICY "Admins can delete candidate documents"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'candidate-documents' AND private.has_role(auth.uid(), 'administrator'));