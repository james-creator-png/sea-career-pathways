-- Roles
CREATE TYPE public.app_role AS ENUM ('administrator');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can read their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Shared updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Admin profiles
CREATE TABLE public.admin_profiles (
  id uuid PRIMARY KEY,
  full_name text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.admin_profiles TO authenticated;
GRANT ALL ON public.admin_profiles TO service_role;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read admin profiles"
ON public.admin_profiles FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'administrator'));

CREATE POLICY "Admins can insert their own profile"
ON public.admin_profiles FOR INSERT TO authenticated
WITH CHECK (auth.uid() = id AND public.has_role(auth.uid(), 'administrator'));

CREATE POLICY "Admins can update their own profile"
ON public.admin_profiles FOR UPDATE TO authenticated
USING (auth.uid() = id AND public.has_role(auth.uid(), 'administrator'))
WITH CHECK (auth.uid() = id);

CREATE TRIGGER update_admin_profiles_updated_at
BEFORE UPDATE ON public.admin_profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Applications
CREATE TYPE public.application_status AS ENUM ('new', 'reviewing', 'contacted', 'accepted', 'rejected');

CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  specialty text NOT NULL,
  position text,
  experience_years integer CHECK (experience_years IS NULL OR (experience_years >= 0 AND experience_years <= 60)),
  english_level text NOT NULL,
  additional_information text,
  cv_storage_path text,
  cv_file_name text,
  status public.application_status NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE, DELETE ON public.applications TO authenticated;
GRANT ALL ON public.applications TO service_role;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_applications_created_at ON public.applications (created_at DESC);
CREATE INDEX idx_applications_status ON public.applications (status);
CREATE INDEX idx_applications_email ON public.applications (lower(email));
CREATE INDEX idx_applications_full_name ON public.applications (lower(full_name));
CREATE INDEX idx_applications_phone ON public.applications (phone);
CREATE INDEX idx_applications_specialty ON public.applications (specialty);

CREATE POLICY "Admins can read applications"
ON public.applications FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'administrator'));

CREATE POLICY "Admins can update applications"
ON public.applications FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'administrator'))
WITH CHECK (public.has_role(auth.uid(), 'administrator'));

CREATE POLICY "Admins can delete applications"
ON public.applications FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'administrator'));

CREATE TRIGGER update_applications_updated_at
BEFORE UPDATE ON public.applications
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Application notes (private)
CREATE TABLE public.application_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  admin_id uuid NOT NULL,
  note text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.application_notes TO authenticated;
GRANT ALL ON public.application_notes TO service_role;
ALTER TABLE public.application_notes ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_application_notes_application_id ON public.application_notes (application_id, created_at DESC);

CREATE POLICY "Admins can read notes"
ON public.application_notes FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'administrator'));

CREATE POLICY "Admins can create notes"
ON public.application_notes FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'administrator') AND auth.uid() = admin_id);

CREATE POLICY "Admins can update their own notes"
ON public.application_notes FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'administrator') AND auth.uid() = admin_id)
WITH CHECK (auth.uid() = admin_id);

CREATE POLICY "Admins can delete their own notes"
ON public.application_notes FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'administrator') AND auth.uid() = admin_id);

CREATE TRIGGER update_application_notes_updated_at
BEFORE UPDATE ON public.application_notes
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();